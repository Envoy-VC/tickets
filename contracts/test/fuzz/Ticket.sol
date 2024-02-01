// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// Fuzz Testing

import "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";

import {Ticket} from "../../src/Ticket.sol";

contract TicketFuzzTest is Test {
    Ticket public ticket;
    Vm.Wallet public owner;
    Vm.Wallet public user;

    function setUp() public {
        owner = vm.createWallet("owner");
        user = vm.createWallet("user");

        vm.deal(owner.addr, 100 ether);
        vm.deal(user.addr, 100 ether);

        vm.startPrank(owner.addr);
        ticket = new Ticket(owner.addr, 1 ether, "https://example.com");
        vm.stopPrank();
    }

    function testFuzz_mint(string memory seed) external {
        Vm.Wallet memory wallet = vm.createWallet(seed);
        vm.deal(wallet.addr, 100 ether);

        vm.startPrank(wallet.addr);
        ticket.mint{value: ticket.PRICE_PER_TOKEN()}(wallet.addr);
        vm.stopPrank();

        assertEq(ticket.balanceOf(wallet.addr), 1);
        assertEq(address(ticket).balance, 1 ether);
    }

    function testFuzz_updatePrice(uint256 randomPrice) external {
        vm.assume(randomPrice > 0);

        vm.startPrank(owner.addr);
        ticket.updatePrice(randomPrice);
        vm.stopPrank();

        assertEq(ticket.PRICE_PER_TOKEN(), randomPrice);
    }

    function testFuzz_updateURI(string memory randomURI) external {
        vm.assume(bytes(randomURI).length > 0);

        vm.startPrank(owner.addr);
        ticket.updateURI(randomURI);
        vm.stopPrank();

        assertEq(ticket.URI(), randomURI);
    }

    function testFuzz_withdraw() external {
        uint256 initialBalance = address(owner.addr).balance;
        vm.startPrank(user.addr);
        ticket.mint{value: ticket.PRICE_PER_TOKEN()}(user.addr);
        vm.stopPrank();

        vm.startPrank(owner.addr);
        ticket.withdraw();
        vm.stopPrank();

        assertEq(address(ticket).balance, 0);
        assertEq(address(owner.addr).balance, initialBalance + 1 ether);
    }

    function testFuzz_pause() external {
        vm.startPrank(owner.addr);

        if (ticket.paused()) {
            ticket.unpause();
        }

        ticket.pause();
        vm.stopPrank();

        assertEq(ticket.paused(), true);
    }

    function testFuzz_unpause() external {
        vm.startPrank(owner.addr);

        if (!ticket.paused()) {
            ticket.pause();
        }

        ticket.unpause();
        vm.stopPrank();

        assertEq(ticket.paused(), false);
    }
}
