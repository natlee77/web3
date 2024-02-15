 const metamaskEthChain ='0x5f9c86E20B1b29C9201F64CF8f06FDFfAf5D13Da'
                   
import {createTransactionList} from './dom.js';
 // public RPC endpoint
 export const web3 = new Web3 
 //('https://eth-mainnet.g.alchemy.com/v2/3tXzo69kYoBYaMgESbg6DSNgSDZawud-');
 //('https://sepolia.infura.io/v3/e16fa7853c2f48e5bfb730f83754b1ab');
 ('HTTP://127.0.0.1:7545'); //GANACHE
 

export async function showHistory(transactions) {
    for (let hash in transactions) {
        console.log('transactions', transactions);

        console.log('hash',  hash   );
        //  let trx = await web3.eth.getTransaction(hash);
        //   console.log('trx', trx);
         createTransactionList( transactions );
    }
}
