//load the JS after pressing any key
window.addEventListener("keypress", showQuestion);
//initiate the timer
window.addEventListener("keypress", countDownInit);
//show the highest score
window.addEventListener("keypress", priorhighScore);
//show the current question
window.addEventListener("keypress", currentQuestion);

// //counter of array starts at zero
var counter = 0;
//# of correct answers at zero  
var correct = 0;
//initialize global object/value 
var gameQuestion = {};
//initialize question counter
var qcounter = 0;
//initialize time score
var tscore = 0;
//initialize playername
var playername = 'RT';
//game result initialization
var gameResult = {};
//high score list initialization
var highscoreList = [];
//stored score initialization
var storedHscore = [];

//Question Array database
var questionsArray = [
    [ "What is the name of the object that allows you to perfom mathematical tasks with the interpreter?", "Number", "Math", "Count", "B" ],
	[ "What is C++?", "Is used in developing browsers operating systems and applications", "Is a grade in the coding academy", "Is an advanced version of the C language", "A" ],
	[ "A variable declared in a method is called?", "local data", "global data", "formal data", "A" ],
	[ "What does HTML stand for?", "Hyper Twice Multi Lingo", "Hip Text Multi Lang", "HyperText Markup Language", "C" ],
	[ "What is Visual Studio?", "A TV Channel displaying software news", "Developer tool that allows you to complete the entire development cycle in one place", "Developer tool that will illustrate your project and automate it for you", "B" ],
	[ "What is Git Hub?", "Platform used as a web based collaboration point for software developers", "An online store for coding tools", "Hub of the Git Language", "A" ],
	[ "Who is the biggest single contributor to Git Hub?", "Sony", "Microsoft", "The United States", "B" ],
	[ "Who is the CEO of Git Hub?", "Zadar Elway", "Jared Kotoff", "Thomas Dohmke", "C" ],
	[ "Where is the headquarters for Git Hub?", "New York", "San Francisco", "Zenica", "B" ],
	[ "External stylesheets are stored in what type of files?", "XML", "PHP", "CSS", "C" ],
	[ "What are the CSS properties that are used to add space around sections of content?", "padding", "break", "Spacing", "A" ],
	[ "What is the name of the group of properties that allows you to control the height and width of elements", "Dimension", "Block", "Size", "A" ],
	[ "All HTML elements are considered what?", "tables", "code", "boxes", "C" ],
	[ "What is the CSS property that is used to specify the edges of a table?", "Fill", "Margins", "Borders", "C" ],
	[ "With CSS you can transform bland HTML menus into this  property?", "Comments", "Navigation Bars", "Menus", "B" ],
	[ "What can loops offer JavaScript code as a whole?", "cleaner syntax", "added plug-ins", "Improved performance", "C" ],
	[ "In JavaScript, what element is used to store and manipulate text usually in multiples?", "Strings", "Arrays", "Function", "A" ]
];

//get Element function to be used later
function getElement(x){
	return document.getElementById(x);
}

//timer for game
function countDownInit() {
	countDownNumber = Object.keys(questionsArray).length * 15;
    countDownTrigger();
}

//timer for game
function countDownTrigger(){
   if(countDownNumber > 0){
        countDownNumber--;
        document.getElementById('timer').textContent = countDownNumber + " seconds left";
        	setTimeout(countDownTrigger, 1000);
        //if timer runs out call noTime function
    	}else if (countDownNumber <=0){
    		noTime();
    		alert("Time has run out! Better luck next time :)");
    }
}

//random selection of question from questionsArray
var randomQuestion = function (){
	gameQuestion = Math.floor(Math.random() * questionsArray.length);
	return gameQuestion;
};

//display Question from question database
function showQuestion(){
	//call randomQuestion and set the random # to arrayIndex variable
	var arrayIndex = randomQuestion();

	//grab questionArea on DOM
	questionArea = getElement("questionArea");
	
	//checks counter to length of array to display completion
	if (counter >= questionsArray.length) {
		alert("Quiz Completed!");
		playername = prompt("Please Enter Your Initials:");

		questionArea.innerHTML = "<h2 color: #000000> Great Job " + playername + "!<BR/>You got " + correct + " of " + questionsArray.length + " questions correct with " + countDownNumber + " seconds left!</h2>";
		getElement("test_status").textContent = "Test Completed";
		tscore = countDownNumber;

		savescore();	

		//stops the function
 		return false;
 	}

	//assign array content to variables 
	var question = questionsArray[arrayIndex][0];
	var choiceA = questionsArray[arrayIndex][1];
	var choiceB = questionsArray[arrayIndex][2];
	var choiceC = questionsArray[arrayIndex][3];

	//grab DOM element and assign content to DOM
	questionArea.innerHTML = "<h2 color: #000000>"+question+"</h2>";
	questionArea.innerHTML += "<input type='radio' name='choices' value='A'> "+choiceA+"<br>";
	questionArea.innerHTML += "<input type='radio' name='choices' value='B'> "+choiceB+"<br>";
	questionArea.innerHTML += "<input type='radio' name='choices' value='C'> "+choiceC+"<br><br>";
	questionArea.innerHTML += "<button id = 'submitButton'>Submit Answer</button>";

	//count# for question appearance
	counter++;

	//flip animation
	//flip();

	//reset button
	reset();
}

//checkAnswer function
function checkAnswer(){
	//select "choices" from DOM after being set in showQuestion function
	var choices = document.getElementsByName("choices");
	for (var i = 0; i < choices.length; i++){
		if (choices[i].checked){
			selectedAnswer=choices[i].value;
		}
	}
	//compare answers and selected radio button while increasing count of correct answers
	if (selectedAnswer == questionsArray[gameQuestion][4]) {
		correct++;
		currentScore();
	}
	else {
		countDownNumber = countDownNumber - 15;
	}
	showQuestion();
	currentQuestion();
}


function currentQuestion() {
	qcounter = qcounter + 1;
	if (qcounter <= questionsArray.length) {
		getElement('question').innerHTML = "Question: " + qcounter + "/" + questionsArray.length;
	}
}

function currentScore(){
	//grab DOM element and pushing in score
	getElement('score').innerHTML = "Current Score: " + correct;
	//update localStorage score if need to
	if (correct >= localStorage.getItem('existingScore')){
		localStorage.setItem('existingScore', correct);
	 }
}

//set prior score
function priorhighScore(){
	if (localStorage.getItem('exisitingScore') === null){
		localStorage.setItem('existing', 0);
	}else
		currentScore();
		getElement('priorScores').innerHTML = "High Score: " +localStorage.getItem('existingScore');
}

//reset button function
function reset(){
	var reset = document.getElementById('StartOver');
		reset.addEventListener('click', startOver);
}
//reset function - location.reload
function startOver(){
	location.reload();
}

//jquery function for stopping eventHandler for click on submitButton
function noTime(){
	//console.log('no time');
	$('div.stage').off('click', "#submitButton");
}

//jQuery for flipping area animation
function flip(){
	$('#submitButton').on('click', function() {
		$('.flashcard').toggleClass('flipped');
	});
}

//jQuery for click submitButton calling checkAnswer function
$(document).ready(function() {
	$('div.stage').on('click', "#submitButton", function(){
		// console.log('test');
		checkAnswer();
	});
});


//Score keeping
function savescore() {
	localStorage.setItem('User', playername);
	localStorage.setItem('Score', correct);
	localStorage.setItem('Time Score', tscore);

	storedHscore = JSON.parse(localStorage.getItem('High Scores'));
	highscoreList.push(storedHscore);
	gameResult = { Player: localStorage.getItem('User'), score: localStorage.getItem('Score'), Time_Remaining: localStorage.getItem('Time Score') };
	highscoreList.push(gameResult);
	highscoreList.sort(function (a, b) { return (b.timescore - a.timescore) });

	localStorage.setItem('High Scores', JSON.stringify(highscoreList));
	storedHscore = JSON.parse(localStorage.getItem('High Scores'));
}