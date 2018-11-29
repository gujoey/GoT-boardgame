//Game class
class Game{
	constructor(p1, p2){
		this.playerOne = p1;
		this.platerTwo = p2;
	}
	startGame(){
		let playerOneToken, playerTwoToken, fieldOne, traps, trapsNumber;

		fieldOne= document.getElementById("square-1");
		
		//create player one
		playerOneToken = document.createElement("img");
		playerOneToken.id="player-1";
		playerOneToken.className="board__token board__token--two-tokens";
		playerOneToken.src="../img/graphics/"+this.playerOne+".png";
		playerOneToken.alt="Token of character " + this.platerOne + " for player 1.";
		fieldOne.appendChild(playerOneToken);
		
		//create player two
		playerTwoToken = document.createElement("img");
		playerTwoToken.id="player-2";
		playerTwoToken.className="board__token board__token--two-tokens";
		playerTwoToken.src="../img/graphics/"+ this.platerTwo + ".png";
		playerTwoToken.alt="Token of character " + this.platerTwo + " for player 2.";
		fieldOne.appendChild(playerTwoToken);
		
		//get 8 random numbers and use these to populate the board with traps
		trapsNumber=randomize(2,29,8);
		
		for (let i=0; i<trapsNumber.length; i++){
			let field;
			field = document.querySelector("[data-field=\'" + trapsNumber[i] + "\']");
			field.dataset.trap="true";
			field.className="board__square board__square--trap";
		}
	}
	
	saveGame(){}
	newGame(){
		let traps;
		
		//get all traps based on dataset name
		traps=document.querySelectorAll("[data-trap='true']");
		console.log(traps[0].dataset.field);
		
		//loop throgh all traps and set them back to either black or white field
		for (let i=0; i<traps.length; i++){
			if(traps[i].dataset.field%2 === 0){
				traps[i].className="board__square";
			}else{
				traps[i].className="board__square board__square--black";
			}
		}
		
		//delet the tokens that is already on the board
		document.getElementById("player-1").remove();
		document.getElementById("player-2").remove();
		
		//call startGame() function to start a new game
		this.startGame();
	}
}

//Character Class
class Character{
	constructor(name, playerNr){
		this.name = name;
		this.playerNr = playerNr;
	}
	
	name(){
		return this.name;
	}
	rollDice(){
		let num, diceNr;
		num = randomize(1,6,1);
		
		diceNr = document.getElementById("show-dice-nr");
		diceNr.innerHTML=num;
	}
}

//get selected characters from cookies and make new charaters
let p1, p2, charOne, charTwo, game;
charOne = Cookies.getJSON('player-1').character;
charTwo = Cookies.getJSON('player-2').character;

p1 = new Character(charOne,1);
p2 = new Character(charTwo, 2);


//initialize classes and start game
game = new Game(p1.name, p2.name);
game.startGame();

//choose random number funtcion
function randomize(startNum, endNum, amt){
	let numbers = [];
	
	for (let i=0; i<amt; i++){
		let rnd = Math.floor(Math.random()*endNum)+startNum;
		numbers.push(rnd);
	}
	return numbers;
}

//roll dice click eventlistener
document.getElementById("rollDice").addEventListener("click", function(){
	p1.rollDice();
});

//modal new game
document.getElementById("btnNewGameModal").addEventListener("click", function(){
	$('#newGameModal').modal('show');
});

//new game click event listener
document.getElementById("btnNewGame").addEventListener("click", function(){
	game.newGame();
});

$('#player-1').draggable({
	snap:true,
	cursor: "move"
});



