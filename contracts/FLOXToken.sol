// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FLOXToken is ERC20 {
    // Initial supply of token 50 mln, precision is 18
    uint256 constant INITIAL_SUPPLY = 50_000_000 * (10**18);
    address immutable public daoAddress;

    constructor(address _daoAddress) ERC20("Flipfox Token", "FLOX") {
        require(_daoAddress != address(0), "DAO address cannot be the zero address");

        daoAddress = _daoAddress;
        _mint(daoAddress, INITIAL_SUPPLY);
    }
}
