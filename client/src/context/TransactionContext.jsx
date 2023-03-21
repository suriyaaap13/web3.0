import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  console.log({contractAddress, contractABI, signer, provider});
  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {

  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

  const handleChange = (e, name) => {
    setFormData((prevState)=> ({...prevState, [name]: e.target.value}))
  } 

  const checkIfWalletIsConnected = async () => {
    try{
      if(!ethereum) return alert('Please install metamask');

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if(accounts.length){
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No Account Found");
      }
      console.log(accounts);
    }catch (error){
      console.log(error);
      throw new Error("No ethereum object");
    }
  } 

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_requestAccounts", });
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try{
      if (!ethereum) return alert("Please install MetaMask.");
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 GWEI
          value: parsedAmount._hex, // 0.00001
        }]
      });

      const transactionhash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      setIsLoading(true);
      console.log(`Loading - ${transactionhash.hash}`);
      await transactionhash.wait();
      setIsLoading(false);
      console.log(`Success - ${transaction.hash}`);

      const trxCount = await transactionContract.getTransactionCount();
      setTransactionCount(trxCount.toNumber());
    }catch(error){
      console.log(error);
      throw new Error("No ethereum object");
    }
  }

  useEffect(()=>{
    checkIfWalletIsConnected();
  },[])

  return (
    <TransactionContext.Provider
      value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction}}
    >
      {children}
    </TransactionContext.Provider>
  );
};