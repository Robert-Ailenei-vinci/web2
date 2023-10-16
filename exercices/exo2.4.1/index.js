var counter = 0;
var msec = 0;
var t;

function tick(){
    if(msec < 6000){
        msec += 100;
        document.getElementById('timer').innerHTML = msec; // Update timer in HTML
        checkGame(); // Check the game status every 100 milliseconds
    }
}

function add(){
    tick();
    timer(); // Call timer again to keep it going
}

function timer(){
    t=setTimeout(add, 100);
}

document.querySelector("#mhe").addEventListener('mouseover', function() {
    // Only reset the counter when mouse hovers over the button
    counter = 0;
    document.getElementById('counter').innerHTML = counter;
    // Start the timer if it's not already running
    if (!t) {
        timer();
    }
});

function incrementCounter() {
    counter++;
    document.getElementById('counter').innerHTML = counter;
    checkGame(); // Check the game status every time the button is clicked
}

function checkGame(){
    var msgElement = document.getElementById('msg');
    if(msec < 6000 && counter >= 10){
        msgElement.innerHTML = "You win! You clicked 10 times within " + msec + " milliseconds.";
        clearTimeout(t); // Stop the timer
    } else if (msec >= 5000 && counter < 10) {
        msgElement.innerHTML = "Game over, you did not click 10 times within 5000 milliseconds!";
        clearTimeout(t); // Stop the timer
    }
}
