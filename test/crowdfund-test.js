const { expect } = require("chai");
const hre = require("hardhat");
const { ethers } = hre;

describe("Crowdfund", function () {
  let Crowdfund, crowdfund, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Crowdfund = await ethers.getContractFactory("Crowdfund");
    crowdfund = await Crowdfund.deploy(ethers.utils.parseEther("0.01"), ethers.utils.parseEther("1.0"), 3600);
    await crowdfund.deployed();
  });

  it("accepts contributions", async function () {
    await crowdfund.connect(addr1).contribute({ value: ethers.utils.parseEther("0.5") });
    const contrib = await crowdfund.contributions(addr1.address);
    expect(contrib).to.equal(ethers.utils.parseEther("0.5"));
    const total = await crowdfund.totalContributed();
    expect(total).to.equal(ethers.utils.parseEther("0.5"));
  });

  it("blocks manager withdrawal early", async function () {
    await expect(crowdfund.requestWithdrawal()).to.be.revertedWith("Crowdfund: goal not met");
  });

  it("allows refunds after deadline when goal not met", async function () {
    await crowdfund.connect(addr1).contribute({ value: ethers.utils.parseEther("0.2") });
    // move time forward past deadline
    await hre.network.provider.send("evm_increaseTime", [3601]);
    await hre.network.provider.send("evm_mine");

    // addr1 should be able to get refund
    await crowdfund.connect(addr1).getRefund();
    const contrib = await crowdfund.contributions(addr1.address);
    expect(contrib).to.equal(0);
  });
});
