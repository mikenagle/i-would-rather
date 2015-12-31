// Declare variables
var i=0;
var questionNumber = 1;
var endMessage = "Ah, shit we ran out of questions. Go do something else";
var buttonText = document.getElementById('next_question').textContent = "Another!"; //set button text
var questionsMixed = [];
var json_str;
var questionsTotal = questions.length;


//Function to shuffle array of questions
function shuffle(array)
{
  var counter = array.length, temp, index;
  while (counter > 0) 
  {
	index = Math.floor(Math.random() * counter--); //Pick a random index
    
    // And swap the last element with it
    temp = array[counter];
	array[counter] = array[index];
	array[index] = temp;
  }
  return array;
}

//Function to start a new game from scratch
function startNewGame() {
    document.getElementsByTagName('body')[0].className='loading' // remove the shuffle animation after a couple of sections
    questionsMixed = shuffle(questions); //Shuffle the questions
    json_str = JSON.stringify(questionsMixed); //Store the questions as a string for the cookie
//    console.log(questionNumber); //for debugging
//    console.log(questionsMixed); //for debugging
//    console.log(json_str); //for debugging
    i=0; //set to first question
    document.getElementById('generated_question1').textContent = questionsMixed[i].option1; //display first question pt1
    document.getElementById('generated_question2').textContent = questionsMixed[i].option2; //display first question pt2
    storeGame(); // Store the game in localStorage
    storeQnumber(); //Store the question Number
}


// Function to get the next question
function nextQuestion() {
    i += 1; //increase i by 1
    questionNumber = i+1;
    storeQnumber(); //Store the updated question Number
    if (i < questionsMixed.length) { //if there are questions left
        document.getElementById('generated_question1').textContent = questionsMixed[i].option1; // display question pt2
        document.getElementById('generated_question2').textContent = questionsMixed[i].option2; //display question pt2
        return questionsMixed[i]; //give us back the question where we are now
    } else { //if no questions left
        document.getElementById('generated_question1').textContent = ""; // display question pt2
        document.getElementById('generated_question2').textContent = ""; // display question pt2
        buttonText = "We ran out! Start again" //change button text to shuffle and start again
        document.getElementById('next_question').textContent = buttonText; //set button text
        return questionsMixed[i]; //give us back the question where we are now
    }
}


// Clear storage and start again via page reload
function startAgain() {
    clearStorage();
    window.location.reload();
}

// Clear the Storage
function clearStorage () {
    localStorage.removeItem('questions');
    localStorage.removeItem('questionNumber');
}

/* Is SessionStorage available */
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x,x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

/*Store questions, if available */
function storeGame() {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('questions', json_str); // Yippee! We can use localStorage awesomeness
    }
    else {
	// Too bad, no localStorage for us
    }
}

/*Store questions, if available */
function storeQnumber() {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('questionNumber', questionNumber); // Yippee! We can use localStorage awesomeness
    }
    else {
	// Too bad, no localStorage for us
    }
}


/* Check to see if we have an active game */
function checkGameStatus() {
    if (localStorage.length != 0) { //If there's something in storage
//        console.log("You are part way through a game"); //For debugging
        var retrievedQuestions = localStorage.getItem('questions'); //Retrieve the questions
        json_str = retrievedQuestions;
        questionsMixed = JSON.parse(json_str); //Parse the stored JSON string back into an array of questions
        questionNumber = parseInt(localStorage.getItem('questionNumber')); // Retrieve the question Number 
        i = questionNumber -1;
        document.getElementById('generated_question1').textContent = questionsMixed[i].option1; // display question pt2
        document.getElementById('generated_question2').textContent = questionsMixed[i].option2; //display question pt2
    } else {
//        console.log("You have not started a game yet"); //For debugging
        document.getElementsByTagName('body')[0].className='loading' // show the shuffle animation 
        startNewGame();  //start a new game
    }
}


//On load.... 
window.addEventListener('load', function () {
    checkGameStatus(); // Check if there is there a game under way and disaply or load new game as appropriate
// On button push, display next question  
    document.getElementById('next_question').addEventListener(
        'click', // we want to listen for a click
        function (e) { // the e here is the event itself
            if (buttonText === "Another!") {
                nextQuestion(); //get next question
            } else {
                startAgain(); //If no more questions, load a new game
            }
        }
    );
});
