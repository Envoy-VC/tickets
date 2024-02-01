// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";

import {Ticket} from "../src/Ticket.sol";

contract TicketTest is Test {
    Ticket public ticket;
    Vm.Wallet public wallet;

    function setUp() public {
        ticket = new Ticket(address(this), 100, "https://example.com");
    }

    function testPause() public {
        ticket.pause();
        assertTrue(ticket.paused());
    }
}
