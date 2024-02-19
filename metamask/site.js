import {  showHistory,  formatBalance,  formatChain 
} from "./lib/utils.js";
const connectMetamask = document.getElementById('connect');
const accountInput = document.getElementById('account');
const checkBtn = document.getElementById('checkBalance');
const showBalance = document.getElementById('balance')
const showChain = document.getElementById('chain');
const transferBtn = document.getElementById('transfer');
 const amountInput = document.getElementById('amount');
  const toAccountInput = document.getElementById('toAccount');

let balance = ' ';
async function initApp() {
  //  console.log('w',window.ethereum);    
  if (typeof window.ethereum !== 'undefined') {
    console.log('du …sta/ha metamask ');
  } else {
    console.log('du måsta ha metamask ');
  }
}

async function connectToMetamask() {
  if (typeof window.ethereum !== 'undefined') {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    console.log('accounts', accounts);

    const account = accounts[0];
    accountInput.value = account;
  } else {
    console.log('du måsta ha metamask ');
  }
}
async function checkBalance() {
  const balance =
    formatBalance(
      await window.ethereum.request({
        "method": "eth_getBalance",
        "params": [
          accountInput.value,
          'latest',
        ]
      })
    );
  const chainId = await window.ethereum.request({
    method: "eth_chainId",
  });
  console.log('chainId', chainId);
  console.log('balance', balance);
 
   
  showBalance.innerHTML = balance;
  showChain.innerHTML = formatChain(chainId) ;
 const block= await window.ethereum.request({
    "method": "eth_blockNumber",
    "params": []
  });
  console.log('block', block);
 const blockTransactionCount = await window.ethereum.request({
    "method": "eth_getBlockTransactionCountByNumber",
    "params": [
     block,
    ]
  });
  console.log('BlockTransaction', blockTransactionCount);
  const getTransactionByHash = await window.ethereum.request({
    "method": "eth_getTransactionByHash",
    "params": [
      "0x6c5be329b59cedaa4ae8c4bf59a2d4bbd3fcc9408b74c00972479bb58a32ef46"
    ]
  });
  console.log('getTransactionByHash', getTransactionByHash);
  
  //HISTORY  
  const transactions = await window.ethereum.request({
    "method": "eth_getTransactionCount",     
    "params": [
        accountInput.value,
        'latest',
    ]  
  })
  
console.log('transactions', transactions);

  if (transactions !== null) {
    showHistory(transactions);
  }
}

async function sendFunds() {
  try {
    const amount= parseFloat(amountInput.value)* Math.pow(10,18);
    console.log('amount', amount);
    console.log('Hex Value', Number(amount).toString(16));
    const response = await window.ethereum.request({
       method : "eth_sendTransaction",
       params : [
        {
           from : accountInput.value,
           to: toAccountInput.value,
           value: amount.toString(16),
           gas :  Number(21000).toString(16),
           gasPrice: Number(2500000 ).toString(16),

        }
      ]
    })
    const txRecept = await window.ethereum.request({
      "method": "eth_getTransactionReceipt",
    })
    console.log('txRecept', txRecept, 'response', response, 'txRecept-hash', txRecept.blockHash);  
    
  } catch (error) {
    console.log(error);
  }
}
document.addEventListener('DOMContentLoaded', initApp);
connectMetamask.addEventListener('click', connectToMetamask);
checkBtn.addEventListener('click', checkBalance);
transferBtn.addEventListener('click', sendFunds);