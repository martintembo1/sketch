const mysql = require('mysql');
const config = {
    host:'localhost',
    user:'root',
    password:''
}
const statements = {
    'TABLE':`CREATE TABLE IF NOT EXISTS products(
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

const pool = mysql.createPool(config);

//console.log(statements);

async function connection(){
    
    let conn = new Promise((resolve,reject)=>{
        pool.getConnection(function(error,ok){
            if(error){
                reject(error);
            }
            resolve(ok)
        });
    });
    return conn;
}


async function setup(){
    let output = {}
    let db = new Promise((resolve,reject)=>{
    connection()
    .then((conn)=>{
    conn.query('CREATE DATABASE IF NOT EXISTS SKETCH',(error,results)=>{
        if(error) reject(error);
        output['DATABASE'] = results;
        resolve(output);
    });
    conn.changeUser({'database':'SKETCH'});
    conn.query(statements['TABLE'],function(error,results){
            if(error) reject(error);
            output['PRODUCT'] =results;
            resolve(output)
        });
    conn.query(statements['CATEGORY'],function(error,results){
        if(error) throw error;
        console.log('-&%%+(!')
        output['CATEGORY'] = results;
    });
    
    output['CONN'] = conn; 
})
.catch((error)=>{
    console.log('CONN ERROR',error);
})
    //pool.end();
});

return db;
}

async function db(database){
    let conn = new Promise((resolve,reject)=>{
        connection()
        .then((ok)=>{
            ok.changeUser({'database':database});
            console.log('Connected to the database:',database);
            resolve(ok);
        })
        .catch((err)=>{
            console.log('Failed to connect!')
            reject(err);
        });
    });
    return conn;
}


setup()
.then((c)=>{
    c['CONN'].release();
    console.log('SUCCESSFULLY DONE')
})
.catch((e)=>{
    console.log(e)
});

module.exports = db;