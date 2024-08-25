import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Web3 } from "web3";
import { MetamaskPlugin } from "web3-metamask-plugin";
import CONTRACT_ABI from "./contract_abi.mjs";

const CONTRACT_ADDRESS = "0x573930E820b17ce576359BcdF92F6B1a5aE5614F";

function App() {
  // Initialize web3 with injected provider
  const web3 = new Web3(window.ethereum);

  // Initialize Plugin
  web3.registerPlugin(new MetamaskPlugin());

  // Initialize contract
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  // Create account variable
  let account = null;

  // Create state of the address to update the front-end
  const [address, setAddress] = useState("0x");
  const [contractBalance, setContractBalance] = useState("0");
  const [txHash, setTxHash] = useState("0x");

  async function connectAccount() {
    account = await web3.metamask.connectWallet();
    setAddress(account[0]);
    return account[0];
  }

  async function getBalance() {
    const balance = await contract.methods.getBalance().call();
    const formattedBalance = web3.utils.toNumber(balance);
    console.log("balance:", formattedBalance);
    setContractBalance(formattedBalance);
  }

  async function donate() {
    const address = await connectAccount();
    const receipt = await contract.methods.donate().send({ from: address, value: 2 });
    setTxHash(receipt.transactionHash);
  }
  async function withdraw() {
    const address = await connectAccount();
    const receipt = await contract.methods.withdraw().send({ from: address });
    console.log(receipt.transactionHash);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Info-box">
          <p>
            <strong>Connected Address:</strong>
          </p>
          <p className="Address">{address}</p>
        </div>

        <div className="Button-group">
          <button className="App-button" onClick={connectAccount}>
            Connect
          </button>
          <button className="App-button" onClick={donate}>
            Donate 1 wei
          </button>
          <button className="App-button" onClick={getBalance}>
            Get Balance
          </button>
          <button className="App-button" onClick={withdraw}>
            Withdraw
          </button>
        </div>

        <div className="Info-box">
          <p>
            <strong>Balance of the Contract:</strong>
          </p>
          <p className="Balance">{contractBalance} wei</p>
        </div>
      </header>
    </div>
  );
}

export default App;
