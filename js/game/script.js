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
		trapsNumber=randomize(2,30,8);
		
		for (let i=0; i<trapsNumber.length; i++){
			let field;
			field = document.querySelector("[data-field=\'" + trapsNumber[i] + "\']");
			field.dataset.trap="true";
			field.className="board__square board__square--trap";
		}
		
		this.save();
	}
	
	newGame(){
		let traps;
		
		//Cookies.set("player-1", {character: "", selected: false, currentField: 1, turn: false, rolledSix: false});
		//Cookies.set("player-2", {character: "", selected: false, currentField: 1, turn: false, rolledSix: false});
		//charname must be retrieved
		
		let p1, p2;
		p1= Cookies.getJSON('player-1');
		p2 = Cookies.getJSON('player-2');
		
		console.log(p1);
		console.log(p2);
		
		
		p1.currentField=1;
		p1.rolledSix=false;
		p1.turn = true;
		console.log(p1)
		Cookies.set("player-1", p1);
		
		p2.currentField=1;
		p2.rolledSix=false;
		p2.turn = false;
		console.log(p2)
		Cookies.set("player-2", p2);
		
		
		
		//get all traps based on dataset name
		traps=document.querySelectorAll("[data-trap='true']");
		
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
	
	save(){
		let p1, p2;
		p1= Cookies.getJSON('player-1');
		p2 = Cookies.getJSON('player-2');
		Cookies.set("game", {
			playerOne: p1,
			playerTwo:p2
		});
	}
	
	//won(){}
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
		let num, diceNr, player,  playerObj, field, fieldPosition, token, newField;
		num = randomize(1,7,1);
		
		player ="player-"+this.playerNr;
		playerObj = Cookies.getJSON(player);
		
		if (num[0]===6){
			playerObj.rolledSix=true;
			Cookies.set(player, playerObj);
		}
		
		diceNr = document.getElementById("show-dice-nr");
		diceNr.innerHTML=num[0];
		
		playerObj = Cookies.getJSON(player);
		field = Number(playerObj.currentField);
		field += num[0];
		playerObj.currentField=field;
		Cookies.set(player, playerObj);
		
		//fieldPosition=document.querySelector(`[data-field=\"${field}\"]`);
		//console.log(fieldPosition);
		//console.log(fieldPosition.left);
		
		
		token = document.getElementById(player);
		token.className="board__token";
		newField = document.querySelector(`[data-field=\"${field}\"]`);
/*		
		console.log(newField);
		console.log(newField.getBoundingClientRect());
		console.log(player);*/
		/*
		$("#player-1").animate({
			position: "relative",
			right: newField.getBoundingClientRect().right,//newField.getBoundingClientRect().left,
			bottom: newField.getBoundingClientRect().bottom//newField.getBoundingClientRect().top
		},5000);*/
		
		newField.appendChild(token);
		
		if (player === "player-1"){
			let playerObjTwo = Cookies.getJSON("player-2")
			
			playerObj = Cookies.getJSON(player);
			playerObj.turn=false;
			Cookies.set(player, playerObj);
			
			playerObjTwo.turn= true;
			Cookies.set("player-2", playerObjTwo);
		}else{
			let playerObjTwo = Cookies.getJSON("player-2");
			playerObjTwo.turn=false;
			cookies.set("player-2", playerObjTwo);
			
			playerObj = Cookies.getJSON(player);
			playerObj.turn=true;
			Cookies.set(player, playerObj);
		}
		
		console.log(Cookies.getJSON("player-1"));
		console.log(Cookies.getJSON("player-2"));
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
function randomize(min, max, amt){
	let numbers = [];
	
	for (let i=0; i<amt; i++){
		let rnd = Math.floor(Math.random()*(max-min))+min;
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

//save game click eventlistener
document.getElementById("btnSaveGame").addEventListener("click", function(){
	game.save();
  	$("#btnSaveGame").popover("show");
	
	setTimeout(function(){
		$("#btnSaveGame").popover("hide");
	},5000);
});

$('#player-1').draggable({
	snap:true,
	cursor: "move"
});

