## About
> one line description ← What issue does this module solve?

Module contract is used for sharing accumulated any ERC20 tokens on the contract with shared accounts.
The max number of shared accounts is limited up to 10.

## Features


- ContractOwner can add/remove payee address with share point on the contract.(The maximum number of payee address is 10)
- ContractOwner can update share points of payee addresses and maximum number of payee address.
- ContractOwner can release tokens to payess based on their shares.
- ContractOwner can withdraw tokens to any address on the contract.


## Use case

In most cases, the contract accumulates tokens itself and then releases them to payees based on each shares.

Token Launch contract is getting fee from the transaction(sell, buy, transfer, ...) , DEFI contract is getting the fee from user's deposit and stake.
NFT Mint contract has some minting price and the contract is getting tokens from the minting transaction.
NFT Marketplace contract is getting fee from the tradings(sell, buy, transfer, ...) ...

For above cases, the contracts need to have functions to withdraw the accumulated tokens or release them to payees with shares.

## Sample dApp
- github repo URL
    https://github.com/john082Coder/BunzzPaymentSplitterModuleTest
- simple dapp URL
    https://bunzz-payment-splitter-module-test.vercel.app/


---
## Review report
- [JCoder's report](https://docs.google.com/document/d/1-yVw_9Q5Mx-HTzbaK9j4Xuz2oFW8jJTnEbSMbQ2_Jzc/edit)