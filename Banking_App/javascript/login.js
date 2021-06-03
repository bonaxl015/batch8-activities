window.onload = verifyLogin();

function verifyLogin(){
    const empNo = document.getElementById('number');
    const password = document.getElementById('password');
    const form = document.getElementById('form');
    const error = document.getElementsByClassName('error');

    form.addEventListener('submit', (e) => {
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
        if(password.value.length >= 6 && password.value.length <= 12){
            let retrieveData = [];
            let noMatch = 0;

            retrieveData = JSON.parse(localStorage.getItem('employeeData'));
            for(let employee of retrieveData){
                if(employee.empNo === empNo.value){
                    if(employee.password != password.value){
                        errorMessage.push('Incorrect password. Try again');
                    }
                }else{
                    noMatch++;
                }
            }
            if(retrieveData.length === noMatch){
                errorMessage.push('Employee does not exist');
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