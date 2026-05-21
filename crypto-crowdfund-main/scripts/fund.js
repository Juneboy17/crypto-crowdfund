const { ethers } = require("hardhat");

async function main() {
  const targetAddress = "0xa9f19826ad86fcd155b2595b3e936cb0959344c9";
  const [signer] = await ethers.getSigners();
  
  console.log("Funding account", targetAddress, "from", signer.address);
  
  const tx = await signer.sendTransaction({
    to: targetAddress,
    value: ethers.utils.parseEther("100.0")
  });
  
  await tx.wait();
  console.log("Successfully sent 100 ETH to", targetAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
