import { ethers } from 'hardhat';
const { signMetaTxRequest } = require('./autotasks/sign/index.js');
const { relay } = require('./autotasks/relay/index.js');

async function main() {
  const [ owner, userEOA, userEOA2 ] = await ethers.getSigners();

  console.log("owner: ", owner.address);
  console.log("userEOA: ", userEOA.address);
  console.log("userEOA2: ", userEOA2.address, "\n");

  const forwarder = await ethers.getContractFactory("MinimalForwarder");
  const forwarderContract = await forwarder.deploy();

  console.log("forwarder contract deployed: ", forwarderContract.address, "\n");

  const counter = await ethers.getContractFactory("counter");
  const counterContract = await counter.deploy();

  console.log("counter contract deployed: ", counterContract.address, "\n");

  console.log("owner init balance: ", await ethers.provider.getBalance(owner.address));
  console.log("userEOA init balance: ", await ethers.provider.getBalance(userEOA.address));
  console.log("forwarderContract init balance: ", await ethers.provider.getBalance(forwarderContract.address), "\n");

  console.log("preTx count: ", await counterContract.getCount()), "\n";
  console.log("preTx lastCaller: ", await counterContract.getLastCaller()), "\n";

  console.log("userEOA.provider: ", userEOA.provider);

  const { request, signature } = await signMetaTxRequest(userEOA.provider, forwarderContract, {
    from: userEOA.address,
    to: counterContract.address,
    data: counterContract.interface.encodeFunctionData('increment'),
  });

  console.log("request: ", request, "\n");
  console.log("signature: ", signature, "\n");

  const relayTx = await relay(forwarderContract, request, signature);
  console.log("relayTx successful: ", relayTx, "\n");

  console.log("postTx count: ", await counterContract.getCount(), "\n");
  console.log("postTx lastCaller: ", await counterContract.getLastCaller()), "\n";

  console.log("owner post balance: ", await ethers.provider.getBalance(owner.address));
  console.log("userEOA post balance: ", await ethers.provider.getBalance(userEOA.address));
  console.log("forwarderContract post balance: ", await ethers.provider.getBalance(forwarderContract.address));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });