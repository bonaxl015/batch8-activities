const addButton = document.querySelector('.add-button');
var inputValue = document.querySelector('.input');
const container = document.querySelector('.item-container');
const todoToggle = document.querySelector('.todo-toggle');
const todoContainer = document.getElementsByClassName('todo-container');

//Create element
function createList(itemName){
    
    //Create item list
    let input = document.createElement('input');
    input.value = itemName;
    input.disabled = true;
    input.classList.add('item-input');
    input.type = 'text';

    //Create item container
    let itemBox = document.createElement('div');
    itemBox.classList.add('item');

    //Create edit button
    let editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.classList.add('edit-button');

    //Create remove button
    let removeButton = document.createElement('button');
    removeButton.innerHTML = 'Remove';
    removeButton.classList.add('remove-button');

    container.appendChild(itemBox);

    itemBox.appendChild(input);
    itemBox.appendChild(editButton);
    itemBox.appendChild(removeButton);

    //Event listeners
    editButton.addEventListener('click', function(){
        edit(input)
    });
    removeButton.addEventListener('click', function(){
        erase(itemBox)
    });
}

//Make todo editable
function edit(input){
    input.disabled = !input.disabled;
}

//Remove todo
function erase(item){
    container.removeChild(item);
}

//Add todo when add button is pressed
function inputItem(){
    if(inputValue.value != ''){
        createList(inputValue.value);
        inputValue.value = '';
    }
}

//Add todo using enter key
function enterItem(e){
    if(e.type === 'keydown'){
        if(e.which == 13 || e.keyCode == 13){
            inputItem();
        }
    }
}

//Show or hide todo list
function toggle(){
    if(todoContainer[0].style.visibility === 'hidden'){
        todoContainer[0].style.visibility = 'visible';
    }else{
        todoContainer[0].style.visibility = 'hidden';
    } 
}

//Event listeners
todoToggle.addEventListener('click', toggle);
addButton.addEventListener('click', inputItem);
window.addEventListener('keydown', enterItem);