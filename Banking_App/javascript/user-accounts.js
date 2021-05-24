const allUserContainer = document.querySelector('.user-list');

class UserDisplay{
    constructor(user){
        this.user = user;
    }

    createUser(user){
        const userContainer = document.createElement('div');
        const nameContainer = document.createElement('div');
        const acctNumberContainer = document.createElement('div');
        const balanceContainer = document.createElement('div');
        const statusContainer = document.createElement('div');
        const actionContainer = document.createElement('div');
        const statusText = document.createElement('span');
        const removeUserText = document.createElement('span');
        let retrieve = [];

        userContainer.classList.add('data', 'flex');
        nameContainer.classList.add('data-account-name', 'flex');
        acctNumberContainer.classList.add('data-account-number', 'flex');
        balanceContainer.classList.add('data-balance', 'flex');
        statusContainer.classList.add('data-status', 'flex');
        actionContainer.classList.add('data-action', 'flex');
        statusText.classList.add('status-text');
        removeUserText.classList.add('action-text');

        nameContainer.innerText = user.name;
        acctNumberContainer.innerText = user.accountNumber;
        balanceContainer.innerText = user.balance;
        statusText.innerText = user.status;
        removeUserText.innerText = 'Remove';

        allUserContainer.appendChild(userContainer);
        userContainer.appendChild(nameContainer);
        userContainer.appendChild(acctNumberContainer);
        userContainer.appendChild(balanceContainer);
        userContainer.appendChild(statusContainer);
        userContainer.appendChild(actionContainer);
        statusContainer.appendChild(statusText);
        actionContainer.appendChild(removeUserText);

        removeUserText.addEventListener('click', ()=> {
            retrieve = JSON.parse(localStorage.getItem('userData'));
            for(let i = 0; i < retrieve.length; i++){
                if(retrieve[i].name === nameContainer.innerText && retrieve[i].accountNumber === acctNumberContainer.innerText){
                    retrieve.splice(i, 1);
                    localStorage.setItem('userData', JSON.stringify(retrieve));
                    allUserContainer.removeChild(userContainer);
                }
            }
        });
    }
}

class User{
    constructor(name, accountNumber, balance, status){
        this.name = name;
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.status = status;
    }
}

window.onload = initialize();

function initialize(){
    const search = document.getElementById('search');
    const addUser = document.getElementsByClassName('add-user');
    const userBalance = document.getElementsByClassName('check-balance');
    let retrieve = [];

    retrieve = JSON.parse(localStorage.getItem('userData'));
    if(retrieve){
        clearUserList();
        for(let element of retrieve){
            list_user(element);
        }
    }
    search.addEventListener('keypress', ()=> {
        clearUserList();
        filterName(search.value);
    });
    addUser[0].addEventListener('click', ()=> {
        const addUserContainer = document.getElementsByClassName('add-user-container');
        const addUserButton = document.getElementsByClassName('add-account');
        const cancelButton = document.getElementsByClassName('cancel');
        const ok = document.getElementsByClassName('balance-ok');

        addUserContainer[0].style.visibility = 'visible';
        function processAddUser(){
            const newName = document.getElementById('name');
            const newAcctNumber = document.getElementById('account-number');
            const initialBalance = document.getElementById('initial-balance');

            addUserContainer[0].style.visibility = 'hidden';
            if(parseInt(initialBalance.value)){
                if(parseInt(initialBalance.value) > 0){
                    create_user(newName.value, newAcctNumber.value, initialBalance.value, 'Active');
                    initialize();
                }else{
                    alert('Initial balance cannot be negative');
                }
            }
            newName.value = '';
            newAcctNumber.value = '';
            initialBalance.value = '';
            ok[0].removeEventListener('click', processUserBalance);
        }

        //button event listeners
        addUserButton[0].addEventListener('click', processAddUser, {once: true});
        cancelButton[0].addEventListener('click', ()=> {
            addUserButton[0].removeEventListener('click', processAddUser);
            addUserContainer[0].style.visibility = 'hidden';
        });
    });
    userBalance[0].addEventListener('click', ()=> {
        const userBalanceContainer = document.getElementsByClassName('user-balance-container');
        const user = document.getElementById('name-balance');
        const ok = document.getElementsByClassName('balance-ok');
        const cancel = document.getElementsByClassName('balance-cancel');

        user.value = '';
        userBalanceContainer[0].style.visibility = 'visible';

        //button event listeners
        ok[0].addEventListener('click', processUserBalance, {once: true});
        cancel[0].addEventListener('click', ()=> {
            ok[0].removeEventListener('click', processUserBalance);
            userBalanceContainer[0].style.visibility = 'hidden';
        });
    });
}

function processUserBalance(){
    const userBalanceContainer = document.getElementsByClassName('user-balance-container');
    const user = document.getElementById('name-balance');
    
    get_balance(user.value);
    userBalanceContainer[0].style.visibility = 'hidden';
}

function list_user(userData){   
    if(userData.length > 1){
        for(let userList of userData){
            let userEntry = new UserDisplay(userList);
            userEntry.createUser(userList);
        }
    }else{
        let userEntry = new UserDisplay(userData);
        userEntry.createUser(userData);
    }
}

function get_balance(user){
    let retrieve = [];
    let noMatch = 0;

    retrieve = JSON.parse(localStorage.getItem('userData'));
    for(let element of retrieve){
        if(element.name === user  || element.name.toLowerCase() === user.toLowerCase() || element.name.toUpperCase() === user.toUpperCase()){
            alert(user + ' balance: Php ' + element.balance);
        }else{
            ++noMatch;
        }
    }
    if(retrieve.length === noMatch){
        alert('Entered name not found');
    }
}

function clearUserList(){
    while(allUserContainer.firstChild){
        allUserContainer.removeChild(allUserContainer.lastChild);
    }
}

function filterName(name){
    if(name === '' || name === null){
        list_user(allUser);
    }else{
        for(let i = 0; i < allUser.length; i++){
            if(allUser[i].name === name || allUser[i].name.toLowerCase() === name || allUser[i].name.toUpperCase() === name){
                list_user(allUser[i]);
            }
        }
    }
}

function create_user(newName, newAcctNumber, initialBalance, status){
    let userData = [], retrieve = [];
    let noMatch = 0;
    let newUser = new User(newName, newAcctNumber, initialBalance, status);

    retrieve = JSON.parse(localStorage.getItem('userData'));
    if(localStorage.getItem('userData') == null){
        userData.push(newUser);
        localStorage.setItem('userData', JSON.stringify(userData));
    }else{
        for(let element of retrieve){
            if(element.name === newName  || element.name.toLowerCase() === newName.toLowerCase() || element.name.toUpperCase() === newName.toUpperCase()){
                alert('User already exists. Please try a different one.');
            }else{
                noMatch++;
            }
        }
        if(retrieve.length === noMatch){
            retrieve.push(newUser);
            localStorage.setItem('userData', JSON.stringify(retrieve));
        }
    }
}