let open = 0, approved = 0, rejected = 0;
let statusDisplay = false;
let retrieveTransaction = JSON.parse(localStorage.getItem('transactionData'));
let retrieveUserData = JSON.parse(localStorage.getItem('userData'));
const allTransactionContainer = document.querySelector('.transaction-list');

class Transaction{
    constructor(transactionList){
        this.transactionList = transactionList;
    }

    createItem(transactionList){
        //create element for a single transaction
        const dataContainer = document.createElement('div');
        const idContainer = document.createElement('div');
        const statusContainer = document.createElement('div');
        const requestTypeContainer = document.createElement('div');
        const accountNameContainer = document.createElement('div');
        const accountNumberContainer = document.createElement('div');
        const amountContainer = document.createElement('div');
        const processContainer = document.createElement('div');
        const rejectContainer = document.createElement('div');
        const processText = document.createElement('span');
        const rejectText = document.createElement('span');

        //add class to created element
        dataContainer.classList.add('data', 'flex');
        idContainer.classList.add('data-id', 'flex');
        statusContainer.classList.add('data-status', 'flex');
        requestTypeContainer.classList.add('data-request-type', 'flex');
        accountNameContainer.classList.add('data-account-name', 'flex');
        accountNumberContainer.classList.add('data-account-number', 'flex');
        amountContainer.classList.add('data-amount', 'flex');
        processContainer.classList.add('data-process', 'flex');
        rejectContainer.classList.add('data-reject', 'flex');
        processText.classList.add('process-text');
        rejectText.classList.add('reject-text');

        //insert data values to each element created
        idContainer.innerText = transactionList.id;
        statusContainer.innerText = transactionList.status;
        requestTypeContainer.innerText = transactionList.requestType;
        accountNameContainer.innerText = transactionList.accountName;
        accountNumberContainer.innerText = transactionList.origAccount;
        amountContainer.innerText = transactionList.amount;
        processText.innerText = 'Process';
        rejectText.innerText = 'Reject';

        //append elements
        allTransactionContainer.appendChild(dataContainer);
        dataContainer.appendChild(idContainer);
        dataContainer.appendChild(statusContainer);
        dataContainer.appendChild(requestTypeContainer);
        dataContainer.appendChild(accountNameContainer);
        dataContainer.appendChild(accountNumberContainer);
        dataContainer.appendChild(amountContainer);
        dataContainer.appendChild(processContainer);
        dataContainer.appendChild(rejectContainer);
        processContainer.appendChild(processText);
        rejectContainer.appendChild(rejectText);

        //text color of treansaction status
        switch(transactionList.status){
            case 'Open':
                statusContainer.style.color = 'var(--blue)';
                break;
            case 'Approved':
                statusContainer.style.color = 'var(--green)';
                break;
            case 'Rejected':
                statusContainer.style.color = 'var(--red)';
                break;
        }

        //disable process and reject clickable text then change color when transaction is completed
        if(transactionList.status === 'Approved' || transactionList.status === 'Rejected'){
            processText.style.pointerEvents = 'none';
            processText.style.color = 'var(--black)';
            rejectText.style.pointerEvents = 'none';
            rejectText.style.color = 'var(--black)';
        }

        //process clickable text is pressed
        processText.addEventListener('click', ()=>{
            const transactionWindow = document.getElementsByClassName('transaction-window-container');   
            const ok = document.getElementById('auto-ok');
            const cancel = document.getElementById('auto-cancel');
            
            transactionWindow[0].style.visibility = 'visible';
            displayTransactionDetails(idContainer.innerText);         //display transaction details
            
            function okPressed(){
                processTransaction(idContainer.innerText);      //process deposit, withdrawal and transfer
                if(statusDisplay){                              //update the display on dashboard
                    allTransactionContainer.removeChild(dataContainer);
                }else{
                    clearTransactionList();
                    displayTransaction(retrieveTransaction);
                }
                transactionWindow[0].style.visibility = 'hidden';
                updateCount();      //update the status counts
            }

            //ok button is pressed
            ok.addEventListener('click', okPressed, {once: true});

            //cancel button is pressed
            cancel.addEventListener('click', ()=> {
                ok.removeEventListener('click', okPressed);
                transactionWindow[0].style.visibility = 'hidden';
            });
        });

        //reject clickable test is pressed
        rejectText.addEventListener('click', ()=> {
            for(let i = 0; i < retrieveTransaction.length; i++){    //change status to rejected and update local storage and dashboard display
                if(retrieveTransaction[i].id === idContainer.innerText){
                    retrieveTransaction[i].status = 'Rejected';
                    statusContainer.innerText = retrieveTransaction[i].status;
                    localStorage.setItem('transactionData', JSON.stringify(retrieveTransaction));
                    if(statusDisplay){
                        allTransactionContainer.removeChild(dataContainer);
                    }else{
                        clearTransactionList();
                        displayTransaction(retrieveTransaction);
                    }
                }
            }
            updateCount();      //update the status counts
        });
    }
}

class Transfer{
    constructor(id, status, transactionType, accountName, origAccount, destAccount, amount){
        this.id = id;
        this.status = status;
        this.requestType = transactionType;
        this.accountName = accountName;
        this.origAccount = origAccount;
        this.destAccount = destAccount;
        this.amount = amount;
    }
}

class DepositWithdrawal{
    constructor(id, status, transactionType, accountName, origAccount, amount){
        this.id = id;
        this.status = status;
        this.requestType = transactionType;
        this.accountName = accountName;
        this.origAccount = origAccount;
        this.amount = amount;
    }
}

window.onload = initialize();

function initialize(){
    const searchName = document.getElementById('search');
    const openDisplay = document.getElementById('open');
    const approvedDisplay = document.getElementById('approved');
    const rejectedDisplay = document.getElementById('rejected');
    const manualTransactionButton = document.getElementsByClassName('manual-transaction');
    const manualTransactionWindow = document.getElementsByClassName('manual-container');

    updateCount();      //update the status counts
    if(retrieveTransaction){        //displays all transactions
        clearTransactionList();
        for(let element of retrieveTransaction){
            displayTransaction(element);
        }
    }
    openDisplay.addEventListener('click', ()=> {        //open display count is pressed
        searchName.value = '';
        statusDisplay = true;
        clearTransactionList();
        filterStatus('Open');
    });
    approvedDisplay.addEventListener('click', ()=> {        //approved display count is pressed
        searchName.value = '';
        statusDisplay = true;
        clearTransactionList();
        filterStatus('Approved');
    });
    rejectedDisplay.addEventListener('click', ()=> {        //rejected display count is pressed
        searchName.value = '';
        statusDisplay = true;
        clearTransactionList();
        filterStatus('Rejected');
    });
    searchName.addEventListener('keypress', ()=> {      //search
        clearTransactionList();
        filterName(searchName.value);
    });
    manualTransactionButton[0].addEventListener('click', ()=> {     //manual transaction button is pressed
        manualTransactionWindow[0].style.visibility = 'visible';
        processManualTransaction();
    });
}

function statusCount(status){
    let count = 0;
    for(let i = 0; i < retrieveTransaction.length; i++){
        if(retrieveTransaction[i].status === status){
            count++;
        }
    }
    return count;
}

function updateCount(){
    const openCount = document.getElementsByClassName('open-count');
    const approvedCount = document.getElementsByClassName('approved-count');
    const rejectedCount = document.getElementsByClassName('rejected-count');

    openCount[0].innerText = statusCount('Open');
    approvedCount[0].innerText = statusCount('Approved');
    rejectedCount[0].innerText = statusCount('Rejected');
}

function filterStatus(status){
    for(let i = 0; i < retrieveTransaction.length; i++){
        if(retrieveTransaction[i].status === status){
            displayTransaction(retrieveTransaction[i]);
        }
    }
}

function filterName(name){
    if(name === '' || name === null){
        displayTransaction(retrieveTransaction);
    }else{
        for(let i = 0; i < retrieveTransaction.length; i++){
            if(retrieveTransaction[i].accountName === name || retrieveTransaction[i].accountName.toLowerCase() === name || retrieveTransaction[i].accountName.toUpperCase() === name){
                displayTransaction(retrieveTransaction[i]);
            }
        }
    }
}

function displayTransaction(transactionData){   
    if(transactionData.length > 1){
        for(let transactionList of transactionData){
            let transactionEntry = new Transaction(transactionList);
            transactionEntry.createItem(transactionList);
        }
    }else{
        let transactionEntry = new Transaction(transactionData);
        transactionEntry.createItem(transactionData);
    }
}

function clearTransactionList(){
    while(allTransactionContainer.firstChild){
        allTransactionContainer.removeChild(allTransactionContainer.lastChild);
    }
}

function displayTransactionDetails(id){
    const transIdDisplay = document.getElementById('transaction-id');
    const requestTypeDisplay = document.getElementById('request-type');
    const acctNameDisplay = document.getElementById('account-name');
    const origAcctDisplay = document.getElementById('orig-account');
    const origAcctHeader = document.getElementById('orig-account-header');
    const destAcctDisplay = document.getElementById('dest-account');
    const destAcctHeader = document.getElementById('dest-account-header');
    const destAcctContainer = document.getElementById('dest-container');
    const amountDisplay = document.getElementById('amount-transaction');

    for(let i = 0; i < retrieveTransaction.length; i++){
        if(retrieveTransaction[i].id === id){
            transIdDisplay.innerText = retrieveTransaction[i].id;
            requestTypeDisplay.innerText = retrieveTransaction[i].requestType;
            acctNameDisplay.innerText = retrieveTransaction[i].accountName;
            origAcctDisplay.innerText = retrieveTransaction[i].origAccount;
            amountDisplay.innerText = retrieveTransaction[i].amount;
            if(retrieveTransaction[i].requestType === 'Transfer'){
                destAcctDisplay.innerText = retrieveTransaction[i].destAccount;
                origAcctHeader.innerText = 'Originating Account:';
                destAcctHeader.innerText = "Receiver's Name:";
                destAcctContainer.style.margin = '8px';
                destAcctContainer.style.height = '18.4px';
            }else{
                destAcctDisplay.innerText = '';
                origAcctHeader.innerText = 'Account Number';
                destAcctHeader.innerText = '';
                destAcctContainer.style.height = '0px';
                destAcctContainer.style.margin = '0';
            }
        }
    }
}

function validateTransfer(origin, destination, amount){
    let originNotFound = 0, destinationNotFound = 0;

    for(let i = 0; i < retrieveUserData.length; i++){
        if(retrieveUserData[i].name === origin || retrieveUserData[i].name.toLowerCase() === origin.toLowerCase() || retrieveUserData[i].name.toUpperCase() === origin.toUpperCase()){
            if(parseInt(amount) >= 0){
                if(parseInt(retrieveUserData[i].balance) >= parseInt(amount)){
                    for(let j = 0; j < retrieveUserData.length; j++){
                        if(retrieveUserData[j].name === destination || retrieveUserData[j].name.toLowerCase() === destination.toLowerCase() || retrieveUserData[j].name.toUpperCase() === destination.toUpperCase()){
                            return true;
                        }else{
                            ++destinationNotFound;
                        }
                        if(destinationNotFound === retrieveUserData.length){
                            alert('Receiver account not found');
                            return false;
                        }
                    }
                }else{
                    alert('Your account balance is insufficient.');
                    return false;
                }
            }else{
                alert('Entered amount cannot be negative');
                return false;
            }
        }else{
            ++originNotFound;
        }
        if(originNotFound === retrieveUserData.length){
            alert('Account not found.');
            return false;
        }
    }
}

function validateDeposit(origin, amount){
    let notFound = 0;

    for(let i = 0; i < retrieveUserData.length; i++){
        if(retrieveUserData[i].name === origin || retrieveUserData[i].name.toLowerCase() === origin.toLowerCase() || retrieveUserData[i].name.toUpperCase() === origin.toUpperCase()){
            if(parseInt(amount) >= 0){
                return true;
            }else{
                alert('Entered amount cannot be negative.');
                return false;
            }
        }else{
            ++notFound;
        }
        if(notFound === retrieveUserData.length){
            alert('Account not found.');
            return false;
        }
    }
}

function validateWithdrawal(origin, amount){
    let notFound = 0;

    for(let i = 0; i < retrieveUserData.length; i++){
        if(retrieveUserData[i].name === origin || retrieveUserData[i].name.toLowerCase() === origin.toLowerCase() || retrieveUserData[i].name.toUpperCase() === origin.toUpperCase()){
            if(parseInt(amount) >= 0){
                if(parseInt(retrieveUserData[i].balance) >= parseInt(amount)){
                    return true;
                }else{
                    alert('Your account balance is insufficient.');
                    return false;
                }
            }else{
                alert('Entered amount cannot be negative.');
                return false;
            }
        }else{
            ++notFound;
        }
        if(notFound === retrieveUserData.length){
            alert('Account not found.');
            return false;
        }
    }
}

function processManualTransaction(){
    const manualTransactionWindow = document.getElementsByClassName('manual-container');
    const enterTransactionType = document.getElementById('dropdown');
    const enterName = document.getElementById('name');
    const enterOriginatingAccount = document.getElementById('originating-account');
    const enterDestinationAccount = document.getElementById('destination-account');
    const enterAmount = document.getElementById('amount');
    const ok = document.getElementById('manual-ok');
    const cancel = document.getElementById('manual-cancel');
    let id = 0;
    let newTransaction = {};

    enterTransactionType.value = 'Select';
    enterName.value = '';
    enterOriginatingAccount.value = '';
    enterDestinationAccount.value = '';
    enterAmount.value = '';

    enterTransactionType.addEventListener('change', ()=> {
        if(enterTransactionType.value === 'Transfer' || enterTransactionType.value === 'Select'){
            enterDestinationAccount.value = '';
            enterDestinationAccount.disabled = false;
            enterDestinationAccount.required = true;
        }else if(enterTransactionType.value === 'Deposit' || enterTransactionType.value === 'Withdrawal'){
            enterDestinationAccount.value = '';
            enterDestinationAccount.disabled = true;
            enterDestinationAccount.required = false;
        }
    });

    function process(){
        if(enterTransactionType.value === 'Transfer'){
            if(validateTransfer(enterName.value, enterDestinationAccount.value, enterAmount.value)){
                id = parseInt(retrieveTransaction[retrieveTransaction.length - 1].id) + 1;
                id = id.toString();
                newTransaction = new Transfer(id, 'Approved', enterTransactionType.value, enterName.value, enterOriginatingAccount.value, enterDestinationAccount.value, enterAmount.value);
                transfer(newTransaction.accountName, newTransaction.destAccount, newTransaction.amount);
                updateManualTransaction(newTransaction);
                updateCount();
            }
        }else if(enterTransactionType.value === 'Select'){
            alert('Please select your transaction.');
        }else{
            if(enterTransactionType.value === 'Deposit'){
                if(validateDeposit(enterName.value, enterAmount.value)){
                    id = parseInt(retrieveTransaction[retrieveTransaction.length - 1].id) + 1;
                    id = id.toString();
                    newTransaction = new DepositWithdrawal(id, 'Approved', enterTransactionType.value, enterName.value, enterOriginatingAccount.value, enterAmount.value);
                    deposit(newTransaction.accountName, newTransaction.amount);
                }
            }else{
                if(validateWithdrawal(enterName.value, enterAmount.value)){
                    id = parseInt(retrieveTransaction[retrieveTransaction.length - 1].id) + 1;
                    id = id.toString();
                    newTransaction = new DepositWithdrawal(id, 'Approved', enterTransactionType.value, enterName.value, enterOriginatingAccount.value, enterAmount.value);
                    withdraw(newTransaction.accountName, newTransaction.amount);
                }
            }   
            updateManualTransaction(newTransaction);
            updateCount();
        }
        manualTransactionWindow[0].style.visibility = 'hidden';
    }
    
    ok.addEventListener('click', process, {once:true});

    cancel.addEventListener('click', ()=> {
        ok.removeEventListener('click', process);
        manualTransactionWindow[0].style.visibility = 'hidden';
    });
}

function updateManualTransaction(newTransaction){
    retrieveTransaction.push(newTransaction);
    localStorage.setItem('transactionData', JSON.stringify(retrieveTransaction));
    displayTransaction(newTransaction);
}

function processTransaction(id){
    for(let i = 0; i < retrieveTransaction.length; i++){
        if(retrieveTransaction[i].id === id){
            switch (retrieveTransaction[i].requestType){
                case 'Deposit':
                    deposit(retrieveTransaction[i].accountName, retrieveTransaction[i].amount);
                    break;
                case 'Withdrawal':
                    withdraw(retrieveTransaction[i].accountName, retrieveTransaction[i].amount);
                    break;
                case 'Transfer':
                    transfer(retrieveTransaction[i].accountName, retrieveTransaction[i].destAccount, retrieveTransaction[i].amount);
                    break;
            }
            retrieveTransaction[i].status = 'Approved';
            localStorage.setItem('transactionData', JSON.stringify(retrieveTransaction));
        }
    }
}

function deposit(accountName, amount){
    let newBalance = 0;

    for(let i = 0; i < retrieveUserData.length; i++){
        if(retrieveUserData[i].name === accountName){
            if(parseInt(amount) >= 0){
                newBalance = parseInt(retrieveUserData[i].balance) + parseInt(amount);
                retrieveUserData[i].balance = newBalance.toString();
                localStorage.setItem('userData', JSON.stringify(retrieveUserData));
                alert('Success! \r\n' + retrieveUserData[i].name + ' balance: ₱ ' + retrieveUserData[i].balance);
            }else{
                alert('Deposit amount cannot be negative.');
            }
        }
    }
}

function withdraw(accountName, amount){
    let newBalance = 0;

    for(let i = 0; i < retrieveUserData.length; i++){
        if(retrieveUserData[i].name === accountName){
            if(parseInt(amount) >= 0){
                if(parseInt(retrieveUserData[i].balance) > parseInt(amount)){
                    newBalance = parseInt(retrieveUserData[i].balance) - parseInt(amount);
                    retrieveUserData[i].balance = newBalance.toString();
                    localStorage.setItem('userData', JSON.stringify(retrieveUserData));
                    alert(retrieveUserData[i].name + ' balance: ₱ ' + retrieveUserData[i].balance);
                }
                else{
                    alert('Balance is insufficient for withdrawal.');
                }
            }else{
                alert('Withdrawal amount cannot be negative.');
            }
        }
    }
}

function transfer(origAccount, destAccount, amount){
    let newOrigBalance = 0, newDestBalance = 0;

    for(let i = 0; i < retrieveUserData.length; i++){
        if(retrieveUserData[i].name === origAccount){
            for(let j = 0; j < retrieveUserData.length; j++){
                if(retrieveUserData[j].name === destAccount){
                    if(parseInt(amount) >= 0){
                        if(parseInt(retrieveUserData[i].balance) > parseInt(amount)){
                            newOrigBalance = parseInt(retrieveUserData[i].balance) - parseInt(amount);
                            newDestBalance = parseInt(retrieveUserData[j].balance) + parseInt(amount);
                            retrieveUserData[i].balance = newOrigBalance.toString();
                            retrieveUserData[j].balance = newDestBalance.toString();
                            localStorage.setItem('userData', JSON.stringify(retrieveUserData));
                            alert(retrieveUserData[i].name + ' balance: ₱ ' + retrieveUserData[i].balance + '\r\n' + retrieveUserData[j].name + ' balance: ₱' + retrieveUserData[j].balance);
                        }
                        else{
                            alert('Balance is insufficient for transfer.');
                        }
                    }else{
                        alert('Transfer amount cannot be negative.');
                    }
                }
            }
        }
    }
}