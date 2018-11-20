
//animate selected screen with jQuery
$("#select-snow").click(function(){
	$("#snow-selected").fadeIn(400);
});

$("#remove-snow").click(function(){
	$("#snow-selected").fadeOut(400);
});



function createCard(apiRes){
	let row, col, colInner, colInnerSelected, colInnerSelectedCenter;
	let pSelected, pSelectedStrong, pSelectedStrongText, pSelectedText;
	let pSelectedBr, pSelectedSpan;
	
	row = document.getElementById("row");
	
	col = document.createElement("div");
	col.className = "col-md-3";
	row.appendChild(col);
	
	colInner = document.createElement("div");
	colInner.className = "col-inner";
	col.appendChild(colInner);
	
	colInnerSelected = document.createElement("div");
	colInnerSelected.className = "col-inner__selected";
	colInner.appendChild(colInnerSelected);
	
	colInnerSelectedCenter  =document.createElement("div");
	colInnerSelectedCenter.className = "col-inner__selected--center";
	colInnerSelected.appendChild(colInnerSelectedCenter);
	
	pSelected = document.createElement("p");
	pSelectedStrong = document.createElement("strong");
	pSelectedStrongText = document.createTextNode("YOU");
	
	pSelectedText = document.createTextNode(" are playing with")
	pSelectedBr = document.createElement("br");
	
	pSelectedSpan = document.createElement("span");
	pSelectedSpan.className = ""
	
	
	
	
	
}

createCard();

//fetch object from api
function getApi(param){
	fetch("https://www.anapioficeandfire.com/api/characters?name="+param)
	.then((response)=>{
		return response.json()
	})
	.then(result=>{
		console.log(result);
	}) 
}

//characters to select from
let characters = [
	"jon+snow",
	"arya+stark",
	"sansa+stark",
	"daenerys+targaryen",
	"tyrion+lannister",
	"cersei+lannister",
	"gregor+clegane",
	"sandor+clegane",
	"joffrey+baratheon",
	"petyr+baelish"
];

//loop throug array and call getApi funtion
for (let i=0; i<characters.length; i++){
	getApi(characters[i]);
}