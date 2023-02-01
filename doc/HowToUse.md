## Preparation before deployment
1. Deploy your own ERC20 token which will be used for sharing to payees.

## Get started(Operation)
As Project Owner,

1. Deploy Payment Splitter contract using bunzz platform or other tools like truffle or hardhat.
2. Send some ETH or your own ERC20 token to contract for sharing to payees.
3. Call the function `addPayee()` to add payee address and share points. 
4. To update share points of current payees set on contract, call the function `updatePayeeShares()`.
5. To remove payee,  call the function `removePayee()`.
6. To change maximum payee numbers, call the function `setMaxPayeeCounter()`.
7. To release ETH to payees based on their shares, call the function `releaseEth()`.
8. To release ERC20 tokens to payees based on their shares, call the function `releaseERC20()`.
9. To withdraw ETH or ERC20 tokens of contract, call the function `withdrawEth` or `withdrawERC20`.



## How-to

- How to get the total shares?
  Call `totalShares()`. It returns total shares.
- How to get the list of payees?
  Call `listOfPayees()`.

- Check the released amount?
  Call `totalERC20Released()` or `totalEthReleased()`

