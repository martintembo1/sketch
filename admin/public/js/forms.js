alert(8);
const autoLogin = ()=>{
		let joinForm = document.querySelector("#loginForm");
		let loader = document.querySelector(".loading");
		let formDisplay = document.querySelector(".forms");
		let statusText = document.querySelector(".statusText");
		let body = document.querySelector("body");
		let  header = document.querySelector("header");
		
		if(localStorage.getItem("username") && localStorage.getItem("password")){
			let user = localStorage.getItem("username");
			let pass = localStorage.getItem("password");
			
			let dataForm = new FormData()
			dataForm.set("userAccount",user)
			dataForm.set("userPassword",pass)
			
			let request = new XMLHttpRequest();
			
			request.open("post","/login",false)
			
			request.onreadystatechange = ()=>{
				if(request.readyState === 4 && request.statusText === "OK"){
					window.open(`${request.responseText}`,"_self");
				}else{
					formDisplay.classList.toggle("none");
					loader.classList.toggle("none")
					body.classList.toggle("bg-default")
					header.classList.toggle("sh")
					statusText.textContent = "Logging In"
				}
			}
			
			request.send(dataForm)
			
		}
		
	}

const login = ()=>{
	let joinForm = document.querySelector("#loginForm");
	let loader = document.querySelector(".loading");
	let formDisplay = document.querySelector(".forms");
	let statusText = document.querySelector(".statusText");
	let body = document.querySelector("body");
	let  header = document.querySelector("header");
	
	request = new XMLHttpRequest();
	
	request.open("post","/login",false)
	
	request.onreadystatechange = () =>{
	if(request.readyState === 4 && request.statusText === "OK"){
		
		//body.innerHTML request.responseText;
		
		alert(request.responseText);
					
	}else{
		
		formDisplay.classList.toggle("none");
		loader.classList.toggle("none")
		body.classList.toggle("bg-default")
		header.classList.toggle("sh")
		statusText.textContent = "Logging In"
		
	}
	}
	
	
	
	let formData = new FormData(joinForm);
	
	request.send(formData);
	}
	
	const validate =()=>{
		let username = document.querySelector("#usernameField");
		let password = document.querySelector("#passwordField");
		
		if(username.value != "" && password.value != ""){
		login();
			localStorage.setItem("username",username.value);
			localStorage.setItem("password",password.value);
		}else{
			username.style.border = "1px solid crimson"
			password.style.border = "1px solid crimson";
		}
	}
	
	
	
	
const join = ()=>{
		let joinForm = document.querySelector("#joinForm");
		let loader = document.querySelector(".loading");
		let formDisplay = document.querySelector(".forms");
		let statusText = document.querySelector(".statusText");
		let body = document.querySelector("body");
		let  header = document.querySelector("header");
		
		request = new XMLHttpRequest();
		
		request.open("post","/signup",false)
		
		request.onreadystatechange = () =>{
			if(request.readyState === 4 && request.statusText === "200"){
				alert("done")
			}else{
				
				formDisplay.classList.toggle("none");
				loader.classList.toggle("none")
				body.classList.toggle("bg-default")
				header.classList.toggle("sh")
				statusText.textContent = "Logging In"
			}
		}
		
		let formData = new FormData(joinForm);
		
		request.send(formData);
	}
	
    	const sendFeedback = ()=>{
    		let feedbackForm = document.querySelector("#feedback");
    		let statusText = document.querySelector(".statusText");
    		let main = document.querySelector("main");
    		let body = document.querySelector("body");
    		let request = new XMLHttpRequest();
    		request.open("post","/dashboard/feedback",true)
    		let loader = document.querySelector(".loading");
    		request.onreadystatechange = ()=>{
    			if(request.readyState === 4 && request.statusText === "OK"){
    				
    				main.style.display = "block";
    				body.innerHTML = request.responseText;
    				loader.classList.add("none");
    			}else if(request.readyState === 0){
    				loader.classList.remove("none");
    				statusText.textContent = "Connecting..."
    				main.style.display= "none";
    			}else if(request.readyState === 1){
    				loader.classList.remove("none");
    				statusText.textContent = "Connected..."
    				main.style.display= "none";
    			}else if(request.readyState === 2){
    				loader.classList.remove("none");
    				statusText.textContent = "Getting ready..."
    				main.style.display= "none";
    			}else if(request.readyState === 3){
    				loader.classList.remove("none");
    				statusText.textContent = "Done!"
    				main.style.display= "none";
    			}else{
    				
    				loader.classList.remove("none");
    				statusText.textContent = "Connection Error"
    				main.style.display= "none";
    				
    			}
    		}
    		
    		
    		let formData = new FormData(feedbackForm);
    		formData.set("username","martintembo1")
    		request.send(formData);
    	}
    	const validateOK = ()=>{
    		let fback = document.querySelector(".feedback");
    		if(fback.value != "" && fback.value.length > 100){
    			sendFeedback();
    		}else{
    			fback.placeholder = "Please enter atleast more than 50 characters";
    			fback.style.border = "1px solid crimson"
    			
    		}
    	}
    	let fback = document.querySelector(".feedback");
    	fback.oninput = ()=>{
    		fback.style.border = "none";
    	}