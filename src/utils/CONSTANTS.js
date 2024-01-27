export const rideTransactionsContract = {
    "address" : "0x4fDBd4C17B12f555E8bc44a1182e2e7cF85386F3",
    "abi": [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "rideId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				}
			],
			"name": "PaymentProcessed",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "rideId",
					"type": "uint256"
				}
			],
			"name": "RideCancelled",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "rideId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "finalCost",
					"type": "uint256"
				}
			],
			"name": "RideCompleted",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "rideId",
					"type": "uint256"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "driver",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "startTime",
					"type": "uint256"
				}
			],
			"name": "RideStarted",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "SCALE",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_rideId",
					"type": "uint256"
				}
			],
			"name": "cancelRide",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_rideId",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "distance",
					"type": "uint256"
				}
			],
			"name": "completeRide",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "costPerUnit",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_rideId",
					"type": "uint256"
				}
			],
			"name": "getRideDetails",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint256",
							"name": "id",
							"type": "uint256"
						},
						{
							"internalType": "address",
							"name": "user",
							"type": "address"
						},
						{
							"internalType": "address",
							"name": "driver",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "startTime",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "estimatedEndTime",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "finalCost",
							"type": "uint256"
						},
						{
							"internalType": "bool",
							"name": "completed",
							"type": "bool"
						}
					],
					"internalType": "struct RideTransactions.Ride",
					"name": "",
					"type": "tuple"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "nextRideId",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_rideId",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "_user",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_distanceTraveled",
					"type": "uint256"
				},
				{
					"internalType": "bytes32",
					"name": "_vehicleType",
					"type": "bytes32"
				}
			],
			"name": "processPayment",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "rides",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "user",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "driver",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "startTime",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "estimatedEndTime",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "finalCost",
					"type": "uint256"
				},
				{
					"internalType": "bool",
					"name": "completed",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_costPerUnit",
					"type": "uint256"
				}
			],
			"name": "setCostPerUnit",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_user",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "_estimatedEndTime",
					"type": "uint256"
				}
			],
			"name": "startRide",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]
}

export const rewardTransactionsContract = {
    "address" : "0x212177423618237a612851746011281498874017",
    "abi": []
}