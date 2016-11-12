// gameTrivia()
// This is the constructor for the Trivia game object. The game initializes itself
// for play automatically when an instance is created. The game is structured as a list
// of gameQuestion objects which contain all the information needed to display a question,
// appropriately  transition to an answer state and display the related information for the
// answer to the question. While the initial implementation of the game only has one type of
// question (i.e. text-based multiple choice), the gameQuestion objects are designed to be
// easily extended to support different kind of questions (e.g. provide a name, match images to
// identifiers, etc.). Game play begins when the user clicks the start button beginning with the
// first gameQuestion object in the list and transitions to answer displays and succeeding questions
// in the list per the specs from the homework description.
function gameTrivia() {

  // private variables used by the game object
  var gameInitialized = false; // makes sure that the game is set up before play starts

  var gameQuestionList = []; // master list of question objects for the game
  var curQuestion; // the question object which is currently providing game info
  var curMCCorrectAnswer = -1; // an index which denotes the correct answer to a question
  var numCorrectAnswer = 0; // number of user's correct answers during the quiz
  var numIncorrectAnswer = 0; // number of user's incorrect answers during the quiz

  var tmrAnswer; // interval timer for counting down time remaining for user to answer a question
  var cntTimeRemaining; // number of seconds remaining for user to answer a question
  var tmrNextQuestion; // timeout timer to control transition from answer info to next question

  // gameQuestion(typeQuestion, textQuestion, textAnswer, extras)
  // This is the constructor for a gameQuestion object. These objects represent all information
  // associated with asking and answering an individual game question. Each gameQuestion object
  // has a type which indicates how it should be processed for display, as well as how the answer
  // information should be displayed. In the initial implementation the only type supported is
  // text-oriented multiple choice. The extras is an array of special objects associated with a
  // question and answer. The array may carry different types of extras which are processed according
  // to the type of gameQuestion object they are attached to. In the initial implementation, there is
  // only one type of extra and that is the type that carries the multiple choices for a multiple choice
  // question, as well as the indicator of which is the correct choice. Different types of gameQuestions
  // could be implemented in the future with other types of extras. For example, a question type which
  // called for matching text with pictures would contain an extra with the images, the text and
  // a map of the correct matches.
  function gameQuestion(typeQuestion, textQuestion, textAnswer, extras) {
    this.typQuestion = typeQuestion; // = 0; the type of text-oriented multiple choice
    this.txtQuestion = textQuestion; // verbose question
    this.txtAnswer = textAnswer; // this is the descriptive answer, not the programmatic answer
    this.arryExtra = extras; // all associated extras for the question
  }

  // questionExtra()
  // This is the constructor for extra objects to be associated with a specific question object. The same
  // type of extra may appear in multiple types of questions but each extra will be processed according to
  // the type of the question it is associated with. The initial implementation of the game includes only
  // a text-based multiple choice type question and that type of question contains only one type of extra,
  // the multiple choice answers to select from, as well as an indicator for the correct multiple choice
  // answer. Since extra objects only exist in relation to their associated question, a future enhancement
  // to program structure would be to define this constructor in the gameQuestion class.
  function questionExtra() {
    this.typExtra = -1; // = 0; the type of text-oriented multiple choice answers
    this.txtMCAnswers = []; // array of multipe choice answers
    this.ndxMCCorrectAnswer = -1; // the index of the correct answer for the associated question
  }

  // this.gameStart()
  // This is the only publicly visible method of the gameTrivia object. Although the game can be
  // started by clicking a button included in the game object, a page containing the game could also
  // call this method to start the game programmatically.
  this.gameStart = function() {
    if (!gameInitialized) gameInit(); // ensure the game is initialized before we start
    showQuestion(); // show the first question, the questions will continue automatically from there
    showReset(); // show a reset button to start over when all questions have been shown
  }

  // gameInit()
  // this function loads the information for each of the gameQuestion objects. An obvious enhancement
  // would be to load this information from an external file but that is beyond the scope of the
  // current assignment. Since all of the questions in the initial implementation are of the same type,
  // the loading of each will be identical.
  function gameInit() {

    numCorrectAnswer = 0; // reset number of user's correct answers
    numIncorrectAnswer = 0; // reset number of user's incorrect answers


    // Question 1
    // create the extra contaning the multiple choice answers for the question
    var arryExtra = [];
    var tmpExtra = new questionExtra();
    tmpExtra.typExtra = 0;
    tmpExtra.txtMCAnswers = ["Jimi Hendrix", "Jimmy Page", "Tony Iommi", "Paul McCartney"];
    tmpExtra.ndxMCCorrectAnswer = 1; // note the correct answer
    arryExtra.push(tmpExtra); // push the extra onto the array

    // create the new question object
    var tmpQuestion = new gameQuestion(0, "Like the general population most guitarists are right-handed but there have been many famous left-handed guitarists. Which of the following guitarists is not left-handed?", "Jimmy Page, founding member of Led Zeppelin, member of several other successful bands and sought after session musician plays guitar right-handed.", arryExtra);
    // and push it onto the questions array
    gameQuestionList.push(tmpQuestion);

    // Question 2
    arryExtra = [];
    tmpExtra = new questionExtra();
    tmpExtra.typExtra = 0;
    tmpExtra.txtMCAnswers = ["The Hollies", "The Zombies", "The Small Faces", "Manfred Mann"];
    tmpExtra.ndxMCCorrectAnswer = 0;
    arryExtra.push(tmpExtra);

    var tmpQuestion = new gameQuestion(0, "Renowned vocalist Graham Nash was a founding member of what group before joining Crosby, Stills and Nash?", "Graham Nash was a member of the popular English group The Hollies before joining David Crosby and Steven Stills in forming Crosby, Stills and Nash.", arryExtra);
    gameQuestionList.push(tmpQuestion);

    // Question 3
    arryExtra = [];
    tmpExtra = new questionExtra();
    tmpExtra.typExtra = 0;
    tmpExtra.txtMCAnswers = ["22", "25", "27", "30"];
    tmpExtra.ndxMCCorrectAnswer = 2;
    arryExtra.push(tmpExtra);

    var tmpQuestion = new gameQuestion(0, "The Rock and Roll lifestyle has been a factor in many young and famous musician's deaths. Several well known musicians of the era all died at the same age. Jim Morrison, Janis Joplin, Brian Jones and Jimi Hendrix all died at what age?", "Although they all died at different times, Jim Morrison, Janis Joplin, Brian Jones and Jimi Hendrix all died at the age of 27.", arryExtra);
    gameQuestionList.push(tmpQuestion);

    // Question 4
    arryExtra = [];
    tmpExtra = new questionExtra();
    tmpExtra.typExtra = 0;
    tmpExtra.txtMCAnswers = ["Elton John", "David Bowie", "Tina Turner", "Eric Clapton"];
    tmpExtra.ndxMCCorrectAnswer = 1;
    arryExtra.push(tmpExtra);

    var tmpQuestion = new gameQuestion(0, "Many well knows musicians performed in The Who's 1975 movie of their rock opera 'Tommy'. Which of the following musicians did not perform in that movie?", "While David Bowie appeared in quite a few movies over his lifetime, he did not appear in this one.", arryExtra);
    gameQuestionList.push(tmpQuestion);

    // Question 5
    arryExtra = [];
    tmpExtra = new questionExtra();
    tmpExtra.typExtra = 0;
    tmpExtra.txtMCAnswers = ["Nashville Teens", "The Blues Magoos", "The Electric Prunes", "Gary Lewis and The Playboys"];
    tmpExtra.ndxMCCorrectAnswer = 0;
    arryExtra.push(tmpExtra);

    var tmpQuestion = new gameQuestion(0, "While the British kicked off the Classic Rock Era, due to its size, the United States ended up producing a greater number of well known bands. Which of the following bands is a British band?", "Yes, as strange as it may seem, the Nashville Teens were a British band.", arryExtra);
    gameQuestionList.push(tmpQuestion);

    // Question 6
    arryExtra = [];
    tmpExtra = new questionExtra();
    tmpExtra.typExtra = 0;
    tmpExtra.txtMCAnswers = ["Eric Clapton", "Jeff Beck", "Jimmy Page", "Keith Richard"];
    tmpExtra.ndxMCCorrectAnswer = 3;
    arryExtra.push(tmpExtra);

    var tmpQuestion = new gameQuestion(0, "The Yardbirds were a well known and influential group of the early Classic Rock Era. Many guitarist who went on to later fame started out with stints in the band. Which of the following guitarists was never a member of The Yardbirds?", "While certainly a guitarist of sustained fame, Keith Richard has spent almost his entire musical career with The Rolling Stones and was never a member of The Yardbirds", arryExtra);
    gameQuestionList.push(tmpQuestion);

    // Question 7
    arryExtra = [];
    tmpExtra = new questionExtra();
    tmpExtra.typExtra = 0;
    tmpExtra.txtMCAnswers = ["The Young Rascals", "Santana", "Sly and the Family Stone", "The Doors"];
    tmpExtra.ndxMCCorrectAnswer = 1;
    arryExtra.push(tmpExtra);

    var tmpQuestion = new gameQuestion(0, "What well known American band did keyboard player and vocalist Greg Rolie play with before becoming a founding member of Journey?", "Greg Rolie was a member of Santana when they played at the original Woodstock Festival. He was their lead vocalist for their first albums.", arryExtra);
    gameQuestionList.push(tmpQuestion);

    // Question 8
    arryExtra = [];
    tmpExtra = new questionExtra();
    tmpExtra.typExtra = 0;
    tmpExtra.txtMCAnswers = ["One", "Two", "Four", "Six"];
    tmpExtra.ndxMCCorrectAnswer = 0;
    arryExtra.push(tmpExtra);

    var tmpQuestion = new gameQuestion(0, "Although most famous rock bands of the era wrote their own songs, it was not a requirement for success. How many songs did Mick Jagger and Keith Richard compose for The Rolling Stones debut album?", "Although Mick Jagger and Keith Richard have written many successful songs over their career, there was only one of their compositions on The Rolling Stones debut album.", arryExtra);
    gameQuestionList.push(tmpQuestion);

    // Question 9
    arryExtra = [];
    tmpExtra = new questionExtra();
    tmpExtra.typExtra = 0;
    tmpExtra.txtMCAnswers = ["Free", "Foghat", "The Firm", "Bad Company"];
    tmpExtra.ndxMCCorrectAnswer = 1;
    arryExtra.push(tmpExtra);

    var tmpQuestion = new gameQuestion(0, "Vocalist Paul Rodgers has been a member of many successful bands over his career. Which of the following bands was he never a member of?", "While Foghat played a similar style of music to several of the bands which Paul Rodgers has sung with, he was never a member of that band.", arryExtra);
    gameQuestionList.push(tmpQuestion);

    // Question 10
    arryExtra = [];
    tmpExtra = new questionExtra();
    tmpExtra.typExtra = 0;
    tmpExtra.txtMCAnswers = ["Buffalo Springfield", "Procol Harum", "Steve Miller Band", "Big Brother and the Holding Company"];
    tmpExtra.ndxMCCorrectAnswer = 1;
    arryExtra.push(tmpExtra);

    var tmpQuestion = new gameQuestion(0, "The 1967 Monterey Pop Festival was a seminal event of the early Classic Rock Era, with many bands who played there later entering the top echelon of rock acts. Which of the following well known bands did not play there?", "While they were successful and had several hits during their career, Procol Harum did not play at the Montery Pop Festival in 1967.", arryExtra);
    gameQuestionList.push(tmpQuestion);

    // set up the button handler for starting and resetting the game
    $("#btnStartReset").on("click", self.gameStart);
    // and the handler for confirming answer selection
    $("#btnConfirmAnswer").on("click", checkAnswer);

    // display the game start button
//    $("#btnStartReset").html("Start");
    $("#btnStartReset").css("display", "block");
    // make sure the game over pane is not displayed in case this is not the first time through
    $("#paneGameOver").css("display", "none");

    gameInitialized = true; // indicate game is ready to be played

  }

  // function showQuestion()
  // This function displays the next question for the game. The game display consists of two main
  // areas, the question pane which contains the question and multiple choice answers and the answer
  // pane which contains the correct answer. Depending on the current state of the game, only one of
  // these panes is displayed at a time. This function will modify the appropriate html elements so
  // that only those elements associated with displaying the question are visible.
  function showQuestion() {

    // clear any existing timeout from the previous question's answer display
    clearTimeout(tmrNextQuestion);

    // check if we have completed all the questions and if so, end the game
    if (gameQuestionList.length == 0) {
      $("#txtQuizResults").empty();
      $("#txtQuizResults").append("<br>You got " + numCorrectAnswer + " answers correct");
      $("#txtQuizResults").append("<br><br>You got " + numIncorrectAnswer + " answers incorrect");
      $("#paneAnswer").css("display", "none");
      $("#paneGameOver").css("display", "block");
      $("#btnStartReset").html("Play Again");
      $("#btnStartReset").css("width", "10%");
      $("#btnStartReset").css("display", "block");
      gameInitialized = false; // force game to reinitialize
      console.log("Game Over");
      return;
    }

    // get the next question from the list
    curQuestion = gameQuestionList.shift();

    // clear the area for displaying the question text
    $("#txtQuestion").empty();
    // display the question and associated extras; in the initial implementation
    // this will always be the list of multiple choice answers
    switch (curQuestion.typQuestion) {
      // text-based multiple choice question
      case 0:
        $("#txtQuestion").html(curQuestion.txtQuestion);
        showExtras(curQuestion.arryExtra);
        break;
    }

    // change the html so that only question related information is displayed
    $("#paneQuestion").css("display", "block");
    $("#paneAnswer").css("display", "none");
    $("#remTime").css("display", "block");
    $("#resultAnswer").css("display", "none");
    $("#btnStartReset").css("display", "none");
    $("#btnConfirmAnswer").css("display", "block");

    // set the interval timer to count down the time remaining for the user to
    // answer the question
    cntTimeRemaining = 30;
    $("#remTime").html("Time Remaining: " + parseInt(cntTimeRemaining) + " seconds");
    tmrAnswer = setInterval(updateAnswerTimer, 1000);

  }

  // function showExtras(extras)
  // This function displays the information in the provided extra array according to
  // the type of extra it is; only multiple choice answers in the initial implementation
  function showExtras(extras) {

    var extra; // convenience variable for iterating through the array

    // iterate through the array processing each contained extra according to its type
    for (var i = 0; i < extras.length; i++) {
      extra = extras[i];
      switch (extra.typExtra) {
        // answer list for a text-based multiple choice question
        case 0:
          showTextMultiChoice(extra.txtMCAnswers);
          // make the correct answer generally available for easier access by other functions
          curMCCorrectAnswer = extra.ndxMCCorrectAnswer;
          break;
      }
    }

  }

  // showTextMultiChoice(txtMCAnswers)
  // This function loads the html with the possible answers for a text-based multiple choice
  // question.
  function showTextMultiChoice(txtMCAnswers) {
    var area = $("#mcTextAnswer");
    area.empty(); // clear the target area
    // load the selectable multiple choice answers
    for (var i = 0; i < txtMCAnswers.length; i++) {
      if (i > 0) area.append("<br>"); // each answer starts on a new line
      // radio button elements sharing the same name are used to enforce single answer selection
      area.append("<input type='radio' class='btnRadio' name='mcAnswer' value='" + parseInt(i) + "'>" + txtMCAnswers[i]);
    }

  }

  // showImgMultiChoice()
  // stub for image-based multiple choice questions
  function showImgMultiChoice() {

  }

  // showVideoMultiChoice()
  // stub for video-based multiple choice questions
  function showVideoMultiChoice() {

  }

  // showImgMultiChoice()
  // stub for audio-based multiple choice questions
  function showAudioMultiChoice() {
    
  }

  function showReset() {

  }

  // updateAnswerTimer()
  // This is the callback function for the interval timer which limits the time a user has
  // to answer a question
  function updateAnswerTimer() {
    // if the timer hasn't expired, update the seconds remaining display
    if (--cntTimeRemaining > 0) {
      $("#remTime").html("Time Remaining: " + parseInt(cntTimeRemaining) + " seconds");
      return;  
    }

    // when the timer expires the answer will be checked regardless of whether the user has
    // explicitly selected an answer or not
    checkAnswer();

  }

  // checkAnswer()
  // This function determines the correctness of the user's answer, displays the correct answer and
  // updates the appropriate statistics. It sets a timeout timer to display the information for a
  // fixed time before displaying the next question. Like the showQuestion function it modifies the
  // appropriate html elements to display on those elements associated with showing answer information.
  // This function can be called as a callback by the click handler for the button which allows the user
  // to confirm they have selected an answer or when the appropriate time has expired on the interval
  // timer used to limit the user's time to answer.
  function checkAnswer() {

    // convenience variable containing the user selected answer index, or -1 if they did not
    // select an answer
    var ndxAnswer = -1;

    // clear any existing interval timer associated with the question for this answer
    clearInterval(tmrAnswer);

    // if the user selected a multiple choice answer, assign the index for the selected answer
    btnRadio = $("input[name=mcAnswer]:checked");
    if (btnRadio.length > 0) {
      ndxAnswer = btnRadio.attr("value");
    }

    // check the answer and display the appropriate response to the user
    if (ndxAnswer == curMCCorrectAnswer) {
      $("#resultAnswer").html("Your answer is correct!");
      numCorrectAnswer++;
    } else {
      $("#resultAnswer").html("Sorry, your answer is not correct!");
      numIncorrectAnswer++;
    }

    // display the verbose answer for the user
    $("#txtAnswer").html(curQuestion.txtAnswer);

    // modify the appropriate html elements to display the answer information for the question
    $("#remTime").css("display", "none");
    $("#resultAnswer").css("display", "block");
    $("#paneQuestion").css("display", "none");
    $("#paneAnswer").css("display", "block");
    $("#btnConfirmAnswer").css("display", "none");

    // set a timeout for the display of the answer information
    tmrNextQuestion = setTimeout(showQuestion, 5000);

  }

  // convenience variable for easy access to game object properties and methods
  self = this;

  // setup the game for gameplay when it is instantiated
  gameInit();

}

// instantiate a gameTrivia object to get the game started
var game = new gameTrivia();