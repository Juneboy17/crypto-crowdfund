// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Crowdfund {
    address public manager;
    uint public minimumContribution;
    uint public targetGoal;
    uint public deadline;
    uint public totalContributed;
    bool public withdrawn;

    mapping(address => uint) public contributions;

    event Contributed(address indexed contributor, uint amount);
    event WithdrawRequested(address indexed manager, uint amount);
    event Refunded(address indexed contributor, uint amount);

    constructor(uint _minimum, uint _targetGoal, uint _durationSeconds) {
        manager = msg.sender;
        minimumContribution = _minimum;
        targetGoal = _targetGoal;
        deadline = block.timestamp + _durationSeconds;
        withdrawn = false;
    }

    function contribute() external payable {
        require(block.timestamp < deadline, "Crowdfund: deadline passed");
        require(msg.value >= minimumContribution, "Crowdfund: below minimum");
        contributions[msg.sender] += msg.value;
        totalContributed += msg.value;
        emit Contributed(msg.sender, msg.value);
    }

    function checkGoal() public view returns (bool) {
        return totalContributed >= targetGoal;
    }

    function requestWithdrawal() external {
        require(msg.sender == manager, "Crowdfund: only manager");
        require(checkGoal(), "Crowdfund: goal not met");
        require(!withdrawn, "Crowdfund: already withdrawn");
        withdrawn = true;
        uint bal = address(this).balance;
        emit WithdrawRequested(manager, bal);
        payable(manager).transfer(bal);
    }

    function getRefund() external {
        require(block.timestamp >= deadline, "Crowdfund: not ended");
        require(!checkGoal(), "Crowdfund: goal met");
        uint amount = contributions[msg.sender];
        require(amount > 0, "Crowdfund: no contributions");
        contributions[msg.sender] = 0;
        emit Refunded(msg.sender, amount);
        payable(msg.sender).transfer(amount);
    }
}
