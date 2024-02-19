import { ethers } from './ethers-5.2.esm.min.js';
const transactionList = document.querySelector('#transactions');

export function createTransactionList(transaction) {     
      transactionList.innerHTML += `  
    <div >
    <span>${transaction.from}</span>
    <span>${transaction.to}</span>
   <span>${ethers.utils.formatEther(transaction.value).toString().slice(0,5)  } ETH</span> 
   </div>
   `
  }
 