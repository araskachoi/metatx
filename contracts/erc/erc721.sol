// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GTS721 is ERC721, ERC721Burnable, Ownable {
    constructor() ERC721("GTS721", "GTS") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://chainsafe.io";
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}
