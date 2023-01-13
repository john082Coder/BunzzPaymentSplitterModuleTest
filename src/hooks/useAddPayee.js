import { useCallback } from 'react';
import useBunzz from './useBunzz';
import { useWeb3React } from "@web3-react/core";
import { addPayee, getPaymentSplitterContract } from '../contracts/utils';

const useAddPayee = ( paymentSplitterContract = null, payeeAddress, shares) => {
 
  const {  connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,} = useWeb3React();
  const bunzz = useBunzz();
  if(paymentSplitterContract === null)
    paymentSplitterContract = getPaymentSplitterContract(bunzz);

  const handleAddPayee = useCallback(async () => {
    try {
      const tx = await addPayee(paymentSplitterContract, payeeAddress, shares, account);
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, payeeAddress, shares, paymentSplitterContract]);

  return { onAddPayee: handleAddPayee };
}

export default useAddPayee;
