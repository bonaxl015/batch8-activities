const expenseList = document.querySelector('.expense-list');

class ExpenseItems{
    constructor(expense, cost, owner){
        this.expense = expense;
        this.cost = cost;
        this.owner = owner;
    }

    update(previousExpense, previousCost){
        let retrieveEmployeeData = JSON.parse(localStorage.getItem('employeeData'));
        let retrieveUserData = JSON.parse(localStorage.getItem('userData'));
        let newBalance = 0, difference = 0;

        for(let i = 0; i < retrieveEmployeeData.length; i++){
            if(retrieveEmployeeData[i].name === this.owner){
                for(let j = 0; j < retrieveEmployeeData[i].expenseItems.length; j++){
                    if(retrieveEmployeeData[i].expenseItems[j].expense === previousExpense && retrieveEmployeeData[i].expenseItems[j].cost === previousCost){
                        retrieveEmployeeData[i].expenseItems[j].expense = this.expense;
                        retrieveEmployeeData[i].expenseItems[j].cost = this.cost;
                        difference = parseInt(this.cost) - parseInt(previousCost);
                        newBalance = parseInt(retrieveEmployeeData[i].balance) - difference;
                        retrieveEmployeeData[i].balance = newBalance.toString();
                        localStorage.setItem('employeeData', JSON.stringify(retrieveEmployeeData));
                        balanceTextColor(newBalance);
                    }
                }
            }
        }
        for(let i = 0; i < retrieveUserData.length; i++){
            if(retrieveUserData[i].name === this.owner){
                retrieveUserData[i].balance = newBalance.toString();
                localStorage.setItem('userData', JSON.stringify(retrieveUserData));
            }
        }
    }
}

class User{
    constructor(employeeData){
        this.employeeData = employeeData;
    }

    add(expenseItems){
        let retrieveEmployeeData = JSON.parse(localStorage.getItem('employeeData'));
        let retrieveUserData = JSON.parse(localStorage.getItem('userData'));
        let newBalance = 0;

        for(let i = 0; i < retrieveEmployeeData.length; i++){
            if(retrieveEmployeeData[i].name === this.employeeData.name){
                retrieveEmployeeData[i].expenseItems.push(expenseItems);
                this.employeeData.expenseItems.push(expenseItems);
                newBalance = parseInt(retrieveEmployeeData[i].balance) - parseInt(expenseItems.cost);
                retrieveEmployeeData[i].balance = newBalance.toString();
                localStorage.setItem('employeeData', JSON.stringify(retrieveEmployeeData));
                balanceTextColor(newBalance);
            }
        }
        for(let i = 0; i < retrieveUserData.length; i++){
            if(retrieveUserData[i].name === this.employeeData.name){
                retrieveUserData[i].balance = newBalance.toString();
                localStorage.setItem('userData', JSON.stringify(retrieveUserData));
            }
        }
    }

    delete(expenseItems){
        let retrieveEmployeeData = JSON.parse(localStorage.getItem('employeeData'));
        let retrieveUserData = JSON.parse(localStorage.getItem('userData'));
        let newBalance = 0;

        for(let i = 0; i < retrieveEmployeeData.length; i++){
            if(retrieveEmployeeData[i].name === this.employeeData.name){
                for(let j = 0; j < retrieveEmployeeData[i].expenseItems.length; j++){
                    if(retrieveEmployeeData[i].expenseItems[j].expense === expenseItems.expense){
                        retrieveEmployeeData[i].expenseItems.splice(i, 1);
                        this.employeeData.expenseItems.splice(i, 1);
                    }
                }
                newBalance = parseInt(retrieveEmployeeData[i].balance) + parseInt(expenseItems.cost);
                retrieveEmployeeData[i].balance = newBalance.toString();
                localStorage.setItem('employeeData', JSON.stringify(retrieveEmployeeData));
                balanceTextColor(newBalance);
            }
        }
        for(let i = 0; i < retrieveUserData.length; i++){
            if(retrieveUserData[i].name === this.employeeData.name){
                retrieveUserData[i].balance = newBalance.toString();
                localStorage.setItem('userData', JSON.stringify(retrieveUserData));
            }
        }
    }

    list(){
        while(expenseList.firstChild){
            expenseList.removeChild(expenseList.lastChild);
        }
        if(this.employeeData.expenseItems != ''){
            if(this.employeeData.expenseItems.length > 0){
                for(let expenses of this.employeeData.expenseItems){
                    let expenseDisplay = new ExpenseDisplay(expenses);
                    expenseDisplay.createExpense();
                }
            }else{
                let expenseDisplay = new ExpenseDisplay(this.employeeData.expenseItems);
                expenseDisplay.createExpense();
            }
        }
    }
}

class ExpenseDisplay{
    constructor(expenseItems){
        this.expenseItems = expenseItems;
    }

    createExpense(){
        const expenseContainer = document.createElement('div');
        const expenseNameContainer = document.createElement('input');
        const costContainer = document.createElement('input');
        const ownerContainer = document.createElement('div');
        const updateContainer = document.createElement('div');
        const removeContainer = document.createElement('div');
        const updateExpenseText = document.createElement('span');
        const removeExpenseText = document.createElement('span');

        expenseContainer.classList.add('data', 'flex');
        expenseNameContainer.classList.add('data-expense', 'flex');
        costContainer.classList.add('data-cost', 'flex');
        ownerContainer.classList.add('data-owner', 'flex');
        updateContainer.classList.add('update', 'flex');
        removeContainer.classList.add('remove', 'flex');
        updateExpenseText.classList.add('update-text');
        removeExpenseText.classList.add('remove-text');

        expenseNameContainer.value = this.expenseItems.expense;
        costContainer.value = this.expenseItems.cost;
        ownerContainer.innerText = this.expenseItems.owner;
        updateExpenseText.innerText = 'Edit';
        removeExpenseText.innerText = 'Remove';

        expenseNameContainer.disabled = true;
        expenseNameContainer.required = true;
        costContainer.disabled = true;
        costContainer.required = true;
        costContainer.type = 'number';

        expenseList.appendChild(expenseContainer);
        expenseContainer.appendChild(expenseNameContainer);
        expenseContainer.appendChild(costContainer);
        expenseContainer.appendChild(ownerContainer);
        expenseContainer.appendChild(updateContainer);
        expenseContainer.appendChild(removeContainer);
        updateContainer.appendChild(updateExpenseText);
        removeContainer.appendChild(removeExpenseText);

        updateExpenseText.addEventListener('click', ()=> {
            let previousExpense = expenseNameContainer.value;
            let previousCost = costContainer.value;

            editExpense(expenseNameContainer, costContainer);
            expenseNameContainer.addEventListener('keypress', updateExpenseItem);
            expenseNameContainer.addEventListener('blur', updateExpenseItem);
            costContainer.addEventListener('keypress', updateExpenseItem);
            costContainer.addEventListener('blur', updateExpenseItem);

            function updateExpenseItem(e){
                if(e.type === 'keypress'){
                    if(e.which == 13 || e.keyCode == 13){
                        let updateExpense = new ExpenseItems(expenseNameContainer.value, costContainer.value, ownerContainer.innerText);
                        updateExpense.update(previousExpense, previousCost);   
                        expenseNameContainer.blur();
                        costContainer.blur();
                        editExpense(expenseNameContainer, costContainer);
                    }
                }
            }
        });

        removeExpenseText.addEventListener('click', ()=> {
            let retrieveEmployeeData = JSON.parse(localStorage.getItem('employeeData'));
            let deleteExpense = new ExpenseItems(expenseNameContainer.value, costContainer.value, ownerContainer.innerText);

            for(let i = 0; i < retrieveEmployeeData.length; i++){
                if(retrieveEmployeeData[i].name === ownerContainer.innerText){
                    let user = new User(retrieveEmployeeData[i]);
                    user.delete(deleteExpense);
                    expenseList.removeChild(expenseContainer);
                }
            }
        });
    }
}

initializeUserBalance();
initializeExpenses();
initialize();

function initialize(){
    const usernameText = document.getElementsByClassName('user-name');
    const infoEmpNo = document.getElementsByClassName('info-emp-no');
    const infoName = document.getElementsByClassName('info-name');
    const infoEmail = document.getElementsByClassName('info-email');
    const balanceDisplay = document.getElementsByClassName('balance');
    const addExpense = document.getElementsByClassName('add-expense');
    let retrieveEmpData = JSON.parse(localStorage.getItem('employeeData'));
    let employeeLogged = localStorage.getItem('loginData');

    for(let element of retrieveEmpData){
        if(element.empNo === employeeLogged){
            usernameText[0].innerText = element.name;
            infoEmpNo[0].innerText = element.empNo;
            infoName[0].innerText = element.name;
            infoEmail[0].innerText = element.email;
            balanceDisplay[0].innerText = '₱' + element.balance;
            if(parseInt(element.balance) > 0){
                balanceDisplay[0].style.color = 'var(--green)';
            }else{
                balanceDisplay[0].style.color = 'var(--red)';
            }
            let loadData = new User(element);
            loadData.list();
        }
    }
    addExpense[0].addEventListener('click', inputExpense);
}

function initializeUserBalance(){
    let retrieveEmpData = JSON.parse(localStorage.getItem('employeeData'));
    let retrieveUserData = JSON.parse(localStorage.getItem('userData'));
    let noMatch = 0;

    for(let i = 0; i < retrieveEmpData.length; i++){
        for(let j = 0; j < retrieveUserData.length; j++){
            if(retrieveEmpData[i].name === retrieveUserData[j].name){
                retrieveEmpData[i]['balance'] = retrieveUserData[j].balance;
                localStorage.setItem('employeeData', JSON.stringify(retrieveEmpData));
            }else{
                ++noMatch;
                if(noMatch === retrieveEmpData.length * retrieveUserData.length){
                    retrieveEmpData[i]['balance'] = '0';
                    localStorage.setItem('employeeData', JSON.stringify(retrieveEmpData));
                }
            }
        }
    }
}

function initializeExpenses(){
    let retrieveEmpData = JSON.parse(localStorage.getItem('employeeData'));

    for(let i = 0; i < retrieveEmpData.length; i++){
        if(!retrieveEmpData[i].expenseItems){
            retrieveEmpData[i].expenseItems = [];
            localStorage.setItem('employeeData', JSON.stringify(retrieveEmpData));
        }
    }
}

function editExpense(expenseNameContainer, costContainer){
    expenseNameContainer.disabled = !expenseNameContainer.disabled;
    costContainer.disabled = !costContainer.disabled;
    if(expenseNameContainer.disabled){
        expenseNameContainer.style.color = 'var(--black)';
        costContainer.style.color = 'var(--black)';
    }else{
        expenseNameContainer.style.color = 'var(--red)';
        costContainer.style.color = 'var(--red)';
    }
}

function inputExpense(){
    const inputExpenseForm = document.getElementsByClassName('add-expense-container');
    const addExpense = document.getElementsByClassName('add-expense');
    const usernameText = document.getElementsByClassName('user-name');
    const add = document.getElementsByClassName('add');
    const cancel = document.getElementsByClassName('cancel');
    
    inputExpenseForm[0].style.visibility = 'visible';
    function processExpense(){
        const expense = document.getElementById('expense');
        const cost = document.getElementById('cost');
        let retrieveEmpData = JSON.parse(localStorage.getItem('employeeData'));
        let employeeLogged = localStorage.getItem('loginData');
        let user = [];
    
        let expenseItems = new ExpenseItems(expense.value, cost.value, usernameText[0].innerText);    
        for(let i = 0; i < retrieveEmpData.length; i++){
            if(retrieveEmpData[i].empNo === employeeLogged){
                user = new User(retrieveEmpData[i]);
                user.add(expenseItems);
                user.list();
            }
        }
        inputExpenseForm[0].style.visibility = 'hidden';
        expense.value = '';
        cost.value = '';
    }
    add[0].addEventListener('click', processExpense, {once: true});
    cancel[0].addEventListener('click', ()=> {
        addExpense[0].removeEventListener('click', inputExpense);
        inputExpenseForm[0].style.visibility = 'hidden';
    });
}

function balanceTextColor(newBalance){
    const balanceDisplay = document.getElementsByClassName('balance');

    if(newBalance > 0){
        balanceDisplay[0].innerText = '₱' + newBalance.toString();
        balanceDisplay[0].style.color = 'var(--green)';
    }else{
        balanceDisplay[0].innerText = '-₱' + Math.abs(newBalance).toString();
        balanceDisplay[0].style.color = 'var(--red)';
    }
}

function checkExpenseName(expenseName, employee){
    let retrieveEmpData = JSON.parse(localStorage.getItem('employeeData'));
    let noMatch = 0;

    for(let i = 0; i < retrieveEmpData.length; i++){
        if(retrieveEmpData[i].name === employee){
            for(let j = 0; j < retrieveEmpData[i].expenseItems.length; j++){
                if(retrieveEmpData[i].expenseItems[j].expense === expenseName){
                    alert('Expense item already exists. Please try another one.');
                    return false;
                }else{
                    ++noMatch;
                }
                if(noMatch === retrieveEmpData.length * retrieveEmpData[i].expenseItems.length){
                    return true;
                }
            }
        }
    }
}