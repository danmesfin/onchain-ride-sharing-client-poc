import React, { useState , useEffect} from 'react';
import RideDetails from '../components/RideDetails'; 
import { rideTransactionsContract } from '../utils/RideTransactionABI';
import { useCustomProvider } from '../hooks/EtherProvider';
import { useAuthCore, useConnect } from '@particle-network/auth-core-modal';
import RequestRide from '../components/RequestRide';
import { ethers } from 'ethers';
import StartRide from '../components/StartRide';
import CompleteRide from '../components/CompleteRide';
import MapComponent from '../components/Map';
import ProcessPayment from '../components/ProcessPayment';
const RideInfoPage = () => {
  const { connect, disconnect } = useConnect();
  const [rideId, setRideId] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const {userInfo} = useAuthCore();
  const {customProvider, smartAccount} = useCustomProvider();
  const rideContractABI = rideTransactionsContract.abi;
  const contractAddress = rideTransactionsContract.address;
  
  
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


  const handleInputChange = (event) => {
    setRideId(event.target.value);
    setShowDetails(false); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowDetails(true); 
  };

  return (
    <div>
      <div className='flex px-4 py-2 justify-end items-center border-b border-gray-200'>
        <p className='mx-2'>Welcome {userInfo.name}</p>
        <p className='mx-2'>{balance} AVAX</p>
        <button className="rounded-lg bg-blue-500 px-3 py-1 text-md" onClick={disconnect}>Logout</button>
      </div>
      <MapComponent />
      <div className='flex w-full p-10 mt-8'>
      <div className='w-full items-center mx-3'>
        <RideDetails
          contractAddress={rideTransactionsContract.address}
          contractABI={rideTransactionsContract.abi}
          customProvider={customProvider}
        />
        </div>

        <div className='w-full items-center mx-3'>
          <RequestRide
            contractAddress={rideTransactionsContract.address}
            contractABI={rideTransactionsContract.abi}
            customProvider={customProvider}
          />
        </div>
        <div className='flex flex-col items-center mx-3'>
          <StartRide contractAddress={rideTransactionsContract.address} contractABI={rideTransactionsContract.abi} customProvider={customProvider} />
        </div>
        <div className='flex flex-col items-center mx-3'>
          <CompleteRide contractAddress={rideTransactionsContract.address} contractABI={rideTransactionsContract.abi} customProvider={customProvider} />
        </div>
      </div>
      <div className='flex w-full p-10 mt-4'>
        <ProcessPayment contractAddress={rideTransactionsContract.address} contractABI={rideTransactionsContract.abi} customProvider={customProvider} />
      </div>
    </div>
  );
};

export default RideInfoPage;
