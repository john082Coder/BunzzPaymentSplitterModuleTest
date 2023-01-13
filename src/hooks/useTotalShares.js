import { useEffect, useState, useCallback } from 'react';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { useWeb3React } from "@web3-react/core";
import { getTotalShares} from '../contracts/utils'

const useTotalShares = (paymentSplitterContract=null) => {
  const [totalShares, setTotalShares] = useState(-1);
  const {  connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,} = useWeb3React();
   
    const fetchTotalShares = useCallback(async () => {
      console.log("paymentSplitterContract = ", paymentSplitterContract);
      const totalShares = await getTotalShares(
        paymentSplitterContract
      );
      console.log("totalShares = ", totalShares);
      setTotalShares(totalShares);
    }, [account, paymentSplitterContract]);
  

    useEffect(() => {
      if (account && paymentSplitterContract) {
        fetchTotalShares();
      }
      let refreshInterval = setInterval(fetchTotalShares, 10000);
      return () => clearInterval(refreshInterval);
    }, [account, paymentSplitterContract, fetchTotalShares]);

  return totalShares;
}

export default useTotalShares;
