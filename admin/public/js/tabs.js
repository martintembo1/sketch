var parent = document.querySelector(".tabs");


async function tabs(){
	await setTimeout('alert(parent. childElementCount);',3000);
	await setTimeout('alert(5);',5000);
	await setTimeout('alert(2);',2000);
}
tabs();