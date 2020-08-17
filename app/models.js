const mysql= require('mysql');
const db = require('./setup')


let statements = {
    'ADD':`INSERT INTO products(productid,name,category, status,short,long,cost,price,image,location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?);`,
    'CATEGORY':`INSERT INTO categories(\`?\`)
    VALUES(?);`
}

class Products{
    constructor(){
        
    }
    
    set add(product){
        let item = product;
        db('SKETCH')
        .then(async (conn)=>{
    
    await conn.query(statements['ADD'],[item['id'],item['name'],item['category'],item['status'],item['short'],item['long'],item['cost'],item['price'],item['image'],item['location']],function(error,results){
        if(error) throw error;
        console.log(results)
    });
    await conn.query(`INSERT INTO categories(${item['category']})
    VALUES('${item['name']}');`,function(error,results){
        if(error) throw error;
        console.log(results)
    });
    await conn.end();
})
        .catch((error)=>{
    throw error
    console.log(error)
})
    }
    async all(){
       let result = new Promise(async (resolve,reject)=>{
       await db('SKETCH')
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
            db('SKETCH')
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
                console.log(error)
            });
        }
        
    }
    remove(id){
        db('SKETCH')
        .then((conn)=>{
            conn.query('DELETE FROM products WHERE product_id=?',[id],function(error,results){
                if(error) throw error;
                console.log(results);
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
                console.log('RESULTS: ',results)
            })
            .catch((error)=>{
                console.log(error)
            });
        }
    }
    
}
let short = 'Short Description';
let long = `Long Description `;

let item = {
    'id':'7671594',
    'name':'drawn',
    'category':'technology',
    'cost':'300',
    'price':'370',
    'status':'ON',
    'location':'Lusaka',
    'short':`${short}`,
    'long':`${long}`,
    'image':'images/product-6.jpg'
}
/*
let product = new Products();
product.add = item;
*/
module.exports = Products;