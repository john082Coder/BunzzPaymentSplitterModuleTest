
import { useEffect, useState, useCallback } from 'react';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { useWeb3React } from "@web3-react/core";
import useBunzz from './useBunzz';
import { getPayees,getMaxPayeeCounter,getPayeeCount, getFeePercent,getPaymentSplitterContract, getShares } from '../contracts/utils';

const usePayees = (paymentSplitterContract=null) => {
 
  const [payees, setPayees] = useState([]);
  const [payeeCount, setPayeeCount] = useState(0);
  const [payeeMaxCounter, setPayeeMaxCounter] = useState(0);
  const {account} = useWeb3React();
  const bunzz = useBunzz();

  if(paymentSplitterContract === null)
    paymentSplitterContract = getPaymentSplitterContract(bunzz);

  const fetchPayees = useCallback(async () => {
      console.log("paymentSplitterContract = ", paymentSplitterContract);
      
      const payeeCount = await getPayeeCount(paymentSplitterContract);
      console.log("payeeCount = ", payeeCount)

      const payeeMaxCounter = await getMaxPayeeCounter(paymentSplitterContract);
    
      const payees = await getPayees(paymentSplitterContract);
    
      const newPayeeArray =await Promise.all( payees.map(async (payee, key) => {
        const shares = await getShares(paymentSplitterContract, payee);
        return {id: key, address: payee, shares: shares};
      }));

    
 
      console.log("payees = ", newPayeeArray);

      setPayees(newPayeeArray);
      setPayeeMaxCounter(payeeMaxCounter);
      setPayeeCount(payeeCount);
    }, [account, paymentSplitterContract]);
  

    useEffect(() => {
      if (account && paymentSplitterContract) {
        fetchPayees();
      }
      let refreshInterval = setInterval(fetchPayees, 10000);
      return () => clearInterval(refreshInterval);
    }, [account, paymentSplitterContract, fetchPayees]);
  return {payees, payeeCount, payeeMaxCounter};
}

export default usePayees;