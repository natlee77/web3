               
import {createTransactionList} from './dom.js';

const GANACHE_URL = 'HTTP://127.0.0.1:7545';
const mainnet_URL = 'https://eth-mainnet.g.alchemy.com/v2/3tXzo69kYoBYaMgESbg6DSNgSDZawud-' ;
const sepolia_URL = 'https://sepolia.infura.io/v3/e16fa7853c2f48e5bfb730f83754b1ab' ;

 // public RPC endpoint
 export const web3 = new Web3(sepolia_URL);  
 

  export async function showHistory(transactions) {
//     for (let hash of transactions) {        
//          let trx = await web3.eth.getTransaction(hash);       
//          createTransactionList(trx);
//     }
}
export const formatBalance = (rawBalance ) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
    return balance;
};

export const formatChainAsNum = (chainIdHex ) => {
    const chainIdNum = parseInt(chainIdHex);
    return chainIdNum;
};