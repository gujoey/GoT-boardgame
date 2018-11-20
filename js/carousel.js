
//initialization of slick.js carousel
$(document).ready(function(){
	$('.carousel').slick({
		centerMode: true,
		centerPadding: '60px',
		slidesToShow: 3,
		dots: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 1
				}
			}
		]
	});
});

fetch("https://www.anapioficeandfire.com/api/characters?name=jon+snow")
	.then((response)=>{
		return response.json()
	})
	.then(result=>{
		console.log(result);
	}) 


function createCard(res){
	let
}