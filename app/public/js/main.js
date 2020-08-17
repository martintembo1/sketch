
const getByClass = (className) =>{
	return document.querySelector("."+className);
}
const getByTag = (tagName) =>{
	return document.querySelector(tagName);
}
const inactiveEL = () =>{
	voice_search();
}
const addClass = (el,className) =>{
	el.setAttribute("class",className);
}

let dialog = getByClass("dialog");

let main = getByTag("main");

let voice_search = (el) =>{
	dialog.classList.toggle("active");
	main.classList.toggle("blur");
	
}

const toggleNav =()=>{
	let aside = getByClass("mobile-aside");
	aside.classList.toggle("active");
	main.classList.toggle("push");
}
const showNext=(el)=>{
	let eI = el.nextElementSibling;
	let spanner = el.lastElementChild;
	spanner.classList.toggle("icofont-thin-right");
	spanner.classList.toggle("icofont-thin-down");
	eI.classList.toggle("active");
}

const toggleNext =(el)=>{
	el2 = el.nextElementSibling;
	el2.classList.toggle("none");
	
}

const popup = () =>{
	const popUp = getByClass("popup");
	popUp.classList.toggle("none");
}

category.onchange = (ev) =>{
	for(let i in ev){
		
	}
	for(let i in document.forms){
		//console.log(i)
	}
	let txt = document.getSelection();
	console.log(txt.toString())

}