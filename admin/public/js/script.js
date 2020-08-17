var loader = document.querySelector('.loading');
async function resume(){
    if(localStorage['sketchHistory']){
        let page = localStorage['sketchHistory'];
        req('get',page);
    }
}
resume();
async function req(method,url,data=null){
    if(data){
        let retry;
    retry = setInterval(function(){
    request(method,url)
    .then((c)=>{
        loader.classList.add('none');
        root.innerHTML = c;
        clearInterval(retry);
    })
    .catch((e)=>{
        root.innerHTML = ""
        loader.classList.remove('none');
    });
    
    },0);
    }else{
        let retry;
    retry = setInterval(function(){
    request(method,url)
    .then((c)=>{
        loader.classList.add('none');
        root.innerHTML = c;
        clearInterval(retry);
    })
    .catch((e)=>{
        root.innerHTML = ""
        loader.classList.remove('none');
    });
    
    },0);
    }
}
async function login(){
    
    let name = document.querySelector('#usernameField');
    let pass = document.querySelector('#passwordField');
    if((name.value != '') && (pass.value != '')){
        let formq = document.querySelector('.login');
        
        let data = new FormData(formq);
       await request('post','/login',data)
        .then((c)=>{
            //localStorage.set('sketchUser','')
              let user = JSON.parse(c);
              
              if(user['sketchUser']){
                for(let key in user){
                    localStorage[key] = user[key];
                
                }
                window.open('/','_self');
              }else{
                if(!user['user']){
                    name.style.borderColor = 'crimson';
                    netState.classList.remove('none');
                    validate.textContent = 'Incorrect username or user doesn\'t exist.'
                }else if(!user['pass']){
                    pass.style.borderColor = 'crimson';
                    
                    netState.classList.remove('none')
                    validate.textContent = 'Provided password doesn\'t match the username';
                }
              }
        })
        .catch((e)=>{
            netState.classList.remove('none');
            
        });
    }else{
        name.style.borderColor = 'crimson';
        pass.style.borderColor = 'crimson';
    }
}

async function signup(){
    let formq = document.querySelector('#join');
    let inputs = document.querySelectorAll('input');
    let validator = new Array();
    for(let i=0; i<inputs.length;i++){
        if(inputs[i].value != ""){
            validator.push(i);
        }else{
            inputs[i].style.borderColor = 'crimson';
        }
    }
    if(validator.length === 6){
        let formData = new FormData(formq);
        request('post','/create',formData)
        .then((c)=>{
            loader.classList.add('none');
            let user = JSON.parse(c);
            if(user.exists){
                netState.classList.remove('none');
                netState.style.backgroundColor = 'black';
                validate.textContent = 'The details you have entered already exist'
            }else if(user.sketchUser){
                for(let key in user){
                    localStorage[key] = user[key];
                
                }
                window.open('/','_self');
            }else if(user.pass){
                netState.classList.remove('none');
                netState.style.backgroundColor = 'crimson';
                validate.textContent = 'The password fields do not match.'
            }
            
            
        })
        .catch((e)=>{
            loader.classList.remove('none');
            alert(e)
        })
    }else{
        validate.textContent = 'Please fill all the fields.';
        netState.classList.remove('none');
    
    }
}
async function updateProfile(){
    let formq = document.querySelector('#updateForm');
    let inputs = document.querySelectorAll('input');
    let bio  = document.querySelector('#mybio');
   let formp = new FormData();
    let fs;
    let validator = new Array();
    for(let i=1; i<inputs.length;i++){
        if(inputs[i].value != ""){
            validator.push(inputs[i]);
        }else{
            inputs[i].style.borderColor = 'crimson';
        }
    }
    if(bio.value != ''){
        validator.push(bio);
    }
    
    if(inputs[0].type === 'file'){
        fs = new FormData(formq);
    }
    alert(fs)
    for(let i=0; i<validator.length;i++){
        formp.set(validator[i].name,validator[i].value);
    }
    post('/profile/update',fs)
    .then((c)=>{
        console.log(c)
    })
    .catch((e)=>{
        console.log(e)
    });
}
async function feedbackForm(){
    let formq = document.querySelector('.feedback');
    let formp = new FormData(formq);
    post('/feedback',formp)
    
}
async function post(url,data){
    let retry;
    retry = setInterval(function(){
    request('post',url,data)
    .then((c)=>{
        loader.classList.add('none');
        root.innerHTML = c;
        clearInterval(retry);
    })
    .catch((e)=>{
        root.innerHTML = ""
        loader.classList.remove('none');
    });
    
    },0);

}
async function show(url){
  let retry;
    retry = setInterval(async function(){
    await request('get',url)
    .then((c)=>{
        loader.classList.add('none');
        root.innerHTML = c;
        clearInterval(retry);
    })
    .catch((e)=>{
        root.innerHTML = ""
        loader.classList.remove('none');
    });
    
    },0);
}
window.onclick = function(ev){
    if(ev.target.dataset.link){
        
        show(ev.target.dataset.link);
    }
}
const back = async () =>{
    let retry;
    retry = setInterval(async function(){
    await request('get','/dashboard')
    .then((c)=>{
        loader.classList.add('none');
        root.innerHTML = c;
        clearInterval(retry);
    })
    .catch((e)=>{
        root.innerHTML = ""
        loader.classList.remove('none');
    });
    
    },0);

}

const showNext = (el) =>{
    let tab = el.nextSibling;
    tab.classList.toggle('none');
}

const account = (url) =>{
    request('get',`${url}`)
    .then((c)=>{
        
        body.innerHTML = c;
    })
    .catch((e)=>{
        loader.classList.remove('none');
    });
}


const logout = () =>{
    let retry;
      let name = localStorage['sketchUser'];
      let pass = localStorage['sketchPass'];
      let form = new FormData();
      form.set('name',name);
      form.set('pass',pass);
    retry = setInterval(function(){
    request('post','/logout',form)
    .then((c)=>{
        loader.classList.add('none');
        let unary = JSON.parse(c);
        if(unary['logout']){
            delete localStorage['sketchUser'];
            delete localStorage['sketchPass'];
            window.open('/','_self');
            
        }else{
            alert('Something went wrong!');
        }
        //window.open('/','_self');
        clearInterval(retry);
    })
    .catch((e)=>{
        root.innerHTML = ""
        loader.classList.remove('none');
    });
    
    },0);

}

const aside = ()=>{
    header.classList.toggle('flx-r');
    header.classList.toggle('flx-r2');
    asideNav.classList.toggle('active');
}

window.onoffline= function(event){
    netState.style.backgroundColor = 'crimson';
    netState.classList.remove('none');
    validate.textContent = 'Please check your internet connection.'
}
window.ononline = function(event){
    netState.style.backgroundColor = '#0E9E00';
    validate.textContent = 'Your connection is back.'
    setTimeout(e =>{netState.classList.add('none');},2000);
}



document.getElementById("audioCapture").addEventListener("click", audioCapture);

document.getElementById("imageCapture").addEventListener("click", imageCapture);

document.getElementById("videoCapture").addEventListener("click", videoCapture);

function audioCapture() {

	var options ={

		limit:1,

		duration:10

	};

	navigator.device.capture.captureAudio(onSuccess, onError, options);

	function onSuccess(mediaFiles) {

		var i, path, len;

		for (i = 0, len = mediaFiles.length; i < len; i += 1)
		{

			path = mediaFiles[i].fullPath;

			console.log(mediaFiles);

		}

	}
	function onError(error) {

		navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');

	}



}

async function gotoApp(){
    let retry;
    retry = setInterval(async function(){
    await request('get','/web')
    .then((res)=>{
        let content = JSON.parse(res);
        alert(content.app.toString())
        
            //window.location.assign('http://localhost:3000')
            window.document.write(content.app.toString());
        
        clearInterval(retry);
    })
    .catch((e)=>{
        alert(e)
       // clearInterval(retry)
    });
    },2);
}


function inputData(el){
    let value = "";
    el.addEventListener('input',function(){
        value = +el.value;
    })
    el.addEventListener('mouseout',function(){
        if(el.value === ''){
            el.nextElementSibling.style.display = 'inline-block';
        } else {
            el.nextElementSibling.style.display = 'none';
            el.style.borderBottom = '1px solid #0966CD';
        }
    })
    
}

function moderator(el){
    el.addEventListener('change',function(){
    if(el.value === 'moderator'){
        window.moderator = el.value;
        alert(window.moderator)
        
    }else{
        delete window.moderator;
    }
});
    
}