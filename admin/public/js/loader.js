const changeCoordinates =(el)=>{
	let x;
	let y;

	window.ontouchmove = (e)=>{
		let dist = e.changedTouches[0];
		x = dist.clientX;
		y = dist.clientY;
		
	el.style.position = "fixed";
	el.style.top = `${y}px`;
	el.style.left= `${x}px`;
	}
	window.ontouchend = (e) => {
	    let x,x2,y,y2;
	    let dist = e.changedTouches[0];
	    x = dist.clientX;
	    y = dist.clientY;
	    x2 = x;
	    y2 = y
	    x = 0;
	    y = 0;
	    
	    el.style.position = "";
	    el.style.top = `${y}px`;
	    el.style.left = `${x}px`;
	}
	async function fname() {
		// body...
		window.onload = function(e){
			console.log(x,y)
		}
	}
	fname().then(e =>{
		if(e){
			console.log(true)
		}else{
			console.log(false)
		}
	})
}

const preventCopy = (e) =>{
	e.clipboardData.clearData('text','bb');
}
 window.onselectstart = (e) =>{
	return "No Data";
	
}