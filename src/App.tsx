import React, { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { Avalanche, AvalancheTestnet } from '@particle-network/chains';
import { ethers } from 'ethers';
import { notification } from 'antd';
import { SocialAuthType } from '@particle-network/auth-core';
import { useCustomProvider } from  './hooks/EtherProvider';
import './App.css';
import RideInfoPage from './pages/Dashbaord';

const App = () => {
  const { provider } = useEthereum();
  const { connect, disconnect } = useConnect();
  const { userInfo } = useAuthCore();
  const {customProvider,  smartAccount} = useCustomProvider()

  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
  }, [userInfo, smartAccount, customProvider]);

  const fetchBalance = async () => {
    const address = await smartAccount.getAddress();
    const balanceResponse = await customProvider.getBalance(address);
    setBalance(ethers.utils.formatEther(balanceResponse).toString());
  };

  const handleLogin = async (authType: SocialAuthType) => {
    if (!userInfo) {
      await connect({
        socialType: authType,
        chain: AvalancheTestnet,  // testnet will be used only for development - to be replaced by Avalanche
      });
    }
  };

  // const executeUserOp = async () => {
  //   const signer = customProvider.getSigner();
  //   const tx = {
  //     to: "0x000000000000000000000000000000000000dEaD",
  //     value: ethers.utils.parseEther("0.0001"),
  //   };
  //   const txResponse = await signer.sendTransaction(tx);
  //   const txReceipt = await txResponse.wait();
  //   notification.success({
  //     message: 'Transaction Successful',
  //     description: (
  //       <div>
  //         Transaction Hash: <a href={`https://snowtrace.io/tx/${txReceipt.transactionHash}`} target="_blank" rel="noopener noreferrer">{txReceipt.transactionHash}</a>
  //       </div>
  //     )
  //   });
  // };

  // const executeBatchUserOp = async () => {
  //   const tx = { tx: [{
  //     to: "0x000000000000000000000000000000000000dEaD",
  //     value: ethers.utils.parseEther("0.0001"),
  //   },
  //   {
  //     to: "0x000000000000000000000000000000000000dEaD",
  //     value: ethers.utils.parseEther("0.0001"),
  //   }]};
  //   const txResponse = await smartAccount.sendTransaction(tx);
  //   notification.success({
  //     message: 'Transaction Successful',
  //     description: (
  //       <div>
  //         Transaction Hash: <a href={`https://snowtrace.io/tx/${txResponse}`} target="_blank" rel="noopener noreferrer">{txResponse}</a>
  //       </div>
  //     )
  //   });
  // };

  return (
    <div className="flex flex-col">
      {!userInfo ? (
        <div className="login-section">
          <button className="sign-button google-button" onClick={() => handleLogin('google')}>
            <img src="https://i.imgur.com/nIN9P4A.png" alt="Google" className="icon"/>
            Sign in with Google
          </button>
          <button className="sign-button twitter-button" onClick={() => handleLogin('twitter')}>
            <img src="https://i.imgur.com/afIaQJC.png" alt="Twitter" className="icon"/>
            Sign in with X
          </button>
          <button className="sign-button other-button" onClick={() => handleLogin('')}>
            <img src="https://i.imgur.com/VRftF1b.png" alt="Twitter" className="icon"/>
          </button>
        </div>
      ) : (
        <>
        <RideInfoPage />
        </>
      )}
    </div>
  );
};

export default App;