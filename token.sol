// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TacoToken is ERC20 {
    address public admin;
    mapping (address => bool) public claimed;

    constructor(uint256 initialSupply) ERC20("Taco", "TACO") {
        admin = msg.sender;
        _mint(msg.sender, initialSupply);
    }

    function claim () public {
        if (claimed[msg.sender] == false) {
            uint tokensToClaim = 1_000_000_000_000_000_000_000;
            _mint(msg.sender, tokensToClaim);
            claimed[msg.sender] = true;
        } else {
            revert("Tokens already claimed!");
        }
    }

    function hasClaimed (address user) public view returns (bool) {
        return claimed[user];
    }
}