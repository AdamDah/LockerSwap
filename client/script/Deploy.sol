// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {TokenSwap} from "../contract/TokenSwap.sol";

contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        TokenSwap tokenswap = new TokenSwap();
        vm.stopBroadcast();
    }
}
