$(document).ready(function(){
  
  // event listeners
  $("#quizTimer").hide();
  $("#startButton").on('click', trivia.startQuiz);
  $(document).on('click' , '#choices', trivia.guessChecker);
  
})

var trivia = {
  // trivia properties
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId : '',
  // Questions, Choices, and Answers Array for the Trivia
  questions: {
    questionOne: "The use of canvas as a primary painting surface came of age in which century?",
    questionTwo: "Who painted 'The Scream'?",
    questionThree: "English artist Andy Brown created a portrait of Queen Elizabeth II using what?",
    questionFour: "How old is the earliest known human artwork?"
  },
  choices: {
    questionOne: ["14th", "16th", "18th" ],
    questionTwo: ["Vincent Van Gogh", "Otto Meuller", "Wassily Kandinsky", "Edvard Munch"],
    questionThree: ["Fish Bones", "Socks", "Tea Bags", "Bubblegum"],
    questionFour: ["100,000 years old", "6,000 years old", "27,000 years old", "1.84 millions years old"],

  },
  answers: {
    questionOne: '18th',
    questionTwo: 'Edward Munch',
    questionThree: 'Tea bags',
    questionFour: '1.84 million years old',

  },
  

  // Start Quiz
  startQuiz: function(){
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    // Display Quiz
    $('#Quiz').show();
    
    // Clear Results
    $('#triviaResults').html('');
    
    // Display Timer
    $('#timer').text(trivia.timer);
    
    //Clear Begin Trivia Button
    $('#startButton').hide();

    // Display Timer for Quiz
    $('#quizTimer').show();
    
    //Loop through questions
    trivia.nextQuestion();
    
  },
  // Function for question looping 
  nextQuestion : function(){
    
    // set timer to 10 seconds each question
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    // Timer speed
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    // Pull in Trivia Questions Array and its choices
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#triviaQuestions').text(questionContent);
    
    var questionchoices = Object.values(trivia.choices)[trivia.currentSet];
    
    $.each(questionchoices, function(index, key){
      $('#choices').append($('<button class="choices btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },

  timerRunning : function(){
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#triviaResults').html('<h3>Times Up, the Correct Answer is '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    // Quiz Results
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      
      // adds results of Quiz (correct, incorrect, unanswered) to the page
      $('#triviaResults')
        .html('<h3>Thanks for Playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Try Again!</p>');
      
     
      $('#Quiz').hide();
      
      // Display Start button after Trivia is complete
      $('#startButton').show();
    }
    
  },
  // Verify Answer
  guessChecker : function() {
    var resultId;
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    
    if($(this).text() === currentAnswer){
      $(this).addClass('btn-success').removeClass('btn-info');
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#triviaResults').html('<h3>Correct Answer!</h3>');
    }
    else{
      $(this).addClass('btn-danger').removeClass('btn-info'); 
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#triviaResults').html('<h3>Try Again Next Time'+ currentAnswer +'</h3>');
    }
    
  },
  guessResult : function(){
    trivia.currentSet++;
    $('.choices').remove();
    $('#triviaResults h3').remove();
    trivia.nextQuestion();
     
  }

}