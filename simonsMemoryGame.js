//Assign timers. These need to be set globally to be accessed by all functions.

let timer; let flashTimer; let gameOverTimer; let playbackTimer; let flashFiveTimesTimer;

// actualFlash contain the id's of every button which is flashed. User Results contains the id's of every button the user presses.

let actualFlash = [];
let userResults = [];

// keep track of the score.

let highestScore = 0;
let lastScore = 0;

// keep track of whether the game is running or not.

let startGame = false;

// set the intial interval

let interval = 1800;
let color = "red";

// This function is called when the user presses the start/stop button. It calls the start() stop() function and sets the startGame variable to true.

const start_stop = () => {
	if(color === "red"){
		startGame = true;
		clearInterval(timer);
		clearInterval(flashTimer);
		clearInterval(gameOverTimer);
		clearInterval(playbackTimer);
		clearInterval(flashFiveTimesTimer);
		start();
	} else {
		stop();
	}
	color = document.getElementById("startStop").style.backgroundColor;
};

// This is called when the game is started. It sets the colour of the start button to green, changes the text to STOP and starts a 3 second timer which calls the randomFlash function.

const start = () => {
	document.getElementById("startStop").style.backgroundColor = "green";
	document.getElementById("startButton").innerHTML = "STOP";
	timer = setInterval(randomFlash, interval);
};

// This is called when the game is stopped. It sets the colour of the start button to red, changes the text to START, stops all timers and resets all variables to default.

const stop = () => {
	document.getElementById("startStop").style.backgroundColor = "red";
	document.getElementById("startButton").innerHTML = "START";
	clearInterval(timer);
	clearInterval(flashTimer);
	clearInterval(gameOverTimer);
	clearInterval(playbackTimer);
	clearInterval(flashFiveTimesTimer);
	if(lastScore < 0) lastScore = 0;
	highestScore = Math.max(lastScore, highestScore);
	lastScore = 0;
	highestScore < 10 ? document.getElementById("highestScore").innerHTML = "0"+highestScore : document.getElementById("highestScore").innerHTML = highestScore;
	lastScore < 10    ? document.getElementById("lastScore").innerHTML = "0"+lastScore       : document.getElementById("lastScore").innerHTML = lastScore;
	actualFlash = [];
	userResults = [];
	interval = 1800;
	startGame = false;
};

// This function randomly flashes a button. It changes the background colour to white, calls a the resetColour function which turns the colour of the button back to default.
// The function then calls the user Guess function.

const randomFlash = () => {
	
	clearInterval(timer);
	
	let randomNumber = Math.random();
	
	if(randomNumber<0.25){
		document.getElementById("topLeftCircle").style.backgroundColor = "white";
		actualFlash.push("topLeftCircle");
	} else if(randomNumber<0.5){
		document.getElementById("topRightCircle").style.backgroundColor = "white";
		actualFlash.push("topRightCircle");
	} else if(randomNumber<0.75){
		document.getElementById("bottomLeftCircle").style.backgroundColor = "white";
		actualFlash.push("bottomLeftCircle");
	} else {
		document.getElementById("bottomRightCircle").style.backgroundColor = "white";
		actualFlash.push("bottomRightCircle");
	}
	
	flashTimer = setInterval(resetColours, 150);

	userGuess();

};

// This function resets the colours of the buttons to default.

const resetColours = () => {
	
	clearInterval(flashTimer);
	
	document.getElementById("topLeftCircle").style.backgroundColor = "green";
	document.getElementById("topRightCircle").style.backgroundColor = "red";
	document.getElementById("bottomLeftCircle").style.backgroundColor = "yellow";
	document.getElementById("bottomRightCircle").style.backgroundColor = "blue";
	
};

// Called after the button is randomly flashed to indicate the game waits (for 5 seconds for the user to guess).

const userGuess = () => {
	
	gameOverTimer = setInterval(gameOver, 5000);
	
};

// If the user loses the game (either by guessing incorrectly or being timer out) this function is called. It resets all timers,
// calls flashFiveTimes which flashes the buttons five times and then calls the stop function to reset the game.

const gameOver = () => {
	
	clearInterval(timer);
	clearInterval(flashTimer);
	clearInterval(gameOverTimer);
	clearInterval(playbackTimer);
	clearInterval(flashFiveTimesTimer);
	flashFiveTimes(0);
	gameOverTimer = setInterval(stop, 3000);
	
};

// recursive function to flash the buttons five times.

const flashFiveTimes = count => {
	
	clearInterval(flashFiveTimesTimer);
	
	if(count<5){
		count = count + 1;
				
		document.getElementById("topLeftCircle").style.backgroundColor = "white";
		document.getElementById("topRightCircle").style.backgroundColor = "white";
		document.getElementById("bottomLeftCircle").style.backgroundColor = "white";
		document.getElementById("bottomRightCircle").style.backgroundColor = "white";
		flashTimer = setInterval(resetColours, 150);
		flashFiveTimesTimer = setInterval(() => flashFiveTimes(count), 300);
		
	}
}

// gets the user input from the button click (if the game is started) and pushes the id to the userResults array, it then calles the checkCorrect function
// which checks whether the user choose the correct button.

const handleButtonPress = id => {
	if(startGame){
		userResults.push(id);
		checkCorrect()
	}
};

// This function sets whether the userResults matches the actualFlash function. If not it calls the gameOver function. It increments the score, calls checkSpees
// function, which increments the speed depending on the round. If a user clicks correctly, but not the full sequence it resets the 5s timer.

const checkCorrect = () => {
	
	clearInterval(gameOverTimer);
	
	if(userResults.length === actualFlash.length){
		for(let i=0; i<userResults.length; i++){
			if(userResults[i] !== actualFlash[i]){
				gameOver();
			}
		}
		lastScore = lastScore + 1;
		lastScore < 10 ? document.getElementById("lastScore").innerHTML = "0"+lastScore : document.getElementById("lastScore").innerHTML = lastScore;
		userResults = [];
		checkSpeed();
		playbackTimer = setInterval(() => playback(0), interval);
	} else if(userResults[userResults.length-1] === actualFlash[userResults.length-1]){
		lastScore = lastScore + 1;
		lastScore < 10 ? document.getElementById("lastScore").innerHTML = "0"+lastScore : document.getElementById("lastScore").innerHTML = lastScore;
		gameOverTimer = setInterval(gameOver, 5000);
	} else {
		gameOver();
	}
	
};

// This function playsback the previous rounds flashes by calling itself after every interval. It then calls the randomFlash function to add one to the sequence.

const playback = count => {
	
	clearInterval(playbackTimer);
	
	if(count < actualFlash.length){
		checkSpeed();
		document.getElementById(actualFlash[count]).style.backgroundColor = "white";
		flashTimer = setInterval(resetColours, 150);
		playbackTimer = setInterval(() => playback(++count), interval);
		
	} else {
		randomFlash();
	}
	
};

// This function changes the interval based on the round (size of the actualFlash array).

const checkSpeed = () => {
	if(actualFlash.length>3){
		interval = 1200;
	} else if(actualFlash.length>7){
		interval = 900;
	} else if(actualFlash.length>11){
		interval = 600;
	}
};


