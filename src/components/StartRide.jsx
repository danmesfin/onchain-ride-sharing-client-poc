import React, { useState } from 'react';
import { ethers, BigNumber } from 'ethers';

const StartRide = ({ contractAddress, contractABI, customProvider }) => {
  const [userAddress, setUserAddress] = useState('');
  const [pickupLatitude, setPickupLatitude] = useState('');
  const [pickupLongitude, setPickupLongitude] = useState('');
  const [starting, setStarting] = useState(false);
  const [startSuccess, setStartSuccess] = useState(null);

  const startRide = async () => {
    if (!customProvider || !userAddress || !pickupLatitude || !pickupLongitude) {
      alert("Please fill in all fields");
      return;
    }

    const scaledPickupLatitude = BigNumber.from(Math.round(parseFloat(pickupLatitude) * 1e6));
    const scaledPickupLongitude = BigNumber.from(Math.round(parseFloat(pickupLongitude) * 1e6));

    setStarting(true);

    try {
      const signer = customProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.startRide(
        userAddress,
        { latitude: scaledPickupLatitude, longitude: scaledPickupLongitude }
      );
      await tx.wait();
      setStartSuccess(true);
    } catch (error) {
      console.error("Error starting ride:", error);
      setStartSuccess(false);
    } finally {
      setStarting(false);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <h2 className='w-full bg-green-500 rounded-md px-2 py-1 my-2'>Start a Ride</h2>
      <div className='flex flex-col text-left border rounded-md shadow-md p-4'>
        <input 
          type="text" 
          value={userAddress} 
          onChange={(e) => setUserAddress(e.target.value)} 
          placeholder="User Ethereum Address" 
        />
        <input 
          type="text" 
          value={pickupLatitude} 
          onChange={(e) => setPickupLatitude(e.target.value)} 
          placeholder="Pickup Latitude" 
        />
        <input 
          type="text" 
          value={pickupLongitude} 
          onChange={(e) => setPickupLongitude(e.target.value)} 
          placeholder="Pickup Longitude" 
        />
        <button onClick={startRide} disabled={starting}>
          {starting ? 'Starting...' : 'Start Ride'}
        </button>
      </div>
      {startSuccess === true && <p>Ride started successfully!</p>}
      {startSuccess === false && <p>Error starting ride. Please try again.</p>}
    </div>
  );
};

export default StartRide;
