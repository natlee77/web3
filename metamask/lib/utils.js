 import { createTransactionList } from './dom.js';
 


 export async function showHistory(transactions) {
        for (let hash of transactions) {        
                let trx = await  window.eth.getTransaction(hash);       
               createTransactionList(trx);
         }
 }
 export const formatBalance = (rawBalance) => {
     const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(4);
     return balance;
 };


 export const formatChain = (chainIdHex) => {   
     switch (chainIdHex) {
         case '0x1':
            return 'Ethereum main';
             break;
         case '0xaa36a7':
             return 'Sepolia test network';
             break;
         case '0xa86a':
            return 'Avalanche';
             break;
         case '0xa869':
             return 'Avalanche Testnet';
             break;
         case '0x5':
            return'Goerli test network';
             break;
         case '0x61':
            return 'Binance Smart Chain';
             break;
         case '0x38':
            return 'Binance Smart Chain Testnet';
             break;
         case '0xe704':
            return 'Linea Goerli test network';
             break;
         case '0x539':
            return 'Localhost test networks';
             break;

            default:
            return 'unknown';
     }    
 };