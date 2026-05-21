import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './contractConfig'

export default function App() {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState(null)
  const [total, setTotal] = useState('0')
  const [target, setTarget] = useState('0')
  const [value, setValue] = useState('0.01')
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const p = new ethers.BrowserProvider(window.ethereum)
      setProvider(p)
    }
  }, [])

  useEffect(() => {
    if (provider && CONTRACT_ADDRESS && ethers.isAddress(CONTRACT_ADDRESS)) {
      const c = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
      setContract(c)
      refreshData(c)
    }
  }, [provider])

  async function connect() {
    if (!provider) return alert('No Ethereum provider found. Please install MetaMask.')
    try {
      await provider.send('eth_requestAccounts', [])
      const s = await provider.getSigner()
      setSigner(s)
      const addr = await s.getAddress()
      setAccount(addr)
      if (CONTRACT_ADDRESS && ethers.isAddress(CONTRACT_ADDRESS)) {
        const c = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, s)
        setContract(c)
        refreshData(c)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function refreshData(c = contract) {
    if (!c) return
    try {
      const tot = await c.totalContributed()
      const tgt = await c.targetGoal()
      setTotal(ethers.formatEther(tot))
      setTarget(ethers.formatEther(tgt))
    } catch (err) {
      console.error(err)
    }
  }

  async function handleContribute() {
    if (!signer) return alert('Connect wallet first')
    if (!CONTRACT_ADDRESS || !ethers.isAddress(CONTRACT_ADDRESS)) return alert('Contract address not set or invalid. Update src/contractConfig.js')
    setStatus('Pending')
    try {
      const c = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      const tx = await c.contribute({ value: ethers.parseEther(value) })
      await tx.wait()
      setStatus('Confirmed')
      refreshData(c)
    } catch (err) {
      console.error(err)
      setStatus('Failed')
    }
  }

  async function handleRefund() {
    if (!signer) return alert('Connect wallet first')
    if (!CONTRACT_ADDRESS || !ethers.isAddress(CONTRACT_ADDRESS)) return alert('Contract address not set or invalid. Update src/contractConfig.js')
    setStatus('Pending')
    try {
      const c = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      const tx = await c.getRefund()
      await tx.wait()
      setStatus('Refunded')
      refreshData(c)
    } catch (err) {
      console.error(err)
      setStatus('Failed')
    }
  }

  const progressPercentage = Math.min(100, (parseFloat(total) / Math.max(0.00001, parseFloat(target))) * 100);
  
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  }

  const getStatusClass = () => {
    if (status === 'Pending') return 'status-pending';
    if (status === 'Confirmed' || status === 'Refunded') return 'status-confirmed';
    if (status === 'Failed') return 'status-failed';
    return '';
  }

  return (
    <div className="app-wrapper">
      <h1>CryptoCF</h1>
      <div className="card">
        
        <div className="info-row">
          <span className="info-label">Contract</span>
          <span className="info-value" title={CONTRACT_ADDRESS}>
            {CONTRACT_ADDRESS ? formatAddress(CONTRACT_ADDRESS) : 'Not Set'}
          </span>
        </div>
        
        <div className="info-row">
          <span className="info-label">Connected Wallet</span>
          <span className="info-value">
            {account ? formatAddress(account) : 'Not Connected'}
          </span>
        </div>

        <div className="progress-container">
          <div className="progress-header">
            <span>Raised: {total} ETH</span>
            <span>Goal: {target} ETH</span>
          </div>
          <div className="progress">
            <div className="bar" style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>

        <div className="actions">
          {!account ? (
            <button onClick={connect}>Connect Wallet</button>
          ) : (
            <>
              <div className="contribute-group">
                <input 
                  type="number" 
                  step="0.01"
                  value={value} 
                  onChange={(e) => setValue(e.target.value)} 
                />
                <button onClick={handleContribute}>Contribute</button>
              </div>
              <button className="btn-secondary" onClick={handleRefund}>Get Refund</button>
            </>
          )}
        </div>

        {status && (
          <div className={`status-badge ${getStatusClass()}`}>
            Status: {status}
          </div>
        )}
      </div>
    </div>
  )
}

