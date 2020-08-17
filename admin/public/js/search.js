

const search = () =>{
	const main = document.querySelector(".products");
	const loader = document.querySelector(".loading");
	const inputEl = document.querySelector(".searchField");
	const dialogTwo = document.querySelector(".dialog-two");
	const dialogContent = document.querySelector(".dialogContent");
	const searchArea = document.querySelector(".search-area");
	const validator = new Promise((executor, reject) => {
	    if (inputEl.value == "") {
			reject("Can't submit");
			dialogTwo.classList.toggle("none");
			dialogContent.textContent = "Empty Field";
			
	    }else{
	    	executor(inputEl.value)
	    	dialogTwo.classList.add("none")
	    }
	});
	validator.then((success,error)=>{
		if(success){
			console.log(success);
			loader.classList.toggle("none");
			main.classList.toggle("none");
			let form = document.getElementById("searchForm");
			
			let search_data = new FormData(form);
			
			request.send(form);
		}else{
			console.log(error);
			
		}
	})
	
	
	request = new XMLHttpRequest();
	
	request.open("post","/j");
	statusText = document.querySelector(".statusText");
	request.onreadystatechange = () =>{
		
		if(request.readyState === 0){
			dialogTwo.classList.toggle("none")
			statusText.textContent = "Connecting..."
			console.log(`${request.statusText}`);
		}else if(request.readyState === 1){
			statusText.textContent = "Connected..."
		}else if(request.readyState === 2){
		    statusText.textContent = "Almost Done"
		}else if(request.readyState === 3){
			statusText.textContent = "Rendering Content"
		}else if(request.readyState === 4 && request.statusText === "OK"){
			statusText.style.color = "grey";
			statusText.textContent = "Done!";
			loader.classList.toggle("none")
			main.classList.toggle("none");
			searchArea.classList.toggle("none")
			searchArea.firstElementChild.innerHTML = "";
			searchArea.firstElementChild.innerHTML += request.responseText;
		}else{
			statusText.style.color = "crimson"
			statusText.textContent = "Refresh Your Browser"
			
			//dialogTwo.classList.toggle("none")
			//dialogTwo.firstElementChild.textContent = "Connection Error"
		}
	}
	
	
	
}

const validate = (el) =>{
	if(el.value === ""){
		//throw new Error("Can't Submit an empty form","jj");
		return true
	}else{
		
		return false
	}
}


const selectCategory = ()=>{
	
}