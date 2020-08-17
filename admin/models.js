//const mysql= require('mysql');
const db = require('./setup')[0];
const verify = require('./setup')[1];
const Crypto = require('./utils');

let keys = {
"key": "f6dc105326e037a4e1c4f7da6b7752594b99ac6647ccff4154f2abffdfc5f206"
    
}


let statements = {
    'ADD':`INSERT INTO products(productid,name,category, status,short,long,cost,price,image,location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?);`,
    'CATEGORY':`INSERT INTO categories(\`?\`)
    VALUES(?);`,
    'ADMIN':`
    CREATE TABLE IF NOT EXISTS admin(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(200) NOT NULL UNIQUE,
    username VARCHAR(200) NOT NULL UNIQUE,
    age VARCHAR(100) NOT NULL,
    myphone VARCHAR(100) NOT NULL,
    email VARCHAR(200) NULL,
    location VARCHAR(200) NULL,
    bio TEXT NULL,
    picture VARCHAR(200) NULL,
    password VARCHAR(500) NOT NULL,
    joinDate TIMESTAMP
    );
    `,
    'COMPANY':`
   CREATE TABLE IF NOT EXISTS company(
   id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
   title VARCHAR(100) NOT NULL UNIQUE,
   name VARCHAR(100) NOT NULL,
   phone VARCHAR(100) NOT NULL UNIQUE,
   location VARCHAR(100) NOT NULL,
   status varchar(3) NOT NULL,
   picture VARCHAR(100) NOT NULL,
   joidDate TIMESTAMP
)
`,
'addAdmin':`
INSERT INTO admin(fullname,username,age,myphone,password,email,location,bio,picture)
VALUES(?,?,?,?,?,'28a0641660ac81cb1c77d7c34dd74c53745e4d5d3877d3bdfd6566d4b67559b7','Detected Location','my bio','images/default/me.png');
`,
'PRODUCT':`CREATE TABLE IF NOT EXISTS products(
	id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	product_id VARCHAR(100) UNIQUE NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	category_name VARCHAR(100) NOT NULL,
	status_bool VARCHAR(100) NOT NULL,
	shortDesc VARCHAR(100) NOT NULL,
	longDesc VARCHAR(200) NOT NULL,
	location VARCHAR(100) NOT NULL,
	cost_price VARCHAR(100) NOT NULL,
	selling_price VARCHAR(100) NOT NULL,
	image VARCHAR(100) NOT NULL,
	date_from TIMESTAMP,
	date_to DATE
)`,
   'CATEGORY':`
    CREATE TABLE IF NOT EXISTS categories(
    id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    technology VARCHAR(100) NOT NULL,
    electronics VARCHAR(100) NOT NULL,
    clothes VARCHAR(100) NOT NULL,
    foods VARCHAR(100) NOT NULL,
    household VARCHAR(100) NOT NULL,
    kids VARCHAR(100) NOT NULL,
    women VARCHAR(100) NOT NULL,
    men VARCHAR(100) NOT NULL,
    style VARCHAR(100) NOT NULL,
    date_from TIMESTAMP
    )
    `
}


class Admin{
    constructor(username){
        this.crypto = new Crypto(keys.key)
        this.db = username;
        this.username = username;
        
    }
    v
    
    add(user){
        
        let data = new Array();
        
        for(let p in user){
            data.push(this.crypto.encrypt(user[p]));
            
        }
        data.pop();
        
        db(`${user.username}`)
        .then((c)=>{
            c.query(statements['ADMIN'],function(error,results){
                if(error) throw error;
            });
           c.query(statements['addAdmin'],data,function(error,fields){
               if(error) throw error;
               
           });
           c.query(statements['COMPANY'],function(error,results){
               if(error) throw error;
           });
           c.end();
           
        })
        .catch((e)=>{
            
            console.log('Somethimg went wrong!');
        });
        let userData = {}
        userData.sketchUser = data[1];
        userData.sketchPass = data[4];
        return Promise.resolve(userData)
    }
    async users(){
       let results = new Promise((resolve,reject)=>{
           let retry;
           
           db(`${this.username}`)
           .then((conn)=>{
               conn.query('SELECT * FROM admin;',function(error,users,fields){
                   if(error){
                       reject(error);
                   }
                   let finalResults = {}
                   try{
                       resolve(users[0])
                   }catch(e){
                       console.log('Efgbdddf',e)
                       reject(e)
                   }
                   
                   
               });
               
              
           })
           .catch((e)=>{
               reject(e);
           });
           
           
       });
       return results;
    }
    static async users(username){
       let results = new Promise((resolve,reject)=>{
           let retry;
           
           verify(`${username}`)
           .then((valid)=>{
              resolve(valid);
           })
           .catch((e)=>{
               reject(e)
           });
           
           
       });
       return results;
    }
    remove(name=null,id=null){
        
    }
    subscribers(id,name=null){
        
    }
}



class Products{
    constructor(username){
        
    }
    
    set add(product){
        let item = product;
        db('SKETCH')
        .then((conn)=>{
    
    conn.query(statements['ADD'],[item['id'],item['name'],item['category'],item['status'],item['short'],item['long'],item['cost'],item['price'],item['image'],item['location']],function(error,results){
        if(error) throw error;
        
    });
    conn.query(`INSERT INTO categories(${item['category']})
    VALUES('${item['name']}');`,function(error,results){
        if(error) throw error;
        
    });
    conn.end();
})
        .catch((error)=>{
    throw error
    
})
    }
    async all(){
       let result = new Promise((resolve,reject)=>{
       db()
       .then((conn)=>{
           conn.query('SELECT * FROM products;',function(error,results){
               resolve(results);
           });
           conn.release();
           console.log('CONNECTION_DATABASE_STATE: KILLED')
       })
       .catch((error)=>{
           reject(error);
       })
       });
       return result
    }
    async execute(by,data){
        let result = new Promise((resolve,reject)=>{
            db(this.db)
            .then((conn)=>{
                conn.query(`SELECT * FROM products WHERE ${by}='${data}';`,function(error,results){
                    if(error){
                        reject(error);
                    }
                    resolve(results)
                });
            })
            .catch((error)=>{
                reject(error);
            });
        });
        
        return result
        }
   id(id=null){
        let sf = {}
        if(id){
            this.execute('id',id)
            .then((results)=>{
                sf = results;
                return results
            })
            .catch((error)=>{
                
            });
        }
        
    }
    remove(id){
        db(this.db)
        .then((conn)=>{
            conn.query('DELETE FROM products WHERE product_id=?',[id],function(error,results){
                if(error) throw error;
                c
            })
        })
        .catch((error)=>{
            throw error;
        });
        
    }
    category(name){
        if(name){
            this.execute('category_name',name)
            .then((results)=>{
                
            })
            .catch((error)=>{
                
            });
        }
    }
    change(user){
        let keys = new Array();
        let values = new Array();
        for(let key in user){
            keys.push(key);values.push(user[key]);
        }
        let sql = `
        UPDATE admin
        SET keys[i]=?
        `
    }
}

let user = {
    'fullname':'kjshhs',
    'username':'martintembnjjjo',
    'age':'N/A',
    'myphone':'536663',
    'workplace':'+260954003998',
    'location':'Makeni Villa,LSK',
    'bio':'MKN',
    'picture':'images/martintembo1/me.jpg',
    'password':'543027'
}


class Company{
    constructor(username){
        this.db = username
    }
}

module.exports = Admin;