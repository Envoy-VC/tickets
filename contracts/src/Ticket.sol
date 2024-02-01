// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ticket is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Pausable, Ownable {
    uint256 private _nextTokenId;
    uint256 public PRICE_PER_TOKEN;
    string public URI;

    event Withdraw(address indexed to, uint256 amount);

    constructor(address initialOwner, uint256 initialPrice, string memory uri)
        ERC721("TICKET", "TICKET")
        Ownable(initialOwner)
    {
        PRICE_PER_TOKEN = initialPrice;
        URI = uri;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function getURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function mint(address to) public payable {
        require(msg.value >= PRICE_PER_TOKEN, "Insufficient funds");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, URI);
    }

    // Owner Actions
    function updatePrice(uint256 newPrice) public onlyOwner {
        PRICE_PER_TOKEN = newPrice;
    }

    function updateURI(string memory _newURI) public onlyOwner {
        URI = _newURI;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        (bool success,) = owner().call{value: balance}("");
        require(success, "Transfer failed.");
        emit Withdraw(msg.sender, balance);
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
