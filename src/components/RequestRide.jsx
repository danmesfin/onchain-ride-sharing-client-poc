import React, { useState } from 'react';
import { ethers, BigNumber } from 'ethers';

const RequestRide = ({ contractAddress, contractABI, customProvider }) => {
  const [vehicleType, setVehicleType] = useState('');
  const [pickupLatitude, setPickupLatitude] = useState('');
  const [pickupLongitude, setPickupLongitude] = useState('');
  const [destinationLatitude, setDestinationLatitude] = useState('');
  const [destinationLongitude, setDestinationLongitude] = useState('');
  const [requesting, setRequesting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(null);

  const requestRide = async () => {
    if (!customProvider || !vehicleType || !pickupLatitude || !pickupLongitude || !destinationLatitude || !destinationLongitude) {
      alert("Please fill in all fields");
      return;
    }
  
  // Scale latitude and longitude
  const scale = BigNumber.from("1000000");
  const scaledPickupLatitude = BigNumber.from(parseFloat(pickupLatitude) * 1e6);
  const scaledPickupLongitude = BigNumber.from(parseFloat(pickupLongitude) * 1e6);
  const scaledDestinationLatitude = BigNumber.from(parseFloat(destinationLatitude) * 1e6);
  const scaledDestinationLongitude = BigNumber.from(parseFloat(destinationLongitude) * 1e6);

    setRequesting(true);
    
    try {
      const signer = customProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.requestRide(
        ethers.utils.formatBytes32String(vehicleType),
        { latitude: scaledPickupLatitude, longitude: scaledPickupLongitude },
        { latitude: scaledDestinationLatitude, longitude: scaledDestinationLongitude }
      );
      await tx.wait();
      setRequestSuccess(true);
    } catch (error) {
      console.error("Error requesting ride:", error);
      setRequestSuccess(false);
    } finally {
      setRequesting(false);
    }
  };
  

  return (
    <div className='flex flex-col items-center'>
        <div className='flex flex-col text-left border rounded-md shadow-md p-4'>
        <h2 className='w-full bg-green-500 rounded-md px-2 py-1 my-2'>Request a Ride</h2>
        <input type="text" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} placeholder="Vehicle Type" />
        <input type="text" value={pickupLatitude} onChange={(e) => setPickupLatitude(e.target.value)} placeholder="Pickup Latitude" />
        <input type="text" value={pickupLongitude} onChange={(e) => setPickupLongitude(e.target.value)} placeholder="Pickup Longitude" />
        <input type="text" value={destinationLatitude} onChange={(e) => setDestinationLatitude(e.target.value)} placeholder="Destination Latitude" />
        <input type="text" value={destinationLongitude} onChange={(e) => setDestinationLongitude(e.target.value)} placeholder="Destination Longitude" />
        <button onClick={requestRide} disabled={requesting}>
          {requesting ? 'Requesting...' : 'Request Ride'}
        </button>
      </div>
      {requestSuccess === true && <p>Ride requested successfully!</p>}
      {requestSuccess === false && <p>Error requesting ride. Please try again.</p>}
    </div>
  );
};

export default RequestRide;
