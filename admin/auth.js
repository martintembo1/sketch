const Admin = require('./models');
const Crypto = require('./utils');
const verify = require('./setup')[1];
const db = require('./setup')[0];

let keys = {
"key": "f6dc105326e037a4e1c4f7da6b7752594b99ac6647ccff4154f2abffdfc5f206"
}

let crypto = new Crypto(keys.key);
//console.log(crypto.encrypt('myemail@example.com'))
class Auth{
    constructor(username){
        
        this.conn = function(){
            let validation = new Promise((resolve,reject)=>{
                verify(username)
                .then((c)=>{
                    resolve(c)
                })
                .catch((e)=>{
                    reject(e)
                })
            });
            return validation;
        }
    }
    async db(){
        let admin = new Promise(async (resolve,reject)=>{
            await this.conn()
            .then((c)=>{
                let OK = new Admin(c.database);
                resolve(OK)
            })
            .catch((e)=>{
                reject(e)
            });
        });
        return admin;
    }
    
    static async existence(username){
        let ok = new Promise((resolve,reject)=>{
            let validation = {};
            Admin.users(`${username}`)
            .then((yes)=>{
                reject(yes)
            })
            .catch((no)=>{
                resolve(no)
            });
        })
        return ok;
    }
    static async create(userData){
        let user = new Promise((resolve,reject)=>{
            db(`${userData.username}`)
            .then((c)=>{
                c.end();
                let admin = new Admin(userData.username);
                admin.add(userData)
                .then((c)=>{
                    resolve(c);
                })
            })
            .catch((e)=>{
                reject(e)
            });
        });
        
        return user;
    }
    
    async login(data){
        let user = {};
        for(let k in data){
            user[k] = crypto.decrypt(data[k]);
        }
        
        let auth = new Promise((resolve,reject)=>{
            this.db()
            .then((ok)=>{
                ok.users()
                .then((c)=>{
                let name = crypto.decrypt(c['username']);
                let pass = crypto.decrypt(c['password']);
                let validation = {
                    valid:false
                }
                
                if((name === user.name) && (pass == user.pass)){
                    validation.valid = true;
                    validation.user = true,
                    validation.pass = true
                    
                    resolve(validation);
                }else if(name === user.name){
                    validation.valid = false;
                    validation.user = true;
                    reject(validation)
                   
                }else if(pass === pass ){
                    validation.pass = true;
                    reject(validation);
                }else{
                    reject(validation);
                }
                
                })
                .catch((e)=>{
                    reject(e)
                });
            })
            .catch((e)=>{
                let validation = {
                    valid: false,
                    username: false
                }
                reject(validation)
            });
        });
        
        return auth;
    }
    async update(){
        
    }
    async user(){
        let user = new Promise((resolve,reject)=>{
            this.db()
            .then((ok)=>{
                
                ok.users()
                .then((c)=>{
                    let data = {}
                    data.fullname = c.fullname;
                    data.sketchUser = c.username;
                    data.myphone = c.myphone;
                    data.email = c.email;
                    data.state = c.location;
                    data.bio = c.bio;
                    data.sketchPass = c.password;
                    if(c.picture === null){
                        data.picture = 'images/default/me.png';
                    }else{
                        data.picture = c.picture;
                    }
                    
                    resolve(data);
                   
                })
                .catch((e)=>{
                    reject(e)
                });
                
            })
            .catch((e)=>{
                reject(e)
            });
        });
        return user;
    }
}

let user = {
    "name":"221b3366862fb361ebbc32abbc7dba7d",
    "pass":"b965a3ff261d9bb2e3f1d65c0ba12f00"
}
let user2 = {
    "name":"2f642be93d26ae14733b0425b10d4d93",
    "pass":"b965a3ff261d9bb2e3f1d65c0ba12f00"
}

/*let auth = new Auth('rosemary');
//let db = auth.db();
auth.user()
.then((c)=>{
    console.log('&&&&: ',c)
})
.catch((e)=>{
    
});*/
/*
auth.login(user2)
.then((c)=>{
    console.log('DB SUCCESS: ',c)
    
})
.catch((e)=>{
    console.log('DB REJECT: ',e)
})

Auth.existence('martintembsbso')
.then((no)=>{
    console.log('create')
})
.catch((yes)=>{
    console.log('don\'t create')
})*/

//Auth.create()
module.exports = Auth;