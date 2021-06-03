let allTransaction = [
    {
        id: '0',
        status: 'Open',
        requestType: 'Deposit',
        accountName: 'bon',
        origAccount: '1111',
        amount: '300'
    },
    {
        id: '1',
        status: 'Open',
        requestType: 'Withdrawal',
        accountName: 'axl',
        origAccount: '2222',
        amount: '5000'
    },
    {
        id: '2',
        status: 'Open',
        requestType: 'Transfer',
        accountName: 'avion',
        origAccount: '3333',
        destAccount: 'bonbon',
        amount: '500'
    },
    {
        id: '3',
        status: 'Open',
        requestType: 'Withdrawal',
        accountName: 'martney',
        origAccount: '4444',
        amount: '900'
    },
    {
        id: '4',
        status: 'Open',
        requestType: 'Transfer',
        accountName: 'bonbon',
        origAccount: '5555',
        destAccount: 'axl',
        amount: '1000'
    },
    {
        id: '5',
        status: 'Open',
        requestType: 'Deposit',
        accountName: 'bon',
        origAccount: '1111',
        amount: '999'
    },
    {
        id: '6',
        status: 'Open',
        requestType: 'Withdrawal',
        accountName: 'axl',
        origAccount: '2222',
        amount: '999'
    },
    {
        id: '7',
        status: 'Open',
        requestType: 'Transfer',
        accountName: 'avion',
        origAccount: '3333',
        destAccount: 'martney',
        amount: '999'
    },
    {
        id: '8',
        status: 'Open',
        requestType: 'Withdrawal',
        accountName: 'martney',
        origAccount: '4444',
        amount: '999'
    },
    {
        id: '9',
        status: 'Open',
        requestType: 'Transfer',
        accountName: 'bonbon',
        origAccount: '5555',
        destAccount: 'axl',
        amount: '999'
    },
    {
        id: '10',
        status: 'Open',
        requestType: 'Deposit',
        accountName: 'bon',
        origAccount: '1111',
        amount: '777'
    },
    {
        id: '11',
        status: 'Open',
        requestType: 'Withdrawal',
        accountName: 'axl',
        origAccount: '2222',
        amount: '777'
    },
    {
        id: '12',
        status: 'Open',
        requestType: 'Transfer',
        accountName: 'avion',
        origAccount: '3333',
        destAccount: 'bon',
        amount: '777'
    },
    {
        id: '13',
        status: 'Open',
        requestType: 'Withdrawal',
        accountName: 'martney',
        origAccount: '4444',
        amount: '777'
    },
    {
        id: '14',
        status: 'Open',
        requestType: 'Transfer',
        accountName: 'bonbon',
        origAccount: '5555',
        destAccount: 'avion',
        amount: '777'
    }
];

let allUser = [
    {
        name: 'admin',
        accountNumber: '0000',
        balance: '1000',
        status: 'Active'
    },
    {
        name: 'bon',
        accountNumber: '1111',
        balance: '5000',
        status: 'Active'
    },
    {
        name: 'axl',
        accountNumber: '2222',
        balance: '7000',
        status: 'Active'
    },
    {
        name: 'avion',
        accountNumber: '3333',
        balance: '10000',
        status: 'Active'
    },
    {
        name: 'martney',
        accountNumber: '4444',
        balance: '20000',
        status: 'Active'
    },
    {
        name: 'bonbon',
        accountNumber: '5555',
        balance: '7000',
        status: 'Active'
    },
];

let emptyTransaction = [];
let emptyUser = [];

const yesButton = document.getElementsByClassName('yes');
const noButton = document.getElementsByClassName('no');

new URLSearchParams (window.location.search).forEach((item, key) => {
    if(key === 'number'){
        localStorage.setItem('loginData', item);
    }
});
yesButton[0].addEventListener('click', ()=> {
    localStorage.setItem('transactionData', JSON.stringify(allTransaction));
    localStorage.setItem('userData', JSON.stringify(allUser));
});

noButton[0].addEventListener('click', ()=> {
    localStorage.setItem('transactionData', JSON.stringify(emptyTransaction));
    localStorage.setItem('userData', JSON.stringify(emptyUser));
});