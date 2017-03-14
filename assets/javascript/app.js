// Question constructor
function Test (question, choices, answer, correctLink, wrongLink){
	this.question = question;
	this.choices = choices;
	this.answer = answer;
	this.correctLink = correctLink;
	this.wrongLink = wrongLink;
}

var test1 = new Test('Which one of the four is least like the other tree?',['Elephant','Snake','Lion','Mouse'], 1, 'https://media.giphy.com/media/3o7TKy1qgGdbbMalcQ/giphy.gif', 'https://media.giphy.com/media/3o72FkpOJBMVHXmfEQ/giphy.gif' );
var test2 = new Test("Finish the sentence, Book is to Reading as Fork is to:", ["drawing",'stirring','writing', 'eating'], 3,'https://media.giphy.com/media/l41Ywr3dQBOujzU7m/giphy.gif', 'https://media.giphy.com/media/l0MYBH5ubT7grWRt6/giphy.gif');
var test3 = new Test("Finish the sentence, Gym is to Healthy as Book is to ?", ['Intelligent','Knowledgeable', 'Smart','Good'], 2, 'https://media.giphy.com/media/l41YwLuanve0L4XOE/giphy.gif', 'https://media.giphy.com/media/l0HlIjjcU0l2fOFVK/giphy.gif');
var test4 = new Test("Who is the president of USA", ["Bush", 'Klinton', 'Trump','Obama'], 2, 'https://media.giphy.com/media/3o6Zt8qDiPE2d3kayI/giphy.gif', 'https://media.giphy.com/media/l0MYDPoYmha3jOGxq/giphy.gif');

var questionNum = 0;
var testQustions =[test1,test2,test3,test4];

// question timer
var timer;

// correct/wrong window timer
var timeout;
var time= 30;

var correctAns = 0;
var wrongAns = 0;
var unanswered = 0;


//checking user input and comparing it to correct answer
function checkInput(input, question){
	$('#game').hide();
	if (input == question.answer) {
		console.log('Correct');
		printFeedback(true, question);
		correctAns++;
	}else{
		console.log("Wrong");
		printFeedback(false, question);
		wrongAns++;
	}
}

//resetion timer for new question and calling function to print new question
function resetInterval(interval){
	clearTimeout(timeout);
	clearInterval(timer);
	printQuestion(testQustions[questionNum]);
	time = 30;
}

// Printing correct/wrong answer feedback
function printFeedback(feedback, question){
	$('#feedback').fadeIn();
	timeout = setTimeout(resetInterval,2000);
	clearInterval(timer);
	
	if (feedback) {
		$('#feedback').html('<h2>Correct</h2> <img src="'+question.correctLink+'">');
	}else{
		$('#feedback').html('<h2>Nope!</h2>'+
			'<h3>The Correct Answer was: '+question.choices[question.answer]+'</h3>'+ 
			'<img src="'+question.wrongLink+'">');
	}
}

// function for printing timer
function printTime(){
	if (time === 0) {
		unanswered++;
		resetInterval(timer);
	}
	$('#time').html(time);
	time--;
}

//print final score for game.
function printScore(){
	clearInterval(timer);
	clearTimeout(timeout);
	$('#game').hide();
	$('#timer').hide();
	$('#score').fadeIn('slow');
	$('#correct').text(correctAns);
	$('#unanswered').text(unanswered);
	$('#wrong').text(wrongAns)
}

//function print new question and choices and create event listener for choices.
//getting user input and sending it for check.
function printQuestion(question){
	timer = setInterval(printTime, 1000);
	clearTimeout(timeout);
	$('#feedback').hide();
	$('#game').fadeIn();
	questionNum++;
	//if current question isn't last, than print new question
	// otherwise print score
	if (questionNum <= testQustions.length) {
		$("#question").hide();
		$('#question').html(question.question);
		$("#question").fadeIn();
		$('#choices').empty();
		$('#choices').hide();
		for (var i = 0; i < question.choices.length; i++) {
			$('#choices').append('<div>'+
						'<button class = "buttChoice" data-value ='+i+'>'+ question.choices[i]+'</button>'+
					'</div>');
		}
		$('.buttChoice').click(function(){
			var input = $(this).data("value");
			checkInput(input, question);
		})
		$('#choices').fadeIn();
	}else{
		console.log('No more questions');
		printScore();
	}
}

function start(){
		$("#startPage").hide();
		$('#choices').empty();
		$('#timer').show('slow');
		printQuestion(testQustions[questionNum]);
}
 
function restart(){
	questionNum = 0;
	correctAns = 0;
	wrongAns = 0;
	unanswered = 0;
	time = 30;
	$('#score').hide();
	$('#timer').show();
	$("#game").fadeIn();
	$('#question').empty();
	$('#feedback').hide();
	start();
}

//Listener for Starting page. 
$(document).ready(function(){
	$('#yes').click("#startPage", function(){
		start();
	});

	$('#restart').click(restart);


});