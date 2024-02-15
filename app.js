import {web3 ,showHistory} from './lib/utils.js';

 const accountInput = document.getElementById('account');
 const checkBtn = document.getElementById('checkBalance');
 const showBalance = document.getElementById('balance')
 const transferBtn = document.getElementById('transfer');
 const amountInput = document.getElementById('amount');
 const toAccountInput = document.getElementById('toAccount');

 
 let account;
 let signer;
 async function initApp() {
    //  const blockNumber = await web3.eth.getBlockNumber();
    //  console.log('blockNumber', blockNumber);

 }
 async function checkBalance() {
     account = accountInput.value;  
     const balance = await web3.eth.getBalance(account);
     showBalance.innerHTML = web3.utils.fromWei(balance, 'ether'); 
   const trns =await web3.eth.getTransactionCount(account) 
     console.log('count-transactions', trns  );
     
    
//HISTORY
    const block = await web3.eth.getBlock('latest');   
    const transactions = block.transactions ;  
    console.log('transactions-checkbalance', transactions);
    
    if(block !== null  &&  transactions !== null){
        console.log('h',showHistory(trns));
        
        showHistory(trns);
    } 
 }

 
 async function transferTO() {
    try {
        const trx = {
            from: account ,
            to: toAccountInput.value,
            value: web3.utils.toWei(amountInput.value, 'ether')//convert to wei
        };
        const trxReceipt = await web3.eth.sendTransaction(trx);//callback
        console.log('Trx hash:' ,  trxReceipt.transactionHash,'block number:', trxReceipt.blockNumber);
        
    } catch (error) {
        console.log('Error', error.message);
        
    }
      
 }
 document.addEventListener('DOMContentLoaded', initApp);
 checkBtn.addEventListener('click', checkBalance);
 transferBtn.addEventListener('click', transferTO);