$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initializeGame() {
    initialScreen = "<p class='text-center main-button-container'> <a class='btn btn-success btn-lg start-button' href='#' role='button'>Start Quiz</a></p>";
    $(".gameArea").html(initialScreen);
}
initializeGame();
console.log("itworks")
});

//Create a function that uses the click of the start button to create the HTML and the timer
    $("body").on("click", ".start-button", function(event) {
        event.preventDefault();
        generateQuestion();
        createTimer();
    });
    //Creates the onclick function for selecting the answers
    $("body").on("click", ".answer", function(event) {
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionIndex]) {
            clearInterval(theTimer);
            conditionWin();
        } else {
            clearInterval(theTimer);
            conditionLoss();
        }
    });

    $("body").on("click", ".reset-button", function(event) {
        resetGame();
    });

    function generateTimeOut() {
        unansweredCount++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Time's Up!  The correct answer was: " + correctAnswers[questionIndex] + "</p>";
        $(".gameArea").html(gameHTML);
        setTimeout(wait, 3000);
    }

    function conditionWin() {
        correctCount++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You're right! The answer is: " + correctAnswers[questionIndex] + "</p>";
        $(".gameArea").html(gameHTML);
        setTimeout(wait, 3000);
    }

    function conditionLoss() {
        incorrectCount++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionIndex] + "</p>";
        $(".gameArea").html(gameHTML);
        setTimeout(wait, 3000);
    }

    function generateQuestion() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + questionArray[questionIndex] + "</p><p class='first-answer answer'>A. " + answerArray[questionIndex][0] + "</p><p class='answer'>B. " + answerArray[questionIndex][1] + "</p><p class='answer'>C. " + answerArray[questionIndex][2] + "</p><p class='answer'>D. " + answerArray[questionIndex][3] + "</p>";
        $(".gameArea").html(gameHTML);
    }

    function wait() {
        if (questionIndex < 7) {
            questionIndex++;
            generateQuestion();
            counter = 20;
            createTimer();
        } else {
            finalScreen();
        }
    }

    function createTimer() {
        theTimer = setInterval(twentySeconds, 1000);

        function twentySeconds() {
            if (counter === 0) {
                clearInterval(theTimer);
                generateTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }

    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Let's see how well you know the show!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctCount + "</p>" + "<p>Wrong Answers: " + incorrectCount + "</p>" + "<p>Unanswered: " + unansweredCount + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-success btn-lg reset-button' href='#' role='button'>Try again!</a></p>";
        $(".gameArea").html(gameHTML);
    }

    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 20;
        generateHTML();
        timerWrapper();
    }

    var startScreen;
    var gameHTML;
    var counter = 20;
    var questionArray = ["What kind of car does Donna drive?", "What does Ron always do after having sex?", "Where was Leslie Knope born?", "What is Andy's alter-ego?", "What is Ben's favorite food?", "Who is Leslie's teenage nemesis?", "Which celebrity is Donna's cousin?", "What did Tammy 1 do to Tammy 2?"];
    var answerArray = [
        ["Jaguar", "Rolls Royce", "Mercedes-Benz", "Mustang"],
        ["Trim his mustache", "Eat at J.J.'s Diner", "Wear a red shirt", "Show up as Duke Silver"],
        ["Eagleton", "Pawnee", "Washington DC", "Indianapolis"],
        ["Burt Macklin, FBI", "Horatio Rugbutton, PETA", "Jackson Thirtle, CIA", "Norman Pillynob, DEA"],
        ["Bacon-wrapped shrimp", "Calzones", "Steak", "Stovetop popcorn"],
        ["Gary Sapperstein", "Greg Pikitus", "George Pritzker", "Gerald Passe"],
        ["Ne-Yo", "Chris Brown", "Drake", "Ginuwine"],
        ["She ate her hair", "She farted in her coffee", "She set her wigs on fire", "She poured acid on her feet"]
    ];
    var correctAnswers = ["C. Mercedes-Benz", "C. Wear a red shirt", "A. Eagleton", "A. Burt Macklin, FBI", "B. Calzones", "B. Greg Pikitus", "D. Ginuwine", "D. She poured acid on her feet"];
    var questionIndex = 0;
    var selecterAnswer;
    var theTimer;
    var correctCount = 0;
    var incorrectCount = 0;
    var unansweredCount = 0;