
import { provider, transferHistory } from './lib/utils.js';   
import { ethers} from './lib/ethers-5.2.esm.min.js';     


 const accountInput = document.getElementById('account');
 const checkBtn = document.getElementById('checkBalance');
 const showBalance = document.getElementById('balance');
 const transferBtn = document.getElementById('transfer');
 const amountInput = document.getElementById('amount');
 const toAccountInput = document.getElementById('toAccount');
 let account;
 let signer;
 async function initApp() {
     account = accountInput.value;
 }

 async function checkBalance() {
     account = accountInput.value;
     const balance = await provider.getBalance(account);

     //HISTORY
     let scanProvaider = new ethers.providers.EtherscanProvider();
     console.log('scanProvaider', scanProvaider);
     
     const history = await scanProvaider.getHistory(account);
       console.log('history', history);
     //  console.log('TransactionCount', await provider.getTransactionCount(account));
     transferHistory(history);
     showBalance.innerHTML = ethers.utils.formatEther(balance); //(balance.toString()) ;// wei
 }

 //to be able to transfer needs private-key
 async function transferTo() {
     signer = provider.getSigner(account);
     console.log('signer', signer);
    const amount = ethers.utils.parseEther(amountInput.value);

     // GANACHE
      const transaction = await signer.sendTransaction({         
          to: toAccountInput.value,
          value: ethers.utils.parseEther(amountInput.value),
          gasLimit: 21000, 
      })
     //sepolia
      /*  const transaction = await signer.sendTransaction({  
            gas:21000,
            value : {
                gas: 21000 ,
                value:{  amount: amount,  },    //error i BIGNUMBER       
                from :account,
                to: toAccountInput.value,
                gasLimit :{  undefined,  } 
             }     
     })   */

    
      console.log('transaction', transaction);   
      console.log('gaspiset', ethers.utils.formatEther(transaction.gasPrice)  ); 

 }


 document.addEventListener('DOMContentLoaded', initApp);
 checkBtn.addEventListener('click', checkBalance);
 transferBtn.addEventListener('click', transferTo);