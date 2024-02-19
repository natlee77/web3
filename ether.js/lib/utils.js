import { ethers} from './ethers-5.2.esm.min.js';          
import {createTransactionList} from './dom.js';

const GANACHE_URL = 'HTTP://127.0.0.1:7545';
const mainnet_URL = 'https://eth-mainnet.g.alchemy.com/v2/3tXzo69kYoBYaMgESbg6DSNgSDZawud-' ;
const sepolia_URL = 'https://sepolia.infura.io/v3/e16fa7853c2f48e5bfb730f83754b1ab' ;

 // public RPC endpoint
 
export const provider = new ethers.providers.JsonRpcProvider
(GANACHE_URL);
 

export async function transferHistory(transactions) {
    transactions.forEach(trx=> {
        createTransactionList(trx);
    });  
       
}  
