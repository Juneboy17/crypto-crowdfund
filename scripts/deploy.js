async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const Crowdfund = await ethers.getContractFactory("Crowdfund");
  // example: min 0.01 ETH, target 1 ETH, duration 7 days
  const min = ethers.utils.parseEther("0.01");
  const target = ethers.utils.parseEther("1.0");
  const duration = 7 * 24 * 60 * 60;
  const cf = await Crowdfund.deploy(min, target, duration);
  await cf.deployed();
  const addr = cf.address;
  console.log("Crowdfund deployed to:", addr);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
