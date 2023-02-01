# WRITE(main)

## addPayee
To add payee addresses to contract.
- Who can call: ContractOwner


|Name|Type|Description|Example|Default|
|--- |---|---|---|---|
|_account|address|The address of the payee to add|[0xfc4aa4A414C034E8c852A9E2fA967f82F7D52B90]|N/A|
|_shares|uint256|The number of shares owned by the payee|[200]|N/A|

## removePayee
Remove a payee from the contract.
- Who can call: ContractOwner

|Name|Type|Description|Example|Default|
|--- |---|---|---|---|
|_account|address|The address of the payee to remove|[0xfc4aa4A414C034E8c852A9E2fA967f82F7D52B90]|N/A|


## releaseEth

Transfers available ETH of the contract to all payees based on their shares
- Who can call: ContractOwner

No arguments.

## releaseERC20

Transfers available ERC20 token of the contract to all payees based on their shares
- Who can call: ContractOwner

|Name|Type|Description|Example|Default|
|--- |---|---|---|---|
|token|address|The address of the ERC20 token|[0xfc4aa4A414C034E8c852A9E2fA967f82F7D52B90]|N/A|

## updatePayeeShares

Update a payee shares.
- Who can call: ContractOwner

|Name|Type|Description|Example|Default|
|--- |---|---|---|---|
|_account|address|The address of the payee|[0xfc4aa4A414C034E8c852A9E2fA967f82F7D52B90]|N/A|
|_shares|uint256|The number of shares owned by the payee|[150]|N/A|

# WRITE(emergency case)
- transferOwnership
- withdrawEth, withdrawERC20


