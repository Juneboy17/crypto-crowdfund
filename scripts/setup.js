/**
 * All-in-one setup script:
 * 1. Deploys the Crowdfund contract
 * 2. Funds test accounts with ETH using hardhat_setBalance
 * 3. Verifies the contract is working
 * 4. Prints the contract address to copy into the frontend
 */

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("\n========================================");
  console.log("  CryptoCF — Full Setup Script");
  console.log("========================================\n");

  // ── Step 1: Deploy contract ──
  console.log("Step 1: Deploying Crowdfund contract...");
  console.log("  Deployer:", deployer.address);

  const Crowdfund = await ethers.getContractFactory("Crowdfund");
  const min = ethers.utils.parseEther("0.01");
  const target = ethers.utils.parseEther("1.0");
  const duration = 7 * 24 * 60 * 60; // 7 days
  const cf = await Crowdfund.deploy(min, target, duration);
  await cf.deployed();
  console.log("  ✅ Contract deployed to:", cf.address);

  // ── Step 2: Fund test accounts ──
  console.log("\nStep 2: Funding test accounts...");

  // Hardhat default test accounts
  const testAccounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // Account #0
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // Account #1
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", // Account #2
  ];

  // 1000 ETH in hex
  const balance = "0x3635C9ADC5DEA00000";

  for (const addr of testAccounts) {
    await network.provider.send("hardhat_setBalance", [addr, balance]);
    const bal = await ethers.provider.getBalance(addr);
    console.log(`  ✅ ${addr} → ${ethers.utils.formatEther(bal)} ETH`);
  }

  // ── Step 3: Verify contract ──
  console.log("\nStep 3: Verifying contract...");
  const totalContributed = await cf.totalContributed();
  const targetGoal = await cf.targetGoal();
  const minimumContribution = await cf.minimumContribution();
  console.log("  totalContributed:", ethers.utils.formatEther(totalContributed), "ETH");
  console.log("  targetGoal:", ethers.utils.formatEther(targetGoal), "ETH");
  console.log("  minimumContribution:", ethers.utils.formatEther(minimumContribution), "ETH");

  // ── Done ──
  console.log("\n========================================");
  console.log("  ✅ SETUP COMPLETE!");
  console.log("========================================");
  console.log("\n  CONTRACT ADDRESS (copy this):");
  console.log(`  ${cf.address}`);
  console.log("\n  Now do these steps:");
  console.log("  1. Open frontend/src/contractConfig.js");
  console.log(`  2. Set CONTRACT_ADDRESS = "${cf.address}"`);
  console.log("  3. In MetaMask: switch to Localhost 8545 (Chain ID 31337)");
  console.log("  4. In MetaMask: Settings > Advanced > Clear activity tab data");
  console.log("  5. Import one of these private keys into MetaMask:");
  console.log("     Account #0: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
  console.log("     Account #1: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d");
  console.log("  6. Hard refresh the page (Ctrl+Shift+R)");
  console.log("  7. Connect wallet and contribute!\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
