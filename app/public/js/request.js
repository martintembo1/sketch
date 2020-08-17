async function request(method,url,data=null){
    var req = new XMLHttpRequest();
    
    let getContent = new Promise((resolve,reject)=>{
        req.open(method,url,false)
        req.onload = () =>{
            if(req.readyState === 4 && req.status === 200){
               
               return resolve(req.responseText);
               
            } else {
                
                return reject('NetworkError')
            }
            
        }
        
        req.onerror = () =>{
            return reject('Network error');
        }
        if(data){
            req.send(data);
        }else{
            req.send();
        }
        
    });
    
    return getContent;
    
}



