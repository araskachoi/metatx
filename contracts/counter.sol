// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

contract counter {
    
    uint256 count;
    address lastCaller;

    constructor() public {
        count = 0;
        lastCaller = msg.sender;
    }
    
    function increment() public {
        count = count + 1;
        lastCaller = msg.sender;
    }
    
    function getCount() public view returns (uint256) {
        return count;   
    }
    
    function getLastCaller() public view returns (address) {
        return lastCaller;
    }
    
}
