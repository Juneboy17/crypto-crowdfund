async function main() {
  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const c = await ethers.getContractAt("Crowdfund", address);
  
  const total = await c.totalContributed();
  const target = await c.targetGoal();
  const min = await c.minimumContribution();
  
  console.log("Contract address:", address);
  console.log("totalContributed:", ethers.utils.formatEther(total), "ETH");
  console.log("targetGoal:", ethers.utils.formatEther(target), "ETH");
  console.log("minimumContribution:", ethers.utils.formatEther(min), "ETH");
  console.log("\n✅ Contract is live and responding!");
}

main().catch((error) => {
  console.error("❌ Contract verification failed:", error.message);
  process.exitCode = 1;
});
