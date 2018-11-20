
//animate selected screen with jQuery
$("#select-snow").click(function(){
	$("#snow-selected").fadeIn(400);
});

$("#remove-snow").click(function(){
	$("#snow-selected").fadeOut(400);
});



function createCard(apiRes){
	//selected character variables
	let row, col, colInner, colInnerSelected, colInnerSelectedCenter;
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
	colInnerSelected.className = "col-inner__selected";
	colInner.appendChild(colInnerSelected);
	
	//inner selected column that centers text vertically
	colInnerSelectedCenter  =document.createElement("div");
	colInnerSelectedCenter.className = "col-inner__selected--center";
	colInnerSelected.appendChild(colInnerSelectedCenter);
	
	//create p element and text and append to the "selected character" card inside column
	pSelected = document.createElement("p");
	pSelectedStrong = document.createElement("strong");
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
	
	pCultureText = document.createTextNode(apiRes[0].culture);
	pCulture.appendChild(pCultureText);
	colInner.appendChild(pCulture);
	
	//create select character button
	btn = document.createElement("button");
	btn.type = "button";
	btn.className = "btn btn-lg col-inner__btn";
	
	btnText = document.createTextNode("Select Character");
	btn.appendChild(btnText);
	colInner.appendChild(btn);
}


//fetch object from api
function getApi(param){
	fetch("https://www.anapioficeandfire.com/api/characters?name="+param)
	.then((response)=>{
		return response.json()
	})
	.then(result=>{
		createCard(result);
		console.log(result);
	}) 
}

//characters to select from
let characters = [
	"jon+snow",
	"jon+snow",
	"jon+snow",
	"jon+snow"
	/*"arya+stark",
	"sansa+stark",
	"tyrion+lannister",
	"cersei+lannister",
	"gregor+clegane",
	"sandor+clegane",
	"joffrey+baratheon",
	"petyr+baelish"*/
];

//loop throug array and call getApi funtion
for (let i=0; i<characters.length; i++){
	getApi(characters[i]);
}