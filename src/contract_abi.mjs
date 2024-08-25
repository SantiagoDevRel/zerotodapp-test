const CONTRACT_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "donate", outputs: [], stateMutability: "payable", type: "function" },
  { inputs: [], name: "getBalance", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "withdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
  { stateMutability: "payable", type: "receive" },
];

export default CONTRACT_ABI;
