import React, { useState } from 'react';
import RideDetails from '../components/RideDetails'; 
import { rideTransactionsContract } from '../utils/CONSTANTS';
import { useCustomProvider } from '../hooks/EtherProvider';


const RideInfoPage = () => {
  const [rideId, setRideId] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const {customProvider, smartAccount} = useCustomProvider();
  const contractABI = rideTransactionsContract.abi;
  const contractAddress = rideTransactionsContract.address;
  
  // debug
  const debug = () => {
    console.log("customProvider: ", customProvider);
    console.log("smartAccount: ", smartAccount);
    const codeExist = customProvider.getCode(contractAddress);
    console.log("code exist", codeExist);
  };
  debug();

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
      <div>
        <h1>Get Ride Details</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="rideId">Ride ID:</label>
          <input
            type="text"
            id="rideId"
            value={rideId}
            onChange={handleInputChange}
            placeholder="Enter Ride ID"
          />
          <button type="submit" className='bg-blue-400'>Get Details</button>
        </form>
        {showDetails && (
        <RideDetails
          rideId={rideId}
          contractAddress={contractAddress}
          contractABI={contractABI}
          customProvider={customProvider}
        />
      )}
      </div>
    <div>
      <h1>Start Ride</h1>

    </div>
    </div>
  );
};

export default RideInfoPage;
