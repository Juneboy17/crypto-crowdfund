// Replace the address below with the Crowdfund contract address after deployment
// Leave empty for now to avoid ENS resolution errors in the UI
export const CONTRACT_ADDRESS = "0xCd08D705a0b16890536F0c64b207D0Bd08299e7f";

// Minimal ABI for the Crowdfund contract (read and write functions used by the UI)
export const CONTRACT_ABI = [
  { "inputs": [], "name": "totalContributed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "targetGoal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "minimumContribution", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "deadline", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "contributions", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "checkGoal", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "contribute", "outputs": [], "stateMutability": "payable", "type": "function" },
  { "inputs": [], "name": "getRefund", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "requestWithdrawal", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];
