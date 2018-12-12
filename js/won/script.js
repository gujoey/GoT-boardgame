function createCards(playerNumber, token, gameWon){
	let div, h1, h1Text, icon, h2, span, spanText, br, h2Text;
	
	div = document.createElement("div");
	div.className="won-column";
	
	if(gameWon){
		let winner = document.getElementById("winner");
		winner.appendChild(div);
	}else{
		let looser = document.getElementById("looser");
		looser.appendChild(div);
	}
	
	h1 = document.createElement("h1");
	h1.className="won-column__h1";
	
	h2 = document.createElement("h2");
	h2.className="won-column__h2";
	
	if(gameWon){
		h1Text=document.createTextNode("Winner ");
		icon = document.createElement("i");
		icon.className="fas fa-trophy won-column__icon-winner";
		h1.appendChild(h1Text);
		h1.appendChild(icon);
		div.appendChild(h1);
		
		span = document.createElement("span");
		span.className="won-column__h2--p-font";
		
		if(playerNumber==="player-1"){
			spanText = document.createTextNode("You won as ");
		}else{
			spanText = document.createTextNode("The computer won as ");
		}
	}else{
		h1Text=document.createTextNode("Looser ");
		icon = document.createElement("i");
		icon.className="fas fa-times-circle won-column__icon-looser";
		h1.appendChild(h1Text);
		h1.appendChild(icon);
		div.appendChild(h1);
		
		span = document.createElement("span");
		span.className="won-column__h2--p-font";
		
		if(playerNumber==="player-1"){
			spanText = document.createTextNode("You lost as ");
		}else{
			spanText = document.createTextNode("The computer lost as ");
		}
	}
	
	span.appendChild(spanText);
	h2.appendChild(span);

	br = document.createElement("br");
	h2.appendChild(br);

	h2Text=document.createTextNode(token);
	h2.appendChild(h2Text);

	icon = document.createElement("img");
	icon.src = "../img/graphics/"+token+".png";
	icon.className = "won-column__token";
	icon.alt = "Token of character " + token + " for " +playerNumber;
	
	div.appendChild(h1);
	div.appendChild(h2);
	div.appendChild(icon);
}

let winner;
wonCookie = Cookies.getJSON("won")

if(wonCookie.won === "player-1"){
	createCards("player-1", wonCookie.playerOne.character, true);
	createCards("player-2", wonCookie.playerTwo.character, false);
	
	setTimeout(function(){
		$("#wonModal").modal("show");
	},500);
}else{
	createCards("player-1", wonCookie.playerOne.character, false);
	createCards("player-2", wonCookie.playerTwo.character, true);
	
	setTimeout(function(){
		$("#lostModal").modal("show");
	},500);
}

document.getElementById("gameInfo").addEventListener("click", function(e){
	e.preventDefault();
	if(wonCookie.won==="player-1"){
		$("#wonModal").modal("show");
	}else{
		$("#lostModal").modal("show");
	}
});

document.getElementById("gameInfoCollapsed").addEventListener("click", function(e){
	e.preventDefault();
	if(wonCookie.won==="player-1"){
		$("#wonModal").modal("show");
	}else{
		$("#lostModal").modal("show");
	}
});

document.getElementById("restartGame").addEventListener("click", function(e){
	e.preventDefault();
	window.location.replace("game.html");
});

document.getElementById("restartGameCollapsed").addEventListener("click", function(e){
	e.preventDefault();
	window.location.replace("game.html");
});

document.getElementById("quitGame").addEventListener("click", function(e){
	e.preventDefault();
	window.location.replace("index.html");
});

document.getElementById("quitGameCollapsed").addEventListener("click", function(e){
	e.preventDefault();
	window.location.replace("index.html");
});