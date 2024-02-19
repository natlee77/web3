
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
console.log('account', account);
const chainId = await provider.getNetwork();
console.log('chainId', chainId);
     //HISTORY
     let scanProvaider = new ethers.providers.EtherscanProvider();
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
console.log('amount', amount);

     // GANACHE
    //   const transaction = await signer.sendTransaction({         
    //       to: toAccountInput.value,
    //       value: ethers.utils.parseEther(amountInput.value),
    //       gasLimit: 21000, 
    //   })


     //____________SEPOLIA
        const transaction = await signer.sendTransaction({  
            to: toAccountInput.value,
            value:  amount  ,
            gasLimit: "21000",
            maxPriorityFeePerGas: ethers.utils.parseEther('500000'),
            maxFeePerGas: ethers.utils.parseEther( '20' ),
            // nonce: await ethers.provider.getTransactionCount(account, 'latest'),
            type: 2,
            chainId: 11155111,  

  
            
              
     })    
console.log('gasprice', ethers.utils.formatEther(transaction.gasPrice)  );

    
      console.log('transaction', transaction);   
      console.log('gaspiset', ethers.utils.formatEther(transaction.gasPrice)  ); 

 }


 document.addEventListener('DOMContentLoaded', initApp);
 checkBtn.addEventListener('click', checkBalance);
 transferBtn.addEventListener('click', transferTo);