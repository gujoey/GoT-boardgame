//Game class
class Game{
	constructor(p1, p2, p1Pos, p2Pos, traps){
		this.playerOne = p1;
		this.playerTwo = p2;
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
		playerOneToken.alt="Token of character " + this.playerOne + " for player 1.";
		fieldOne.appendChild(playerOneToken);
		
		//create player two
		playerTwoToken = document.createElement("img");
		playerTwoToken.id="player-2";
		playerTwoToken.className="board__token board__token--two-tokens";
		playerTwoToken.src="../img/graphics/"+ this.playerTwo + ".png";
		playerTwoToken.alt="Token of character " + this.playerTwo + " for player 2.";
		fieldOne.appendChild(playerTwoToken);
		
		//get 8 random numbers between 2 and 29 and use these to populate the board with traps
		trapsNumber = this.getRandomTrapNumber();
		
		for (let i=0; i<trapsNumber.length; i++){
			let field;
			field = document.querySelector("[data-field=\'" + trapsNumber[i] + "\']");
			field.dataset.trap="true";
			field.className="board__square board__square--trap";
		}
		
		this.setOverview();
		this.save();
		
		//open info modal
		$("#gameInfoModal").modal("show");
	}
	
	getRandomTrapNumber(){
		let trapsNumber, unique, fiveNumbers;

		trapsNumber=[];
		fiveNumbers = false;
		
		while(fiveNumbers === false){
			trapsNumber = randomize(2,30,5);
			unique = trapsNumber.filter((v, i, a) => a.indexOf(v) === i);
			if (unique.length<5){
				fiveNumbers = false;
			}else{
				fiveNumbers = true;
			}
		}
		return trapsNumber;
	}
	
	newGame(){
		let traps;
		
		let p1, p2;
		p1= Cookies.getJSON('player-1');
		p2 = Cookies.getJSON('player-2');
		
		p1.currentField=1;
		p1.rolledSix=false;
		p1.turn = true;
		Cookies.set("player-1", p1);
		
		p2.currentField=1;
		p2.rolledSix=false;
		p2.turn = false;
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
			traps[i].dataset.trap="false";
		}
		
		//delet the tokens that is already on the board
		document.getElementById("player-1").remove();
		document.getElementById("player-2").remove();
		
		//call setOverview() & startGame() function to start a new game
		this.setOverview();
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
		let playerOneToken, playerTwoToken, fieldP1Token, fieldP2Token, traps, trapsNumber;
		
		fieldP1Token= document.querySelector(`[data-field="${this.p1Pos}"]`);
		fieldP2Token= document.querySelector(`[data-field="${this.p2Pos}"]`);
		
		//create player one
		playerOneToken = document.createElement("img");
		playerOneToken.id="player-1";
		playerOneToken.className="board__token";
		playerOneToken.src="../img/graphics/"+this.playerOne+".png";
		playerOneToken.alt="Token of character " + this.playerOne + " for player 1.";
		fieldP1Token.appendChild(playerOneToken);
		
		//create player two
		playerTwoToken = document.createElement("img");
		playerTwoToken.id="player-2";
		playerTwoToken.className="board__token";
		playerTwoToken.src="../img/graphics/"+ this.playerTwo + ".png";
		playerTwoToken.alt="Token of character " + this.playerTwo + " for player 2.";
		fieldP2Token.appendChild(playerTwoToken);
		
		if (this.p1Pos === this.p2Pos){
			playerOneToken.className="board__token board__token--two-tokens";
			playerTwoToken.className="board__token board__token--two-tokens";
		}
		
		//get 8 random numbers and use these to populate the board with traps
		trapsNumber=this.traps;
		
		for (let i=0; i<trapsNumber.length; i++){
			let field;
			field = document.querySelector("[data-field=\'" + trapsNumber[i] + "\']");
			field.dataset.trap="true";
			field.className="board__square board__square--trap";
		}
		
		this.setOverview();
	}
	
	setOverview(turn){
		let overviewP1, imgP1, overviewP2, imgP2;
		
		document.getElementById("turn").innerHTML="your turn";
		
		document.getElementById("p1-char").innerHTML=this.playerOne.replace("-", "<br>");
		overviewP1=document.getElementById("overviewP1");

		if(document.getElementById("p1OverviewToken")){
			document.getElementById("p1OverviewToken").remove();
		}
		imgP1 = document.createElement("img");
		imgP1.className="overview__img";
		imgP1.id="p1OverviewToken"
		imgP1.src="../img/graphics/"+ this.playerOne + ".png";
		imgP1.alt="Token of character " + this.playerOne + " for player 1.";
		overviewP1.appendChild(imgP1);
		
		document.getElementById("p2-char").innerHTML=this.playerTwo.replace("-", "<br>");
		overviewP2=document.getElementById("oveviewP2");
		
		if(document.getElementById("p2OverviewToken")){
			document.getElementById("p2OverviewToken").remove();
		}
		
		let p1, p2;
		p1 = Cookies.getJSON("player-1");
		p2 = Cookies.getJSON("player-2");
		
		if (p1.turn === true || p1.turn === "true"){
			document.getElementById("passDiceToComp").style.display="none";
			document.getElementById("rollDice").disabled=false;
			document.getElementById("p1-turn").style.display="block";
			document.getElementById("p2-turn").style.display="none";
			document.getElementById("show-dice-nr").innerHTML="";
		}else{
			document.getElementById("passDiceToComp").style.display="block";
			document.getElementById("rollDice").disabled=true;
			document.getElementById("p1-turn").style.display="none";
			document.getElementById("p2-turn").style.display="block";
			document.getElementById("show-dice-nr").innerHTML="";
		}
		
		
		imgP2 = document.createElement("img");
		imgP2.className="overview__img";
		imgP2.id="p2OverviewToken";
		imgP2.src="../img/graphics/"+ this.playerTwo + ".png";
		imgP2.alt="Token of character " + this.playerTwo + " for player 2.";
		overviewP2.appendChild(imgP2);
	}
	
	won(winner, p1Cookie, p2Cookie){
		Cookies.set("won", {won: winner, playerOne: p1Cookie, playerTwo: p2Cookie});
		game.newGame();
		window.location.replace("won.html");
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
		let num, diceNr, player,  playerObj, playerOne, playerTwo, field, fieldPosition, token, newField;
		
		document.getElementById("rollDice").disabled = true;
		
		num = randomize(1,7,1);
		
		//check if player rolled six
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
		
		this.moveToken(player, Number(playerObj.currentField), field);
		game.save();
	}
	
	moveToken(player, currentField, newField){
		let token, moves, playerOne, playerTwo, newFieldBoard;
		
		moves = newField-currentField;

		for (let i = 0; i<moves; i++){
			setTimeout(function(){
				let field;
				field=currentField+i+1;
				token = document.getElementById(player);
				document.querySelector(`[data-field=\"${field}\"]`).appendChild(token);
				
				if (player === "player-1"){
					let playerOne = Cookies.getJSON("player-1");
					let playerTwo = Cookies.getJSON("player-2");
					
					if (field === Number(playerTwo.currentField)){
						let p1, p2;
						p1 = document.getElementById("player-1");
						p1.className = "board__token board__token--two-tokens";
						
						p2 = document.getElementById("player-2");
						p2.className = "board__token board__token--two-tokens";
					}else{
						document.getElementById("player-1").className = "board__token";
						document.getElementById("player-2").className = "board__token";
					}
					
					playerOne.currentField = field;
					Cookies.set("player-1", playerOne);
					
				}else if(player === "player-2"){
					let playerOne = Cookies.getJSON("player-1");
					let playerTwo = Cookies.getJSON("player-2");
					if (field === Number(playerOne.currentField)){
						let p1, p2;
						p1 = document.getElementById("player-1");
						p1.className = "board__token board__token--two-tokens";

						p2 = document.getElementById("player-2");
						p2.className = "board__token board__token--two-tokens";
					}else{
						document.getElementById("player-1").className = "board__token";
						document.getElementById("player-2").className = "board__token";
					}
					
					playerTwo.currentField = field;
					Cookies.set("player-2", playerTwo);
				}
			}, 800 * i);
		}
		
		newFieldBoard = document.querySelector(`[data-field=\"${newField}\"]`);
		if (newFieldBoard.dataset.trap==="true" || newFieldBoard.dataset.trap===true){
			this.trap(newField, player, moves*800);
			setTimeout(this.updateTurn(moves*800),moves*800);
		}else{
			setTimeout(this.updateTurn(moves*800),moves*800);
		}
	}
	
	trap(field, player, timeOut){
		let card, playerObj, newField, token;
		let moveBack, stayCurrent, moveForward;
		
		token = document.getElementById(player);
		card = getCard();
		
		if (player === "player-1"){
			moveBack = card.textBackWard;
			stayCurrent = card.textCurrent;
			moveForward = card.textForward;
		}else{
			moveBack =  card.textBackWard.replace(/You/g, "The computer").replace(/your/g, "the computers") .replace(/you/g, "the computer");
			stayCurrent = card.textCurrent.replace(/You/g, "The computer").replace(/your/g, "the computers").replace(/you/g, "the computer");
			moveForward = card.textForward.replace(/You/g, "The computer").replace(/your/g, "the computers").replace(/you/g, "the computer");
		}

		if (card.moveToField<field){
			document.getElementById("textCardField").innerHTML=moveBack;
		}else if(card.moveToField===field){
			document.getElementById("textCardField").innerHTML=stayCurrent;
		}else if(card.moveToField>field){
			document.getElementById("textCardField").innerHTML=moveForward;
		}
		
		let opponentField;
		if (player==="player-1"){
			opponentField = Cookies.getJSON("player-2").currentField;
		}else{
			opponentField = Cookies.getJSON("player-1").currentField;
		}
		
		setTimeout(function(){
			$("#cardFieldModal").modal({ backdrop: 'static', keyboard: false },"show");
			
			playerObj = Cookies.getJSON(player);
			playerObj.currentField=card.moveToField;
			Cookies.set(player, playerObj);
			
			if (playerObj.currentField===opponentField){
				document.getElementById("player-1").className="board__token board__token--two-tokens";
				document.getElementById("player-2").className="board__token board__token--two-tokens";
			}
			
			newField = document.querySelector(`[data-field=\"${card.moveToField}\"]`);
			newField.appendChild(token);
		},timeOut);
	}
	
	updateTurn(minTimeOut){
		let player, playerObj;

		player ="player-"+this.playerNr;
		playerObj = Cookies.getJSON(player);

		if (player === "player-1"){
			if (playerObj.rolledSix==="true" || playerObj.rolledSix === true){
				playerObj.turn = true;
				playerObj.rolledSix = false;
				Cookies.set(player, playerObj);

				setTimeout(function(){
					document.getElementById("turn").innerHTML="your turn";
					document.getElementById("p1-turn").style.display="block";
					document.getElementById("p2-turn").style.display="none";
					document.getElementById("rolledSixModalHeader").innerHTML="You rolled a six";
					document.getElementById("rolledSixModalText").innerHTML="You can roll again since you threw a six.";
					
					let playerObjOne = Cookies.getJSON("player-1");
					let playerObjTwo = Cookies.getJSON("player-2");
					if(playerObjOne.currentField === 30){
						game.won("player-1", playerObjOne, playerObjTwo);
					}else{
						$("#rolledSixModal").modal("show");
					}
					
					document.getElementById("rollDice").disabled = false;
					game.save();
				}, minTimeOut+300);
			}else{
				let playerObjTwo
				document.getElementById("rollDice").disabled = true;
				
				playerObjTwo = Cookies.getJSON("player-2");
				playerObjTwo.turn = true;
				playerObj.turn = false;
				Cookies.set("player-2", playerObjTwo);
				Cookies.set(player, playerObj);
				setTimeout(function(){
					document.getElementById("turn").innerHTML="computers turn";
					document.getElementById("p1-turn").style.display="none";
					document.getElementById("p2-turn").style.display="block";
					document.getElementById("passDiceToComp").style.display="block";
					
					let playerObjOne = Cookies.getJSON("player-1");
					let playerObjTwo = Cookies.getJSON("player-2");
					if(playerObjOne.currentField === 30){
						game.won("player-1", playerObjOne, playerObjTwo);
					}
					game.save();
				}, minTimeOut+300);
			}
		}else if(player === "player-2"){
			if (playerObj.rolledSix==="true" || playerObj.rolledSix === true){
				document.getElementById("rollDice").disabled = true;
				playerObj.turn = true;
				playerObj.rolledSix = false;
				Cookies.set(player, playerObj);

				setTimeout(function(){
					document.getElementById("turn").innerHTML="computers turn";
					document.getElementById("p1-turn").style.display="none";
					document.getElementById("p2-turn").style.display="block";
					document.getElementById("passDiceToComp").style.display="block";
					document.getElementById("rolledSixModalHeader").innerHTML="The computer rolled a six";
					document.getElementById("rolledSixModalText").innerHTML="The computer can roll again since it threw a six.";
					
					let playerObjOne = Cookies.getJSON("player-1");
					let playerObjTwo = Cookies.getJSON("player-2");
					if(playerObjTwo.currentField === 30){
						game.won("player-2", playerObjOne, playerObjTwo);
					}else{
						$("#rolledSixModal").modal("show");
					}
					game.save();
				},minTimeOut+300);

			}else{
				let playerObjOne				

				playerObjOne = Cookies.getJSON("player-1");
				playerObjOne.turn=true;
				playerObj.turn = false;
				Cookies.set("player-1", playerObjOne);
				Cookies.set(player, playerObj);

				setTimeout(function(){
					document.getElementById("turn").innerHTML="Your turn";
					document.getElementById("p1-turn").style.display="block";
					document.getElementById("p2-turn").style.display="none";
					document.getElementById("rollDice").disabled = false;
					
					let playerObjOne = Cookies.getJSON("player-1");
					let playerObjTwo = Cookies.getJSON("player-2");
					if(playerObjTwo.currentField === 30){
						game.won("player-2", playerObjOne, playerObjTwo);
					}
					
					game.save();
				},minTimeOut+300);
			}
		}
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
	
	console.log(savedGame);
	p1 = new Character(savedGame.playerOne.character,1);
	p1Pos = savedGame.playerOne.currentField;
	
	p2 = new Character(savedGame.playerTwo.character, 2)
	p2Pos = savedGame.playerTwo.currentField;
	
	traps = savedGame.traps; 
	
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
	},
	{
		textForward:"You met Hodor while he was holding the door. You knew what was coming and ran forward as fast as possible, you can therefore move to field 7", 
		textCurrent: "You met Hodor while he was holding the door. You felt sorry for him and helped him hold the door. You will therefore stay in your current position", 
		textBackWard:"You met Hodor while he was holding the door. You choose not to take any action at all, resulting in the white walkers getting out chaising you back to field 7", 
		moveToField: 7
	}
];

//get cards
function getCard(){
	let number = randomize(0,traps.length,1);
	return traps[number[0]];
}

//roll dice click eventlistener
document.getElementById("rollDice").addEventListener("click", function(e){
	e.preventDefault();
	p1.rollDice();
});


document.getElementById("rollDiceComputer").addEventListener("click", function(){
	setTimeout(function(){
		document.getElementById("passDiceToComp").style.display="none";
		p2.rollDice();
	},350);
});

//info modal
document.getElementById("gameInfo").addEventListener("click", function(e){
	e.preventDefault();
	$('#gameInfoModal').modal('show');
});

document.getElementById("gameInfoCollapsed").addEventListener("click", function(e){
	e.preventDefault();
	$('#gameInfoModal').modal('show');
});



//quit game modal
document.getElementById("quitGame").addEventListener("click", function(e){
	e.preventDefault();
	$('#quitGameModal').modal('show');
});

document.getElementById("quitGameCollapsed").addEventListener("click", function(e){
	e.preventDefault();
	$('#quitGameModal').modal('show');
});



//modal restart game
document.getElementById("restartGame").addEventListener("click", function(e){
	e.preventDefault();
	$('#newGameModal').modal('show');
});

document.getElementById("restartGameCollapsed").addEventListener("click", function(e){
	e.preventDefault();
	$('#newGameModal').modal('show');
});

//save game
document.getElementById("saveGame").addEventListener("click", function(e){
	e.preventDefault();
	game.save();
  	$("#saveGameModal").modal("show");
});

document.getElementById("saveGameCollapsed").addEventListener("click", function(e){
	e.preventDefault();
	game.save();
  	$("#saveGameModal").modal("show");
});

document.getElementById("gobLogo").addEventListener("click", function(e){
	e.preventDefault();
  	$("#quitGameModal").modal("show");
});

document.getElementById("gobLogoCollapsed").addEventListener("click", function(e){
	e.preventDefault();
  	$("#quitGameModal").modal("show");
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