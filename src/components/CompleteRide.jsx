import React, { useState } from 'react';
import { ethers, BigNumber } from 'ethers';

const CompleteRide = ({ contractAddress, contractABI, customProvider }) => {
  const [rideId, setRideId] = useState('');
  const [distance, setDistance] = useState('');
  const [destinationLatitude, setDestinationLatitude] = useState('');
  const [destinationLongitude, setDestinationLongitude] = useState('');
  const [completing, setCompleting] = useState(false);
  const [completionSuccess, setCompletionSuccess] = useState(null);

  const completeRide = async () => {
    if (!customProvider || !rideId || !distance || !destinationLatitude || !destinationLongitude) {
      alert("Please fill in all fields");
      return;
    }

    const scaledDestinationLatitude = BigNumber.from(Math.round(parseFloat(destinationLatitude) * 1e6));
    const scaledDestinationLongitude = BigNumber.from(Math.round(parseFloat(destinationLongitude) * 1e6));

    setCompleting(true);

    try {
      const signer = customProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.completeRide(
        BigNumber.from(rideId),
        BigNumber.from(distance),
        { latitude: scaledDestinationLatitude, longitude: scaledDestinationLongitude }
      );
      await tx.wait();
      setCompletionSuccess(true);
    } catch (error) {
      console.error("Error completing ride:", error);
      setCompletionSuccess(false);
    } finally {
      setCompleting(false);
    }
  };

  return (
    <div className='flex flex-col items-center'>
            <h2 className='w-full bg-green-300 rounded-md px-2 py-1 my-2'>Complete a Ride</h2>
      <div className='flex flex-col text-left border rounded-md shadow-md p-4'>

        <input 
          type="text" 
          value={rideId} 
          onChange={(e) => setRideId(e.target.value)} 
          placeholder="Ride ID" 
        />
        <input 
          type="text" 
          value={distance} 
          onChange={(e) => setDistance(e.target.value)} 
          placeholder="Distance" 
        />
        <input 
          type="text" 
          value={destinationLatitude} 
          onChange={(e) => setDestinationLatitude(e.target.value)} 
          placeholder="Destination Latitude" 
        />
        <input 
          type="text" 
          value={destinationLongitude} 
          onChange={(e) => setDestinationLongitude(e.target.value)} 
          placeholder="Destination Longitude" 
        />
        <button onClick={completeRide} disabled={completing}>
          {completing ? 'Completing...' : 'Complete Ride'}
        </button>
      </div>
      {completionSuccess === true && <p>Ride completed successfully!</p>}
      {completionSuccess === false && <p>Error completing ride. Please try again.</p>}
    </div>
  );
};

export default CompleteRide;
