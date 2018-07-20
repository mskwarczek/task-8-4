'use strict'

// Global variables.
var output = document.getElementById('output');
var result = document.getElementById('result');
var roundNumber = 0;
var playerPoints = 0;
var computerPoints = 0;
var limitOfRounds = 0;
var newGameActive = false;
var playerName = 'Player';

// Write additional text at the end of div with id="output".
function writeText (text) {
	output.insertAdjacentHTML('beforeend', text);
}

// Randomly choose computer's move and return it to playerMove function.
function computerMove () {
	var compMove;
	switch (Math.floor(Math.random() * 3)) {
		case 0: compMove = 'rock'; break;
		case 1: compMove = 'paper'; break;
		case 2: compMove = 'scissors'; break;
	}
	return compMove;
}

// Determine index values for valuesMatrix inside function giveRoundResult.
function setIndex (index) {
	switch (index) {
		case 'rock': index = 0; break;
		case 'paper': index = 1; break;
		case 'scissors': index = 2; break;
	}
	return index;
}

/*
		Points for PLAYER depending on playMove and compMove values:

								playMove
						rock 0	paper 1	scissors 2
			 0	rock	 0		 1		 -1
	compMove 1	paper 	 -1		 0		 +1
			 2	scissors +1		 -1		 0
*/

// Determine round result and show short information. Return roundResult to function playerMove.
function giveRoundResult (playMove, compMove) {
	var valuesMatrix = [[0, 1, -1],
						[-1, 0, 1],
						[1, -1, 0]];
	var roundResult = valuesMatrix[setIndex(compMove)][setIndex(playMove)];
	writeText(playerName + ' played ' + playMove + ', computer played ' + compMove + '... ');
	switch (roundResult) {
		case -1: writeText('You lost!<br>'); break;
		case 0: writeText('A draw!<br>'); break;
		case 1: writeText('You won! Congratulations!<br>'); break;
	}
	return roundResult;
}

// Check for winner of the entire game.
function gameEnd () {
	if (playerPoints === limitOfRounds) {
		writeText(playerName + ' won the the entire game!<br>');
		newGameActive = false;
	}
	if (computerPoints === limitOfRounds) {
		writeText('Computer won the entire game!<br>');
		newGameActive = false;
	}
}

// Count current round number and points of each player.
function countPoints (roundResult) {
	switch (roundResult) {
		case -1: ++roundNumber; ++computerPoints; break;
		case 0: ++roundNumber; break;
		case 1: ++roundNumber; ++playerPoints; break;
	}
	result.innerHTML = '<br>Round: ' + roundNumber + ' Rounds to win: ' + limitOfRounds + '<br>' + playerName + ' ' + playerPoints + ' - ' + computerPoints + ' Computer';
}

// Begin new round of game.
function playerMove (button) {
	if (newGameActive === true) {
		var playMove = button.id;
		var compMove = computerMove();
		var roundResult = giveRoundResult(playMove, compMove);
		countPoints(roundResult);
		gameEnd();
	}
	else {
		writeText('Click New Game first<br>');
	}
}

// Clear output and result sections.
function clearText () {
	output.innerHTML = "";
	result.innerHTML = "";
}

// Start a new game.
function newGame () {
	clearText();
	roundNumber = 0;
	playerPoints = 0;
	computerPoints = 0;
	limitOfRounds = 0;
	playerName = window.prompt('Player name: ');
	limitOfRounds = window.prompt('Total number of wins needed to win the entire game: ');
	limitOfRounds = parseInt(limitOfRounds);
	newGameActive = true;
}