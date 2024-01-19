const ethers = require("ethers");
require("dotenv").config();
const contractABI = require("./Hero/build/contracts/MyNFT.json"); // Contract ABI
const provider = new ethers.providers.JsonRpcProvider(
  process.env.RPC_URL
);
const privateKey = process.env.PRIVATE_KEY; // Private key of the deploying account

async function main() {
  const wallet = new ethers.Wallet(privateKey, provider);
  const gasLimit = ethers.utils.hexlify(3000000);
  const factory = new ethers.ContractFactory(
    contractABI.abi,
    contractABI.bytecode,
    wallet
  );

  const contract = await factory.deploy("MyNFT", "MNFT", {
    gasLimit: gasLimit,
  });
  await contract.deployed();

  console.log("Contract deployed to address:", contract.address);
}

main();
