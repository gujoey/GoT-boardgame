//Game class
class Game{
	constructor(p1, p2, p1Pos, p2Pos, traps){
		this.playerOne = p1;
		this.platerTwo = p2; //correct player to plater here
		this.p1Pos = p1Pos;
		this.p2Pos = p2Pos;
		this.traps = traps;
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
		
		let p1, p2;
		p1= Cookies.getJSON('player-1');
		p2 = Cookies.getJSON('player-2');
		
		//console.log(p1);
		//console.log(p2);
		
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
		
		console.log(p1);
		console.log(p2);
		
		//get all traps based on dataset name
		traps=document.querySelectorAll("[data-trap='true']");
		
		//loop throgh all traps and set them back to either black or white field
		for (let i=0; i<traps.length; i++){
			if(traps[i].dataset.field%2 === 0){
				traps[i].className="board__square";
			}else{
				traps[i].className="board__square board__square--black";
			}
			traps[i].dataset.trap="false";
		}
		
		//delet the tokens that is already on the board
		document.getElementById("player-1").remove();
		document.getElementById("player-2").remove();
		
		//call startGame() function to start a new game
		this.startGame();
	}
	
	save(){
		let p1, p2, traps, trapsData;
		p1= Cookies.getJSON('player-1');
		p2 = Cookies.getJSON('player-2');
		trapsData=document.querySelectorAll("[data-trap='true']");
		traps=[];
		
		for (let i=0; i<trapsData.length; i++){
			traps.push(trapsData[i].dataset.field);
		}
		
		Cookies.set("game", {
			playerOne: p1,
			playerTwo:p2,
			newGame: false,
			traps: traps
		});
	}
	
	restore(){
		//console.log("game is restored");
		let playerOneToken, playerTwoToken, fieldP1Token, fieldP2Token, traps, trapsNumber;

		fieldP1Token= document.querySelector(`[data-field="${this.p1Pos}"]`);
		fieldP2Token= document.querySelector(`[data-field="${this.p2Pos}"]`);
		
		//create player one
		playerOneToken = document.createElement("img");
		playerOneToken.id="player-1";
		playerOneToken.className="board__token";
		playerOneToken.src="../img/graphics/"+this.playerOne+".png";
		playerOneToken.alt="Token of character " + this.platerOne + " for player 1.";
		fieldP1Token.appendChild(playerOneToken);
		
		//create player two
		playerTwoToken = document.createElement("img");
		playerTwoToken.id="player-2";
		playerTwoToken.className="board__token";
		playerTwoToken.src="../img/graphics/"+ this.platerTwo + ".png";
		playerTwoToken.alt="Token of character " + this.platerTwo + " for player 2.";
		fieldP2Token.appendChild(playerTwoToken);
		
		//get 8 random numbers and use these to populate the board with traps
		trapsNumber=this.traps;
		
		for (let i=0; i<trapsNumber.length; i++){
			let field;
			field = document.querySelector("[data-field=\'" + trapsNumber[i] + "\']"); //change this for consitancy
			field.dataset.trap="true";
			field.className="board__square board__square--trap";
		}
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
		let num, diceNr, player,  playerObj, playerOne, playerTwo, field, fieldPosition, token, newField;
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
		if (field>=30){
			field=30;
		}
		playerObj.currentField=field;
		Cookies.set(player, playerObj);
		
		playerOne =Cookies.getJSON("player-1");
		playerTwo =Cookies.getJSON("player-2");
		
		//fieldPosition=document.querySelector(`[data-field=\"${field}\"]`);
		//console.log(fieldPosition);
		//console.log(fieldPosition.left);
		
		
		token = document.getElementById(player);
		token.className="board__token";
		newField = document.querySelector(`[data-field=\"${field}\"]`);
		
		if (playerOne.currentField === playerTwo.currentField){
				document.getElementById("player-1").className = "board__token board__token--two-tokens";
				document.getElementById("player-2").className = "board__token board__token--two-tokens";
		
		}
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
		
		//check if player landed on trap
		if (newField.dataset.trap===true || newField.dataset.trap==="true"){
			let card = getCard();
			console.log(card);
			if (card.moveToField<field){
				document.getElementById("textCardField").innerHTML=card.textBackWard;
			}else if(card.moveToField===field){
				document.getElementById("textCardField").innerHTML=card.textCurrent;
			}else if(card.moveToField>field){
				document.getElementById("textCardField").innerHTML=card.textForward;
			}
			$("#cardFieldModal").modal("show");
			playerObj = Cookies.getJSON(player);
			playerObj.currentField=card.moveToField;
			console.log(playerObj);
			Cookies.set(player, playerObj);
			
			$("#closeCardModal").click(function(){
				setTimeout(function(){
					newField = document.querySelector(`[data-field=\"${card.moveToField}\"]`);
					newField.appendChild(token);
				},500);
			});
			
		}
		
		if (num[0]===6){
			playerObj.rolledSix=true;
			Cookies.set(player, playerObj);
			setTimeout(function(){
				$("#rolledSixModal").modal("show");
			},1000);
			
		}else{
			if (player === "player-1"){
				let playerObjTwo = Cookies.getJSON("player-2")

				playerObj = Cookies.getJSON(player);
				playerObj.turn=false;
				Cookies.set(player, playerObj);

				playerObjTwo.turn= true;
				Cookies.set("player-2", playerObjTwo);
				setTimeout(function(){
					p2.rollDice();
				}, 2000);
			}else{
				let playerObjTwo = Cookies.getJSON("player-2");
				playerObjTwo.turn=false;
				Cookies.set("player-2", playerObjTwo);

				playerObj = Cookies.getJSON(player);
				playerObj.turn=true;
				Cookies.set(player, playerObj);
			}
		}
		game.save();
		//console.log(Cookies.getJSON("player-1"));
		//console.log(Cookies.getJSON("player-2"));
		//console.log(Cookies.getJSON("game"));
	}

}



//get selected characters from cookies and make new charaters
let p1, p2, charOne, charTwo, game, savedGame;
charOne = Cookies.getJSON('player-1').character;
charTwo = Cookies.getJSON('player-2').character;
savedGame = Cookies.getJSON('game');



//initialize classes and start game

p1="";
p2="";

if (savedGame.newGame===false){
	let p1Pos, p2Pos, traps;
	
	p1 = new Character(savedGame.playerOne.character,1);
	p1Pos = savedGame.playerOne.currentField;
	
	p2 = new Character(savedGame.playerTwo.character, 2)
	p2Pos = savedGame.playerTwo.currentField;
	
	traps = savedGame.traps; 
	
	console.log(p1.name);
	console.log(p2.name);
	console.log(p1Pos);
	console.log(p2Pos);
	console.log(traps);
	
	game = new Game(p1.name, p2.name, p1Pos, p2Pos, traps);
	game.restore();
}else{
	
	p1 = new Character(charOne,1);
	p2 = new Character(charTwo, 2);
	
	game = new Game(p1.name, p2.name);
	game.startGame();
}

//choose random number funtcion
function randomize(min, max, amt){
	let numbers = [];
	
	for (let i=0; i<amt; i++){
		let rnd = Math.floor(Math.random()*(max-min))+min;
		numbers.push(rnd);
	}
	return numbers;
}

//trap cards
let traps = [
	{
		textForward:"", 
		textCurrent: "", 
		textBackWard:"You forgot your sword at home, and you can not go anywhere without it. You therefore have to move back to start", 
		moveToField: 1,
	},
	{
		textForward:"You met Daenerys dragons and where able to climb it and use it to shorten your travel. You can therefore move forward to field 15!", 
		textCurrent: "You met Daenerys dragons, but didnt manage to climb it. You there have to stay at your current position.", 
		textBackWard:"You met Daenerys dragons and where able to climb it but you couldn't controll it from flying backwards. You therefore have to move back to field 15!", 
		moveToField: 15
	},
	
	{
		textForward:"You are at The Wall, and The Nights Watch decides to let you in. You Can therefore move to filed 9", 
		textCurrent: "You are at The Wall, and since you have an important meeting there, you're going to have to stay in your current position.", 
		textBackWard:"You are at The Wall, but The Nights Watch won't let you through. You have to find another way around, so you go back to field 9", 
		moveToField: 9
	},
	{
		textForward:"You met Hodor, and he was wiling to carry you while you slept. You can therefore move to field 21 ", 
		textCurrent: "You met Hodor, but he wasn't willing to carry you anywhere. You therefore have to stay in your current position", 
		textBackWard:"You met Hodor, but he was beeing chased by white walkers. You have no other choice but to run aswell. You therefore have to move back to field 21", 
		moveToField: 21
	}
];

//get cards
function getCard(){
	let number = randomize(0,traps.length,1);
	return traps[number[0]];
}

//roll dice click eventlistener
document.getElementById("rollDice").addEventListener("click", function(){
	p1.rollDice();
});

//info modal
document.getElementById("gameInfo").addEventListener("click", function(){
	$('#gameInfoModal').modal('show');
});

//quit game modal
document.getElementById("quitGame").addEventListener("click", function(){
	$('#quitGameModal').modal('show');
});

//modal restart game
document.getElementById("restartGame").addEventListener("click", function(){
	$('#newGameModal').modal('show');
});

//redirect if user clicks quit game button in quit game modal
document.getElementById("quitGameModalBtn").addEventListener("click", function(){
	let p1, p2;
			
	p1= Cookies.getJSON('player-1');
	p2 = Cookies.getJSON('player-2');
	p1.selected = false;
	p2.selected = false;

	Cookies.set("player-1", p1);
	Cookies.set("player-2", p2);
	
	Cookies.set("game", {
				playerOne: p1,
				playerTwo:p2,
				newGame: true
			});
	
	window.location.replace("index.html");
});


//restart game click event listener
document.getElementById("btnNewGame").addEventListener("click", function(){
	game.newGame();
});

//save game click eventlistener
/*document.getElementById("saveGame").addEventListener("click", function(){
	game.save();
  	$("#btnSaveGame").popover({html:true});
	
	setTimeout(function(){
		$("#btnSaveGame").popover({html:false});
	},5000);
});*/

document.getElementById("saveGame").addEventListener("click", function(){
	game.save();
  	$("#saveGameModal").modal("show");
	
});



$('#player-1').draggable({
	snap:true,
	cursor: "move"
});