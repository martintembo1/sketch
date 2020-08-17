const mysql = require('mysql');

let config = {
	host: 'localhost',
	user: 'root',
	password: ''
}

async function connect(){
	let conn = mysql.createPool(config);
	let retry;
	let myConn = new Promise((resolve,reject)=>{
		//console.log(conn)
		retry = setInterval(async function(){
		await conn.getConnection(function(error,connection){
			if(error){
				console.log('Retrying to connect')
				reject(error);
			}else{
			    
			
			console.log('Connected!')
			resolve(connection)
			clearInterval(retry)
			
		     }
		});
		},1000);
});
	return myConn;
}
async function db(){
    let retry;
    let conn = new Promise((resolve,reject)=>{
        retry = setInterval(async function(){
            await connect()
            .then(c =>{
                resolve('OK')
                clearInterval(retry)
            })
            .catch(e =>{
                reject('No!')
            });
        },1000)
    })
    
    return conn;
}

let retry;
retry = setInterval(function(){
db()
.then(async (c)=>{
    console.log(true)
    clearInterval(retry);
})
.catch(async (e)=>{
    console.log(false)
})

},1000);