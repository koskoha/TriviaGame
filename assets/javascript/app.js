function Test (question, choices, answer){
	this.question = question;
	this.choices = choices;
	this.answer = answer;
}

var test1 = new Test('how is your name?',['kostya','mariya','nik','tom'], 0);
var test2 = new Test("where do you live?", ["Washington",'Arlington','Alexandria', 'Gaithersburg'], 3);
var test3 = new Test("How old are you", ['10','23', 28,'40'], 2);
var test4 = new Test("Who is the president of USA", ["Bush", 'Klinton', 'Trump','Obama'], 2);

var questionNum = 0;
var testQustions =[test1,test2,test3,test4];
var timer;
var time= 60;

var correctAns = 0;
var wrongAns = 0;



function checkInput(input, answer){
	if (input == answer) {
		console.log('Correct');
		correctAns++;
	}else{
		console.log("Wrong");
		wrongAns++;
	}
}

function resetInterval(interval){
	clearInterval(interval);
	time = 60;
	timer = setInterval(printTime, 1000);
}

function printTime(){
	if (time === 0) {
		resetInterval(timer);
		printQuestion(testQustions[questionNum]);
	}
	$('#time').html(time);
	time--;
}

function printScore(wrongAns, correctAns){
	$('#game').hide();
	$('#timer').hide();
	$('#score').fadeIn('slow');
	$('#correct').text(correctAns);
	$('#wrong').text(wrongAns)
}

function printQuestion(question){
	questionNum++;
	if (questionNum <= testQustions.length) {
		$("#question").hide();
		$('#question').html('<h3>'+ question.question+"</h3>");
		$("#question").fadeIn();
		$('#choices').empty();
		$('#choices').hide();
		for (var i = 0; i < question.choices.length; i++) {
			$('#choices').append(''+
				'<div>'+
					'<button class = "buttChoice" data-value ='+i+'>'+ question.choices[i]+'</button>'+
				'</div>');
		}
		$('.buttChoice').click(function(){
			resetInterval(timer);
			var input = $(this).data("value");
			var currAnswer = questionNum - 1;
			checkInput(input, question.answer);
			printQuestion(testQustions[questionNum]);
		})
		$('#choices').fadeIn();
	}else{
		console.log('No more questions');
		clearInterval(timer);
		printScore(wrongAns, correctAns);
	}
}


$(document).ready(function(){
	$('#yes').click(function(){
		$("#startPage").hide();
		$(".form").fadeIn();
		$('#choices').empty();
		$('#timer').show('slow');
		printQuestion(testQustions[questionNum]);
		timer = setInterval(printTime, 1000);
	});


});