// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ECOtoken is ERC20, ERC20Burnable, Ownable {
    uint public tokenPrice;
    uint public maxSupply;

    constructor() ERC20("ECOToken", "ECO") {
        tokenPrice = 1000000000000000;
        maxSupply = 1000000000000000000000;
    }

    function mint(uint amount) public payable {
        require(totalSupply() + amount <= maxSupply, "Max Supply Exceeded");
        require(msg.value * 10 ** decimals() / amount >= tokenPrice, "Pay Ether According to Token Price i.e 0.1 ether per token");
        _mint(msg.sender, amount);
    }

    function withdrawEther() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function returnTokenomics() public view returns(uint _myBalance, uint _maxSupply, uint _totalSupply, uint _tokenPrice){
        return (balanceOf(msg.sender), maxSupply, totalSupply(), tokenPrice);
    }
}