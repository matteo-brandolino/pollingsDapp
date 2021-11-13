// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Polling is Ownable {
    uint256 public pollsCounter = 0;
    uint256 private divider = 100;

    modifier costs(uint256 cost) {
        require(msg.value >= cost, "Not enough funds");
        _;
    }

    modifier youCanVote(uint256 _pollId) {
        require(polls[_pollId].created == true, "Poll doesn't exist");
        require(pollsVoted[msg.sender][_pollId] != true, "Yet voted");
        require(polls[_pollId].balance > 0, "No Funds Anymore");
        _;
    }

    // describes a Poll
    struct Poll {
        uint256 id;
        string title;
        string body;
        uint256 numYes;
        uint256 numNo;
        uint256 numVoters;
        uint256 payBack;
        uint256 balance;
        address creator;
        bool created;
    }

    event PollCreated(
        address indexed _from,
        uint256 id,
        string title,
        string body
    );

    event Voted(address indexed _from, uint256 pollsId, uint256 choice);

    event Receive(address indexed _from, uint256 amount);

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    mapping(uint256 => Poll) public polls;

    mapping(address => uint256) pendingTransactions;

    // pollsVoted[msg.sender][pollId] //to check if voter has yet voted a poll
    mapping(address => mapping(uint256 => bool)) pollsVoted;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *                  Smart Contract Functions                   *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getContractAddress() public view virtual returns (address) {
        return address(this);
    }

    function yetVoted(uint256 _pollId) public view virtual returns (bool) {
        return pollsVoted[msg.sender][_pollId];
    }

    function fundContract() public payable {
        payable(address(this)).transfer(msg.value);
    }

    function isAdmin() public view returns (bool) {
        return owner() == msg.sender;
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *           Create Poll and Vote Functions              *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function createPoll(string memory _title, string memory _body)
        public
        payable
        costs(0.1 ether)
    {
        // you need to pay to create a poll
        fundContract();
        // Create new Poll with title and body
        polls[pollsCounter] = Poll(
            pollsCounter,
            _title,
            _body,
            0,
            0,
            0,
            msg.value / divider,
            msg.value,
            msg.sender,
            true
        );

        // emit event when new Poll is created
        emit PollCreated(msg.sender, pollsCounter, _title, _body);

        pollsCounter++;
    }

    function vote(uint256 _vote, uint256 _pollId)
        public
        payable
        youCanVote(_pollId)
    {
        Poll storage poll = polls[_pollId];
        bool succ = false;
        if (_vote == 0) {
            poll.numNo++;
            poll.numVoters++;
            succ = true;
        }
        if (_vote == 1) {
            poll.numYes++;
            poll.numVoters++;
            succ = true;
        }

        // Transaction after voting

        // Voter receives eth
        uint256 balanceVoterBeforeTransfer = msg.sender.balance;
        payable(msg.sender).transfer(poll.payBack);
        assert(
            msg.sender.balance == balanceVoterBeforeTransfer + poll.payBack
        );

        // And Balance updated
        uint256 balancePollBeforeTransfer = poll.balance;
        poll.balance -= poll.payBack;
        assert(
            poll.balance == balancePollBeforeTransfer - poll.payBack
        );

        // Voter has voted
        pollsVoted[msg.sender][_pollId] = true;

        emit Voted(msg.sender, poll.id, _vote);
        // Succ is always true after
        assert(succ == true);
    }
}
