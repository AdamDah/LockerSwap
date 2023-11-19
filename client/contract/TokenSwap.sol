// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenSwap {
    address public owner;

    struct Swap {
        address user;
        address tokenOffered;
        uint256 amountOffered;
        address tokenRequested;
        uint256 amountRequested;
    }

    Swap[] public swaps;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function createSwap(
        address _tokenOffered,
        uint256 _amountOffered,
        address _tokenRequested,
        uint256 _amountRequested
    ) external {
        Swap memory newSwap = Swap({
            user: msg.sender,
            tokenOffered: _tokenOffered,
            amountOffered: _amountOffered,
            tokenRequested: _tokenRequested,
            amountRequested: _amountRequested
        });

        swaps.push(newSwap);

        // Try to find a matching swap
        address matchingUser = findMatch(newSwap);
        if (matchingUser != address(0)) {
            // Execute the swap (you need to implement the swap logic)
            executeSwap(newSwap, matchingUser);
        }
    }

    function findMatch(Swap memory _swap) internal view returns (address) {
        for (uint256 i = 0; i < swaps.length; i++) {
            Swap storage existingSwap = swaps[i];
            if (
                existingSwap.tokenOffered == _swap.tokenRequested &&
                existingSwap.amountOffered == _swap.amountRequested &&
                existingSwap.tokenRequested == _swap.tokenOffered &&
                existingSwap.amountRequested == _swap.amountOffered
            ) {
                return existingSwap.user;
            }
        }
        return address(0); // No match found
    }

    event SwapExecuted(address indexed user1, address indexed user2, address token1, address token2, uint256 amount);

    function executeSwap(Swap memory _swap, address _matchingUser) internal {
        // Ensure that the contract has enough allowance to transfer tokens on behalf of both users
        require(
            IERC20(_swap.tokenOffered).allowance(_swap.user, address(this)) >= _swap.amountOffered,
            "Insufficient allowance for offered token"
        );
        require(
            IERC20(_swap.tokenRequested).allowance(_matchingUser, address(this)) >= _swap.amountRequested,
            "Insufficient allowance for requested token"
        );

        // Ensure both users have sufficient balances
        require(
            IERC20(_swap.tokenOffered).balanceOf(_swap.user) >= _swap.amountOffered,
            "Insufficient balance for offered token"
        );
        require(
            IERC20(_swap.tokenRequested).balanceOf(_matchingUser) >= _swap.amountRequested,
            "Insufficient balance for requested token"
        );

        // Execute the token transfers
        require(
            IERC20(_swap.tokenOffered).transferFrom(_swap.user, _matchingUser, _swap.amountOffered),
            "Transfer of offered token failed"
        );
        require(
            IERC20(_swap.tokenRequested).transferFrom(_matchingUser, _swap.user, _swap.amountRequested),
            "Transfer of requested token failed"
        );

        // Emit an event for the swap
        emit SwapExecuted(_swap.user, _matchingUser, _swap.tokenOffered, _swap.tokenRequested, _swap.amountOffered);
    }
}
