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
            localStorage.setItem('sketchHistory',url);
            
            req.send();
        }
        
    });
    
    return getContent;
    
}

class Request {
    get get(){
        return 'get';
    }
    get post(){
        return 'post';
    }
    get del(){
        return 'delete';
    }
    get put(){
        return 'put';
    }
    constructor(host=window.location.host){
        this.host = host;
    }
    async GET(url) {
        let resp = new Promise(async (resolve,reject)=>{
            await request(this.get,url)
            .then(response=>{
                resolve(response);
            })
            .catch(err =>{
                reject(err);
            });
        })
        return resp;
    }
    async POST(url,data) {
        let resp = new Promise(async (resolve,reject)=>{
            await request(this.post,url,data)
            .then(response=>{
                resolve(response);
            })
            .catch(err =>{
                reject(err);
            });
        })
        return resp;
    }
}

let requester = new Request();