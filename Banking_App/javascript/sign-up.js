window.onload = signUp();

function signUp(){
    const empNo = document.getElementById('number');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const form = document.getElementById('form');
    const error = document.getElementsByClassName('error');

    form.addEventListener('submit', (e)=> {
        let errorMessage = [];

        if(password.value === '' || password.value == null){
            errorMessage.push('Password cannot be empty');
        }
        if(password.value != '' && password.value.length <= 6){
            errorMessage.push('Password must be more than 6 characters');
        }
        if(password.value.length >= 12){
            errorMessage.push('Password must be less than 12 characters');
        }
        if(errorMessage.length === 0){
            let employeeData = [], retrieve = [];
            let noMatch = 0;
            let employee = new User(empNo.value, name.value, email.value, password.value);
 
            if(localStorage.getItem('employeeData') == null){
                employeeData.push(employee);
                localStorage.setItem('employeeData', JSON.stringify(employeeData));
            }else{
                retrieve = JSON.parse(localStorage.getItem('employeeData'));
                for(let element of retrieve){
                    if(element.empNo === empNo.value || element.name === name.value){
                        errorMessage.push('Employee already exists. Please try another.')
                    }else{
                        noMatch++;
                    }
                }
                if(retrieve.length === noMatch){
                    retrieve.push(employee);
                    localStorage.setItem('employeeData', JSON.stringify(retrieve));
                }
            }
        }
        if(errorMessage.length > 0){
            e.preventDefault();
            error[0].innerText = errorMessage.join(', ');
            error[0].style.height = '40px';
            error[0].style.padding = '10px 20px';
            error[0].style.backgroundColor = 'var(--red)';
        }
    });
}

class User{
    constructor(empNo, name, email, password){
        this.empNo = empNo;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}