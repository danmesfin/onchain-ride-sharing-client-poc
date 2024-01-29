import React, { useState } from 'react';
import { ethers } from 'ethers';

const ProcessPayment = ({ contractAddress, contractABI, customProvider }) => {
  const [rideId, setRideId] = useState('');
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleProcessPayment = async (e) => {
    e.preventDefault();
    if (!customProvider || !rideId || !amount) {
      alert("Please fill in all fields");
      return;
    }

    setProcessing(true);

    try {
      const signer = customProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.processPayment(
        ethers.BigNumber.from(rideId),
        { value: ethers.utils.parseEther(amount) }
      );
      await tx.wait();
      setPaymentSuccess(true);
    } catch (error) {
      console.error("Error processing payment:", error);
      setPaymentSuccess(false);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className='flex flex-col items-center'>
        <form onSubmit={handleProcessPayment} className='flex flex-col text-left border rounded-md shadow-md p-4'>
        <h2  className='w-full bg-green-200 rounded-md px-2 py-1 my-2'>Process Payment</h2>

        <input 
          type="text" 
          value={rideId} 
          onChange={(e) => setRideId(e.target.value)} 
          placeholder="Ride ID" 
        />
        <input 
          type="text" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Amount in AVAX" 
        />
        <button type="submit" disabled={processing} className='bg-blue-400'>
          {processing ? 'Processing...' : 'Process Payment'}
        </button>
      </form>
      {paymentSuccess === true && <p>Payment processed successfully!</p>}
      {paymentSuccess === false && <p>Error processing payment. Please try again.</p>}
    </div>
  );
};

export default ProcessPayment;
