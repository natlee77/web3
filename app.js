import {web3 ,showHistory} from './lib/utils.js';

 const accountInput = document.getElementById('account');
 const checkBtn = document.getElementById('checkBalance');
 const showBalance = document.getElementById('balance')
 const transferBtn = document.getElementById('transfer');
 const amountInput = document.getElementById('amount');
 const toAccountInput = document.getElementById('toAccount');

 
 let account;
 
 async function initApp() {
    account = accountInput.value;   
 }
 async function checkBalance() {    
     const balance = await web3.eth.getBalance(account);
     showBalance.innerHTML = web3.utils.fromWei(balance, 'ether'); 

//HISTORY
    const block = await web3.eth.getBlock('latest');   
    const transactions = block.transactions ;   
    
    if(block !== null  &&  transactions !== null){   
          showHistory(transactions); 
    } 
 }

 
 async function transferTO() {
    // _______GANASHE
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
     // _______SEPOLIA
//     try {
//            const trx = {
//                from: account ,
//               to: toAccountInput.value,
//               value: '0x1',
//             //   value: web3.utils.toWei(amountInput.value, 'ether'),//convert to wei
//               gasPrice: '0x77359400',
//               maxPriorityFeePerGas: undefined,
//               maxFeePerGas: undefined
//             };
//             console.log('trx', trx);
//             web3.eth.sendTransaction(trx).on('error', error => console.log);
// //Error Transaction has been reverted by the EVM
//             const transactionHash = await web3.eth.sendTransaction(trx);
//             console.log(transactionHash, 'transactionHash');
//          } catch (error) {
//               console.log('Error', error.message);        
//          }   
 }
 document.addEventListener('DOMContentLoaded', initApp);
 checkBtn.addEventListener('click', checkBalance);
 transferBtn.addEventListener('click', transferTO);