// backend/config/blockchain.js
const { ethers } = require("ethers");
require("dotenv").config();

const contractABI = require("../abi/DeviceSupplyChain.json").abi;

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

module.exports = {
  contract,
  walletAddress: wallet.address, // ✅ Export wallet address
};
