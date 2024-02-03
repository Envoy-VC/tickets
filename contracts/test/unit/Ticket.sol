// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {Vm} from "forge-std/Vm.sol";

import {Ticket} from "../../src/Ticket.sol";

contract TicketTest is Test {
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

    function test_ticket() public {
        assertEq(ticket.owner(), owner.addr);
        assertEq(ticket.PRICE_PER_TOKEN(), 1 ether);
        assertEq(ticket.URI(), "https://example.com");
    }

    function test_mint() public {
        assertEq(address(ticket).balance, 0);
        assertEq(ticket.balanceOf(user.addr), 0);

        vm.startPrank(user.addr);
        ticket.mint{value: ticket.PRICE_PER_TOKEN()}(user.addr);
        vm.stopPrank();

        assertEq(ticket.balanceOf(user.addr), 1);
        assertEq(address(ticket).balance, 1 ether);
    }

    function test_safeMint() public {
        assertEq(address(ticket).balance, 0);

        vm.startPrank(owner.addr);
        ticket.safeMint(user.addr);
        vm.stopPrank();

        assertEq(ticket.balanceOf(user.addr), 1);
    }

    function test_updatePrice() public {
        assertEq(ticket.PRICE_PER_TOKEN(), 1 ether);

        vm.startPrank(owner.addr);
        ticket.updatePrice(2 ether);
        vm.stopPrank();

        assertEq(ticket.PRICE_PER_TOKEN(), 2 ether);
    }

    function test_updateURI() public {
        assertEq(ticket.URI(), "https://example.com");

        vm.startPrank(owner.addr);
        ticket.updateURI("https://example2.com");
        vm.stopPrank();

        assertEq(ticket.URI(), "https://example2.com");
    }

    function test_withdraw() public {
        assertEq(address(ticket).balance, 0);

        vm.startPrank(user.addr);
        ticket.mint{value: ticket.PRICE_PER_TOKEN()}(user.addr);
        vm.stopPrank();

        uint256 initialBalance = address(owner.addr).balance;
        assertEq(address(ticket).balance, ticket.PRICE_PER_TOKEN());

        vm.startPrank(owner.addr);
        ticket.withdraw();
        vm.stopPrank();

        assertEq(address(ticket).balance, 0);
        assertEq(address(owner.addr).balance, initialBalance + ticket.PRICE_PER_TOKEN());
    }

    function test_pause() public {
        assertEq(ticket.paused(), false);

        vm.startPrank(owner.addr);
        ticket.pause();
        vm.stopPrank();

        assertEq(ticket.paused(), true);
    }

    function test_unpause() public {
        assertEq(ticket.paused(), false);

        vm.startPrank(owner.addr);
        ticket.pause();
        vm.stopPrank();

        assertEq(ticket.paused(), true);

        vm.startPrank(owner.addr);
        ticket.unpause();
        vm.stopPrank();

        assertEq(ticket.paused(), false);
    }
}
