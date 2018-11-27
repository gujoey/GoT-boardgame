//Game class
class Game{
	constructor(p1, p2){
		this.playerOne = p1;
		this.platerTwo = p2;
	}
	startGame(){
		let playerOneToken, playerTwoToken, fieldOne;

		fieldOne= document.getElementById("square-1");

		playerOneToken = document.createElement("img");
		playerOneToken.id="player-1";
		playerOneToken.className="board__token board__token--two-tokens";
		playerOneToken.src="../img/graphics/"+this.playerOne+".png";
		playerOneToken.alt="Token of character " + this.platerOne + " for player 1.";
		fieldOne.appendChild(playerOneToken);

		playerTwoToken = document.createElement("img");
		playerTwoToken.id="player-2";
		playerTwoToken.className="board__token board__token--two-tokens";
		playerTwoToken.src="../img/graphics/"+ this.platerTwo + ".png";
		playerTwoToken.alt="Token of character " + this.platerTwo + " for player 2.";
		fieldOne.appendChild(playerTwoToken);
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
}


let p1, p2, charOne, charTwo, game;
charOne = Cookies.getJSON('player-1').character;
charTwo = Cookies.getJSON('player-2').character;

p1 = new Character(charOne,1);
p2 = new Character(charTwo, 2);


//initialize classes and start game
game = new Game(p1.name, p2.name);
game.startGame();