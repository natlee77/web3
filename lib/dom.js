const transactionList = document.querySelector('#transactions');

export function createTransactionList(transaction) {
    transactionList.innerHTML = '';
    transactionList.innerHTML += `  
      <span>${transaction.from}</span>
      <span>${transaction.to}</span>
      <span>${web3.utils.fromWei(transaction.value, 'ether')} ETH</span>`;
  }