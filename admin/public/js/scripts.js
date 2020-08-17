
alert(1)
/*var loader = document.querySelector('.loading');
alert(1)
async function login(){
    
    let name = document.querySelector('#usernameField');
    let pass = document.querySelector('#passwordField');
    if((name.value != '') && (pass.value != '')){
        let formq = document.querySelector('.login');
        
        let data = new FormData(formq);
        request('post','/login',data)
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
/*
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
function show(url){
  let retry;
    retry = setInterval(function(){
    request('get',url)
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
    retry = setInterval(function(){
    request('get','/dashboard')
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
        alert(c)
        body.innerHTML = c;
    })
    .catch((e)=>{
        body.innerHTML = e;
    });
}
/*

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
*/