import React, { useState } from 'react';
import { ethers } from 'ethers';

const RideDetails = ({ contractAddress, contractABI, customProvider }) => {
  const [rideId, setRideId] = useState('');
  const [rideDetails, setRideDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatRideDetails = (details) => {
    return {
      id: details.id.toString(),
      user: details.user,
      driver: details.driver,
      vehicleType: ethers.utils.parseBytes32String(details.vehicleType),
      distance: details.distance.toString(),
      startTime: new Date(details.startTime.toNumber() * 1000).toLocaleString(),
      finalCost: ethers.utils.formatUnits(details.finalCost, 18),
      status: details.status === 0 ? 'Pending' : 'Completed', // Adjust based on your RideStatus enum
      pickUpLocation: {
        latitude: details.pickUpLocation.latitude.toNumber() / 1e6,
        longitude: details.pickUpLocation.longitude.toNumber() / 1e6
      },
      destinationLocation: {
        latitude: details.destinationLocation.latitude.toNumber() / 1e6,
        longitude: details.destinationLocation.longitude.toNumber() / 1e6
      }
    };
  };

  const fetchRideDetails = async () => {
    if (!customProvider || !rideId) return;

    setLoading(true);
    try {
        const contract = new ethers.Contract(contractAddress, contractABI, customProvider);
        const response = await contract.getRideDetials(rideId);
        const statusMessage = response[0];
        const details = response[1];

        // Check if the ride was found
        if (statusMessage === "Ride not found") {
            setRideDetails(null);
        } else {
            // Format the details for display
            const formattedDetails = {
                id: details.id.toString(),
                user: details.user,
                driver: details.driver,
                vehicleType: ethers.utils.parseBytes32String(details.vehicleType),
                distance: details.distance.toString(),
                startTime: new Date(details.startTime.toNumber() * 1000).toLocaleString(),
                finalCost: ethers.utils.formatEther(details.finalCost),
                status: details.status === 0 ? 'Pending' : 'Completed', // Adjust based on your RideStatus enum
                pickUpLocation: {
                    latitude: details.pickUpLocation.latitude.toNumber() / 1e6,
                    longitude: details.pickUpLocation.longitude.toNumber() / 1e6
                },
                destinationLocation: {
                    latitude: details.destinationLocation.latitude.toNumber() / 1e6,
                    longitude: details.destinationLocation.longitude.toNumber() / 1e6
                }
            };
            setRideDetails(formattedDetails);
        }
    } catch (error) {
        console.error("Error fetching ride details:", error);
        setRideDetails(null);
    } finally {
        setLoading(false);
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchRideDetails();
  };

  const handleInputChange = (e) => {
    setRideId(e.target.value);
  };

  return (
    <div className='flex flex-col rounded-lg border border-gray-300 shadow-sm p-4'>
      <div className='flex flex-col my-2'>
        <h1 className='w-full bg-green-300 rounded-md px-2 py-1'>Get Ride Details</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="rideId" className='px-2 mt-2'>Ride ID:</label>
          <input
          className='py-1 my-2 px-3'
            type="text"
            id="rideId"
            value={rideId}
            onChange={handleInputChange}
            placeholder="Enter Ride ID"
          />
          <button type="submit" className='bg-blue-400'>Get Details</button>
        </form>
      </div>
      <h2 className='my-2'>Ride Details</h2>
      {loading ? <p>Loading ride details...</p> : (rideDetails ? (
        <div className='flex flex-col text-left border rounded-md shadow-md p-4'>
          <p className='text-sm text-clip'>Ride ID: {rideDetails.id}</p>
          <p className='text-sm text-clip'>User: {rideDetails.user}</p>
          <p className='text-sm text-clip'>Driver: {rideDetails.driver}</p>
          <p className='text-sm text-clip'>Vehicle Type: {rideDetails.vehicleType}</p>
          <p className='text-sm text-clip'>Distance: {rideDetails.distance}</p>
          <p className='text-sm text-clip'>Start Time: {rideDetails.startTime}</p>
          <p className='text-sm text-clip'>Final Cost: {rideDetails.finalCost} AVAX</p>
          <p className='text-sm text-clip'>Status: {rideDetails.status}</p>
          <p className='text-sm text-clip'>Pickup Location: Lat {rideDetails.pickUpLocation.latitude}, Long {rideDetails.pickUpLocation.longitude}</p>
          <p className='text-sm text-clip'>Destination Location: Lat {rideDetails.destinationLocation.latitude}, Long {rideDetails.destinationLocation.longitude}</p>
        </div>
      ) : (
        <p>No ride details found.</p>
      ))}
    </div>
  );
      }
  
  export default RideDetails;
