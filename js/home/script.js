/*$( document ).ready(function() {
	
	//open tutorial modal on document ready
    $('#tutorialModal').modal('show');
	
	//set player cookies
	Cookies.set("player-1", {character: "", selected: false});
	Cookies.set("player-2", {character: "", selected: false});
	
});

//opens tutorial modal when info button is clicked
$("#info").click(function(){
	$('#tutorialModal').modal('show');
});

//tutorial

$("#runTutorial").click(function(){
	$('#btn-select-0').popover('show');
});

$("#btn-select-0").click(function(){
	$('#btn-select-0').popover('hide');
	$("#btn-select-1").popover("show");
});

$("#btn-select-0").click(function(){
	$('#btn-select-0').popover('hide');
});

//animate selected screen with jQuery
$(document).on('click','.btn', function(e){
	e.preventDefault();
	
	let name ="#" + $(this)[0].dataset.name;
	let open = $(this)[0].dataset.open;

	if (open === "true"){
		let p1, p2;
	
		p1 = Cookies.getJSON('player-1');
		p2 = Cookies.getJSON('player-2');
		
		//give error message if to characters are already selected
		if(p1.selected === true && p2.selected === true){
			setTimeout(function(){ 
				$('#twoSelected').modal('show');
			}, 200);
			return;
		}else{
			$(name).fadeIn(400);
			setCharacterCookie($(this)[0].dataset.name,true);
		}
	}else{
		$(name).fadeOut(400);
		updateCharacterCookie($(this)[0].dataset.name,false);
	}
});


//set cookie function that check wether the user selects player for user or computer
function setCharacterCookie(name, selected){
	let p1, p2;
	
	p1 = Cookies.getJSON('player-1');
	p2 = Cookies.getJSON('player-2');
	
	if (p1.selected === false){
		$('*[data-character="' + name + '"]')[0].innerHTML="YOU";
		Cookies.set("player-1", {character: name, selected: selected});
	}else{
		$('*[data-character="' + name + '"]')[0].innerHTML="COMPUTER";
		Cookies.set("player-2", {character: name, selected: selected});
	}
	
	p1 = Cookies.getJSON('player-1');
	p2 = Cookies.getJSON('player-2');
	
	//check if two characters are selected, and if true, show modal that prompts user to start game
	if(p1.selected === true && p2.selected === true){
		setTimeout(function(){ 
			$('#startGame').modal('show');
		}, 400);
	}
}

//update cookie function that checks if the user would like to change user for him self or the computer
function updateCharacterCookie(name, selected){
	let p1, p2;
	
	p1 = Cookies.getJSON('player-1');
	p2 = Cookies.getJSON('player-2');
	
	if(p1.character === name && p1.selected===true){
		Cookies.set("player-1", {character: "", selected: selected});
	}else if(p2.character === name && p2.selected===true){
		Cookies.set("player-2", {character: "", selected: selected});
	}
}*/

let cardsI;
cardsI=0;

//create all cards 
function createCard(apiRes){
	//selected character variables
	let i, row, col, colInner, colInnerSelected, colInnerSelectedCenter;
	let pSelected, pSelectedStrong, pSelectedStrongText, pSelectedText;
	let pSelectedBr, pSelectedSpan, pSelectedSpanStrong, pSelectedSpanStrongText;
	let btnSelectedChar, btnSelectedCharText;
	
	//character variables
	let h1, h1Text, img, name, imgName;
	let pTitle, pTitleStrong, pTitleStrongText, pTitleBr, pTitleText;
	let pAlias, pAliasStrong, pAliasStrongText, pAliasBr, pAliasText
	let pCulture, pCultureStrong, pCultureStrongText, pCultureBr, pCultureText;
	
	//button variables
	let btn, btnText;
	
	i = 0;
	
	//get the row element
	row = document.getElementById("row");
	
	//create col-md-3
	col = document.createElement("div");
	col.className = "col-md-3";
	row.appendChild(col);
	
	//create inner column
	colInner = document.createElement("div");
	colInner.className = "col-inner";
	col.appendChild(colInner);
	
	//create inner column when card is selected by user
	colInnerSelected = document.createElement("div");
	colInnerSelected.id= apiRes[0].name.replace(" ", "-").toLowerCase();
	colInnerSelected.className = "col-inner__selected";
	colInner.appendChild(colInnerSelected);
	
	//inner selected column that centers text vertically
	colInnerSelectedCenter  =document.createElement("div");
	colInnerSelectedCenter.className = "col-inner__selected--center";
	colInnerSelected.appendChild(colInnerSelectedCenter);
	
	//create p element and text and append to the "selected character" card inside column
	pSelected = document.createElement("p");
	pSelectedStrong = document.createElement("strong");
	pSelectedStrong.dataset.character = apiRes[0].name.replace(" ", "-").toLowerCase();
	pSelectedStrongText = document.createTextNode("YOU");
	pSelectedStrong.appendChild(pSelectedStrongText);
	pSelected.appendChild(pSelectedStrong);
	
	pSelectedText = document.createTextNode(" are playing as ");
	pSelectedBr = document.createElement("br");
	pSelected.appendChild(pSelectedText);
	pSelected.appendChild(pSelectedBr);
	
	pSelectedSpan = document.createElement("span");
	pSelectedSpan.className = "col-inner__selected--heading-font";	
	pSelectedSpanStrong = document.createElement("strong");
	pSelectedSpanStrongText = document.createTextNode(apiRes[0].name);
	pSelectedSpanStrong.appendChild(pSelectedSpanStrongText);
	pSelectedSpan.appendChild(pSelectedSpanStrong);
	pSelected.appendChild(pSelectedSpan);
	
	//create button to"selected character" card
	btnSelectedChar = document.createElement("button");
	btnSelectedChar.dataset.name = apiRes[0].name.replace(" ", "-").toLowerCase();
	btnSelectedChar.dataset.open = false;
	btnSelectedChar.type = "button";
	btnSelectedChar.className = "btn btn-lg col-inner__btn";
	btnSelectedCharText = document.createTextNode("Select someone else");
	btnSelectedChar.appendChild(btnSelectedCharText);
	
	colInnerSelectedCenter.appendChild(pSelected);
	colInnerSelectedCenter.appendChild(btnSelectedChar);
	
	//create card heading
	h1 = document.createElement("h1");
	h1Text = document.createTextNode(apiRes[0].name);
	h1.appendChild(h1Text);
	colInner.appendChild(h1);
	
	//use "replace" and "toLoweCase" to edit api name for use in getting png icon image
	name = apiRes[0].name;
	imgName = name.replace(" ", "-").toLowerCase();
	
	//create lcon of character
	img = document.createElement("img");
	img.className="col-inner__img";
	img.src="../img/graphics/"+imgName+".png";
	img.alt = "icon of " + name;
	colInner.appendChild(img);
	
	//create title paragraph
	pTitle = document.createElement("p");
	pTitleStrong = document.createElement("strong");
	pTitle.appendChild(pTitleStrong);
	
	pTitleStrongText = document.createTextNode("Title:");
	pTitleStrong.appendChild(pTitleStrongText);
	
	pTitleBr = document.createElement("br");
	pTitle.appendChild(pTitleBr);
	
	pTitleText = document.createTextNode(apiRes[0].titles[0]);
	pTitle.appendChild(pTitleText);
	colInner.appendChild(pTitle);
	
	
	//create alias paragraph
	pAlias = document.createElement("p");
	pAliasStrong = document.createElement("strong");
	pAlias.appendChild(pAliasStrong);
	
	pAliasStrongText = document.createTextNode("Alias:");
	pAliasStrong.appendChild(pAliasStrongText);
	
	pAliasBr = document.createElement("br");
	pAlias.appendChild(pAliasBr);
	
	pAliasText = document.createTextNode(apiRes[0].aliases[0]);
	pAlias.appendChild(pAliasText);
	colInner.appendChild(pAlias);
	
	
	//create culture paragraph
	pCulture = document.createElement("p");
	pCultureStrong = document.createElement("strong");
	pCulture.appendChild(pCultureStrong);
	
	pCultureStrongText = document.createTextNode("Culture:");
	pCultureStrong.appendChild(pCultureStrongText);
	
	pCultureBr = document.createElement("br");
	pCulture.appendChild(pCultureBr);
	
	if(apiRes[0].culture == "" ){
		pCultureText = document.createTextNode("None");
	}else{
		pCultureText = document.createTextNode(apiRes[0].culture);
	}
	
	pCulture.appendChild(pCultureText);
	colInner.appendChild(pCulture);
	
	//create select character button
	btn = document.createElement("button");
	btn.type = "button";
	btn.className = "btn btn-lg col-inner__btn";
	btn.id="btn-select-"+cardsI;
	btn.dataset.name = imgName;
	btn.dataset.open = true;
	btn.dataset.toggle="popover";
	btn.dataset.placement="top";
	btn.dataset.container="body";
	btn.title="Select Character";
	btn.dataset.content="Click this button to select a character for yourself. After one characater is selected then select a Character for the computer.";
	
	btnText = document.createTextNode("Select character");
	btn.appendChild(btnText);
	colInner.appendChild(btn);
	
	cardsI++
}


//fetch object from api
function getApi(param){
	fetch("https://www.anapioficeandfire.com/api/characters?name="+param)
	.then((response)=>{
		return response.json()
	})
	.then(result=>{
		createCard(result);
		//console.log(result);
	}) 
}

//characters to select from
let characters = [
	"jon+snow",
	"gregor+clegane",
	"cersei+lannister",
	"sansa+stark",
	"tyrion+lannister",
	"arya+stark",
	"joffrey+baratheon",
	"petyr+baelish",
	"ramsay+snow",
	"margaery+tyrell"
];

//loop throug array and call getApi funtion
for (let i=0; i<characters.length; i++){
	getApi(characters[i]);
}

$(document).ready(function() {
	
	//open tutorial modal on document ready
    $('#tutorialModal').modal('show');
	
	//set player cookies
	Cookies.set("player-1", {character: "", selected: false});
	Cookies.set("player-2", {character: "", selected: false});
	
	//opens tutorial modal when info button is clicked
	$("#info").click(function(){
		$('#tutorialModal').modal('show');
	});

	//tutorial
	$("#runTutorial").click(function(){
		runTutorial();
	});
	
	function runTutorial(){
		//$('[data-toggle="popover"]').popover("show"); 
		
		
		$('#btn-select-0').popover('show');

		$("#btn-select-0").click(function(){
			$('#btn-select-0').popover('hide');
			$("#btn-select-1").popover("show");
		});

		$(document).on('click','#btn-select-1',function(){
			$('#btn-select-1').popover('hide');
			
			setTimeout(function(){
				$('#btn-change-char').popover('show');
				$('#btn-start-game').popover('show');
			},400);
		});
		
		/*
		$("#btn-select-1").click(function(){
			$('#btn-select-1').popover('hide');
		});*/
	}
	
	//animate selected screen with jQuery
	$(document).on('click','.btn', function(e){
		e.preventDefault();

		let name ="#" + $(this)[0].dataset.name;
		let open = $(this)[0].dataset.open;

		if (open === "true"){
			let p1, p2;

			p1 = Cookies.getJSON('player-1');
			p2 = Cookies.getJSON('player-2');

			//give error message if to characters are already selected
			if(p1.selected === true && p2.selected === true){
				setTimeout(function(){ 
					$('#twoSelected').modal('show');
				}, 200);
				return;
			}else{
				$(name).fadeIn(400);
				setCharacterCookie($(this)[0].dataset.name,true);
			}
		}else{
			$(name).fadeOut(400);
			updateCharacterCookie($(this)[0].dataset.name,false);
		}
	});


	//set cookie function that check wether the user selects player for user or computer
	function setCharacterCookie(name, selected){
		let p1, p2;

		p1 = Cookies.getJSON('player-1');
		p2 = Cookies.getJSON('player-2');

		if (p1.selected === false){
			$('*[data-character="' + name + '"]')[0].innerHTML="YOU";
			Cookies.set("player-1", {character: name, selected: selected});
		}else{
			$('*[data-character="' + name + '"]')[0].innerHTML="COMPUTER";
			Cookies.set("player-2", {character: name, selected: selected});
		}

		p1 = Cookies.getJSON('player-1');
		p2 = Cookies.getJSON('player-2');

		//check if two characters are selected, and if true, show modal that prompts user to start game
		if(p1.selected === true && p2.selected === true){
			setTimeout(function(){ 
				$('#startGame').modal('show');
			}, 400);
		}
	}

	//update cookie function that checks if the user would like to change user for him self or the computer
	function updateCharacterCookie(name, selected){
		let p1, p2;

		p1 = Cookies.getJSON('player-1');
		p2 = Cookies.getJSON('player-2');

		if(p1.character === name && p1.selected===true){
			Cookies.set("player-1", {character: "", selected: selected});
		}else if(p2.character === name && p2.selected===true){
			Cookies.set("player-2", {character: "", selected: selected});
		}
	}
});