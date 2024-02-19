import {
  showHistory,
  formatBalance,
  formatChainAsNum
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
  showChain.innerHTML = chainId;
  //HISTORY  
  const transactions = await window.ethereum.request({
    "method": "eth_getTransaction ",   
    "params": [
      accountInput.value,
      'latest',
    ]
  })

  if (transactions !== null) {
    showHistory(transactions);
  }
}

async function sendFunds() {
  try {
  } catch (error) {
    console.log(error);
  }
}
document.addEventListener('DOMContentLoaded', initApp);
connectMetamask.addEventListener('click', connectToMetamask);
checkBtn.addEventListener('click', checkBalance);
transferBtn.addEventListener('click', sendFunds);