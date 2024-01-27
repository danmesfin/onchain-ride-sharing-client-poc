import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const RideDetails = ({ contractAddress, contractABI, customProvider, rideId }) => {
  const [rideDetails, setRideDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRideDetails = async () => {
      if (!customProvider || !rideId) return;

      try {
        const contract = new ethers.Contract(contractAddress, contractABI, customProvider);
        const details = await contract.getRideDetails(rideId);
        // Format the details for display
        const formattedDetails = {
          id: details[0].toString(),
          user: details[1],
          driver: details[2],
          startTime: new Date(details[3].toNumber() * 1000).toLocaleString(),
          estimatedEndTime: new Date(details[4].toNumber() * 1000).toLocaleString(),
          finalCost: ethers.utils.formatUnits(details[5], 18),
          completed: details[6]
        };
        setRideDetails(formattedDetails);
      } catch (error) {
        console.error("Error fetching ride details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRideDetails();
  }, [customProvider, contractAddress, contractABI, rideId]);

  if (loading) return <p>Loading ride details...</p>;

  return (
    <div className='flex flex-col items-center'>
      <h2>Ride Details</h2>
      {rideDetails ? (
        <div className='flex flex-col text-left border rounded-md shadow-md p-4'>
          <p className='text-sm text-clip'>Ride ID: {rideDetails.id}</p>
          <p className='text-sm text-clip'>User: {rideDetails.user}</p>
          <p className='text-sm text-clip'>Driver: {rideDetails.driver}</p>
          <p className='text-sm text-clip'>Start Time: {rideDetails.startTime}</p>
          <p className='text-sm text-clip'>Estimated End Time: {rideDetails.estimatedEndTime}</p>
          <p className='text-sm text-clip'>Final Cost: {rideDetails.finalCost} AVAX</p>
          <p className='text-sm text-clip'>Status: {rideDetails.completed ? 'Completed' : 'Pending'}</p>
        </div>
      ) : (
        <p>No ride details found.</p>
      )}
    </div>
  );
};

export default RideDetails;
