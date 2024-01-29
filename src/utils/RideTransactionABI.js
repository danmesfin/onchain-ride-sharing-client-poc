export const rideTransactionsContract = {
    "address" : "0xc672cDA20627Cef952538297DE012a8e9F58cc95",
	"abi" : [
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
				}
			],
			"name": "RideAccepted",
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
					"indexed": false,
					"internalType": "bytes32",
					"name": "vehicleType",
					"type": "bytes32"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "requestedTime",
					"type": "uint256"
				}
			],
			"name": "RideRequested",
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
					"name": "_distance",
					"type": "uint256"
				},
				{
					"components": [
						{
							"internalType": "int256",
							"name": "latitude",
							"type": "int256"
						},
						{
							"internalType": "int256",
							"name": "longitude",
							"type": "int256"
						}
					],
					"internalType": "struct RideTransactions.Location",
					"name": "_destinationLocation",
					"type": "tuple"
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
			"name": "getRideDetials",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				},
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
							"internalType": "bytes32",
							"name": "vehicleType",
							"type": "bytes32"
						},
						{
							"internalType": "uint256",
							"name": "distance",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "startTime",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "finalCost",
							"type": "uint256"
						},
						{
							"internalType": "enum RideTransactions.RideStatus",
							"name": "status",
							"type": "uint8"
						},
						{
							"components": [
								{
									"internalType": "int256",
									"name": "latitude",
									"type": "int256"
								},
								{
									"internalType": "int256",
									"name": "longitude",
									"type": "int256"
								}
							],
							"internalType": "struct RideTransactions.Location",
							"name": "pickUpLocation",
							"type": "tuple"
						},
						{
							"components": [
								{
									"internalType": "int256",
									"name": "latitude",
									"type": "int256"
								},
								{
									"internalType": "int256",
									"name": "longitude",
									"type": "int256"
								}
							],
							"internalType": "struct RideTransactions.Location",
							"name": "destinationLocation",
							"type": "tuple"
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
			"inputs": [
				{
					"internalType": "address",
					"name": "requester",
					"type": "address"
				}
			],
			"name": "getRideRequest",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint256",
							"name": "rideId",
							"type": "uint256"
						},
						{
							"internalType": "address",
							"name": "user",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "requestedTime",
							"type": "uint256"
						},
						{
							"internalType": "bytes32",
							"name": "vehicleType",
							"type": "bytes32"
						},
						{
							"internalType": "enum RideTransactions.RideStatus",
							"name": "status",
							"type": "uint8"
						},
						{
							"components": [
								{
									"internalType": "int256",
									"name": "latitude",
									"type": "int256"
								},
								{
									"internalType": "int256",
									"name": "longitude",
									"type": "int256"
								}
							],
							"internalType": "struct RideTransactions.Location",
							"name": "pickUpLocation",
							"type": "tuple"
						},
						{
							"components": [
								{
									"internalType": "int256",
									"name": "latitude",
									"type": "int256"
								},
								{
									"internalType": "int256",
									"name": "longitude",
									"type": "int256"
								}
							],
							"internalType": "struct RideTransactions.Location",
							"name": "destinationLocation",
							"type": "tuple"
						}
					],
					"internalType": "struct RideTransactions.RideRequest",
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
					"internalType": "bytes32",
					"name": "_vehicleType",
					"type": "bytes32"
				},
				{
					"components": [
						{
							"internalType": "int256",
							"name": "latitude",
							"type": "int256"
						},
						{
							"internalType": "int256",
							"name": "longitude",
							"type": "int256"
						}
					],
					"internalType": "struct RideTransactions.Location",
					"name": "_pickUpLocation",
					"type": "tuple"
				},
				{
					"components": [
						{
							"internalType": "int256",
							"name": "latitude",
							"type": "int256"
						},
						{
							"internalType": "int256",
							"name": "longitude",
							"type": "int256"
						}
					],
					"internalType": "struct RideTransactions.Location",
					"name": "_destinationLocation",
					"type": "tuple"
				}
			],
			"name": "requestRide",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "rideRequests",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "rideId",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "user",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "requestedTime",
					"type": "uint256"
				},
				{
					"internalType": "bytes32",
					"name": "vehicleType",
					"type": "bytes32"
				},
				{
					"internalType": "enum RideTransactions.RideStatus",
					"name": "status",
					"type": "uint8"
				},
				{
					"components": [
						{
							"internalType": "int256",
							"name": "latitude",
							"type": "int256"
						},
						{
							"internalType": "int256",
							"name": "longitude",
							"type": "int256"
						}
					],
					"internalType": "struct RideTransactions.Location",
					"name": "pickUpLocation",
					"type": "tuple"
				},
				{
					"components": [
						{
							"internalType": "int256",
							"name": "latitude",
							"type": "int256"
						},
						{
							"internalType": "int256",
							"name": "longitude",
							"type": "int256"
						}
					],
					"internalType": "struct RideTransactions.Location",
					"name": "destinationLocation",
					"type": "tuple"
				}
			],
			"stateMutability": "view",
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
					"internalType": "bytes32",
					"name": "vehicleType",
					"type": "bytes32"
				},
				{
					"internalType": "uint256",
					"name": "distance",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "startTime",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "finalCost",
					"type": "uint256"
				},
				{
					"internalType": "enum RideTransactions.RideStatus",
					"name": "status",
					"type": "uint8"
				},
				{
					"components": [
						{
							"internalType": "int256",
							"name": "latitude",
							"type": "int256"
						},
						{
							"internalType": "int256",
							"name": "longitude",
							"type": "int256"
						}
					],
					"internalType": "struct RideTransactions.Location",
					"name": "pickUpLocation",
					"type": "tuple"
				},
				{
					"components": [
						{
							"internalType": "int256",
							"name": "latitude",
							"type": "int256"
						},
						{
							"internalType": "int256",
							"name": "longitude",
							"type": "int256"
						}
					],
					"internalType": "struct RideTransactions.Location",
					"name": "destinationLocation",
					"type": "tuple"
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
					"components": [
						{
							"internalType": "int256",
							"name": "latitude",
							"type": "int256"
						},
						{
							"internalType": "int256",
							"name": "longitude",
							"type": "int256"
						}
					],
					"internalType": "struct RideTransactions.Location",
					"name": "_pickUpLocation",
					"type": "tuple"
				}
			],
			"name": "startRide",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "vehicles",
			"outputs": [
				{
					"internalType": "address",
					"name": "id",
					"type": "address"
				},
				{
					"internalType": "string",
					"name": "model",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
}

