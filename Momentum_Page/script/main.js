const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');
const quote = document.getElementById('edit-quote');
const change = document.getElementById('change-quote');
const background = document.getElementById('background');

//Random quotes
var randomQuote = ['Happiness is when what you think, what you say, and what you do are in harmony.',
                    'There is only one happiness in this life, to love and be loved.',
                    'Happiness lies in the joy of achievement and the thrill of creative effort.',
                    'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
                    'Action may not always bring happiness, but there is no happiness without action.'];

//Random background images
const backgroundImage = ['url("bg/image-1.jpg")', 'url("bg/image-2.jpg")', 'url("bg/image-3.jpg")', 'url("bg/image-4.jpg")',
                        'url("bg/image-5.jpg")', 'url("bg/image-6.jpg")', 'url("bg/image-7.jpg")', 'url("bg/image-8.jpg")',
                        'url("bg/image-9.jpg")', 'url("bg/image-10.jpg")', 'url("bg/image-11.jpg")', 'url("bg/image-12.jpg")',
                        'url("bg/image-13.jpg")', 'url("bg/image-14.jpg")', 'url("bg/image-15.jpg")'];

//Display time
function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    //Set AM or PM
    const amOrPm = hour >= 12 ? 'PM' : 'AM';

    //12 hour format
    hour = hour % 12 || 12;

    //Displays less than 10
    hour = (hour < 10 ? '0' : '') + hour;
    min = (min < 10 ? '0' : '') + min;
    sec = (sec < 10 ? '0' : '') + sec;

    //Output
    time.innerHTML = hour + ':' + min + ':' + sec + ' ' + amOrPm;

    setTimeout(showTime, 1000);
}

//Set background and greeting
function setGreeting() {
    let today = new Date();
    let hour = today.getHours();

    //Set greetings
    if(hour < 12){
        greeting.textContent = 'Good morning,';
    }else if(hour < 18){
        greeting.textContent = 'Good afternoon,';
    }else{
        greeting.textContent = 'Good evening,';
    }
}

//Get name
function getName() {
    if(localStorage.getItem('name') === null){
        name.textContent = '[Your Name]';
    }else{
        name.textContent = localStorage.getItem('name');
    }
}

//Set name
function setName(event) {
    if(event.type === 'keypress'){
        if(event.which == 13 || event.keyCode == 13){
            localStorage.setItem('name', event.target.innerText);
            name.blur();
        }
    }else{
        localStorage.setItem('name', event.target.innerText);
    }
}

//Get focus
function getFocus() {
    if(localStorage.getItem('focus') === null){
        focus.textContent = '[Your Focus]';
    }else{
        focus.textContent = localStorage.getItem('focus');
    }
}

//Set focus
function setFocus(event) {
    if(event.type === 'keypress'){
        if(event.which == 13 || event.keyCode == 13){
            localStorage.setItem('focus', event.target.innerText);
            focus.blur();
        }
    }else{
        localStorage.setItem('focus', event.target.innerText);
    }
}

//Get quote
function getQuote(){
    if(localStorage.getItem('quote') === null){
        let x = Math.random()*randomQuote.length;
        quote.textContent = randomQuote[Math.floor(x)];
    }else{
        quote.textContent = localStorage.getItem('quote');
    }
}

//Set focus
function setQuote(event){
    if(event.type === 'keypress'){
        if(event.which == 13 || event.keyCode == 13){
            localStorage.setItem('quote', event.target.innerText);
            randomQuote.push(event.target.innerText);
            quote.blur();
        }
    }else{
        localStorage.setItem('quote', event.target.innerText);
    }
}

//Change quote
function changeQuote(){
    let x = Math.random()*randomQuote.length;
    quote.textContent = randomQuote[Math.floor(x)];
}

//Change background
function changeBackground(){
    let x = Math.random()*backgroundImage.length;
    document.body.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)),' + backgroundImage[Math.floor(x)];
}

//Event listeners
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
quote.addEventListener('keypress', setQuote);
quote.addEventListener('blur', setQuote);
change.addEventListener('click', changeQuote);
background.addEventListener('click', changeBackground);

//Run
showTime();
setGreeting();
getName();
getFocus();
getQuote();





