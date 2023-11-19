# LockerSwap
Private swaps using ZKBob ans 1inch

# Private Swap DEX 🔄🔐

## Overview

This project aims to create a secure and private way for users to execute token swaps using Zero-Knowledge Proof Bulletproofs (zk-SNARKs) for private transfers and leverage the 1inch protocol for efficient swaps. The smart contract will also support cross-chain implementations for various blockchains, including Gnosis, Arbitrum, Metamask, Chiliz, Scroll, Mantle, ZkSync, and Neon EVM.

## Features

- **Decentralized Frontend**: The frontend is hosted on BOS of Near and is fully decentralized.
- **Private Swaps**: Utilize zk-SNARKs (zk-Bulletproofs) for confidential and private token transfers.
- **Efficient Swaps**: Leverage the 1inch protocol for optimized and cost-effective token swaps.
- **Cross-Chain Support**: Deploy the smart contract on multiple chains, including Gnosis, Arbitrum, Metamask, Chiliz, Scroll, Mantle, ZkSync, and Neon EVM.

## Smart Contract

The smart contract facilitates private token swaps and can be deployed on various blockchains. It supports the creation of private swap orders and finds matches for opposite swap parameters.

### Usage

1. **Create a Swap Order**: Users can create a swap order by specifying the token they want to offer, the amount, and the token they want in return with the corresponding amount.
2. **Private Matching**: The smart contract uses zk-SNARKs to confidentially find matching swap orders.
3. **Efficient Execution**: Utilizes 1inch protocol for efficient and optimized token swaps.
4. **Cross-Chain Implementation**: Deploy the smart contract on supported blockchains for cross-chain swaps.

## BOS Component
[Decentralized Frontend](https://near.org/d46f94a8c5c545b43681c90edee1093fe2480484d708195bd465243a60e28002/widget/NestedProps)

## Supported Chains

- Celo 0x66dc1b08F8e19F81430b034218fce3dD7CF7F8E1
- Gnosis
- Arbitrum 0xa543d823b4a15A5cfFfaBC7059c9c578AFBf31a9
- Metamask 0x04C89607413713Ec9775E14b954286519d836FEf
- Chiliz
- Scroll 0x5f3f1dBD7B74C6B46e8c44f98792A1dAf8d69154
- Mantle
- ZkSync
- Neon EVM

## Getting Started

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Deploy the smart contract on your desired blockchain.

## Project Deck

For more details, refer to our [project deck](LockerSwap_Deck.pdf).

## Security

Ensure proper security measures are taken before deploying the smart contract on any blockchain. Conduct thorough audits and follow best practices.



