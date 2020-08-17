const mysql = require('mysql');

let config = {
	host: 'localhost',
	user: 'root',
	password: ''
}

async function connect(){
	let conn = mysql.createPool(config);
	let myConn = new Promise((resolve,reject)=>{
		//console.log(conn)
		conn.getConnection(function(error,connection){
			if(error){
				//console.log('Retrying to connect')
				reject(error);
			}
			//console.log('Connected!')
			resolve(connection);
		});
});
	return myConn;
}


function connecting(){
	let retry;
	let status = new Promise((resolve,reject)=>{
		retry = setInterval(function(){
			connect()
			.then((c)=>{
				let state = {
					'cursor': c,
					'retry': retry
				}
				resolve(c);
				//console.log('Connection Established')
				clearInterval(retry);
			})
			.catch((e)=>{
				//console.log(e)
				//console.log(e)
				reject(e);
				
			});
		},1000);
	});
	

	return status;
}

/*establishConnection();
connecting()
.then((c)=>{
	c.changeUser({database: 'SKETCH'});
	let k = c.query('SELECT * FROM products',function(error,rows,fields){
	    if(error) throw error;
	    console.log(rows)
	});
	//console.log(k)
	
	
})
.catch((e)=>{
	console.log(e)
})
*/
async function db(databaseq){
    let conn = new Promise((resolve,reject)=>{
        connecting()
        .then((c)=>{
            c.query(`CREATE DATABASE IF NOT EXISTS ${databaseq}`,[databaseq],function(error,results){
                if(error){
                    
                    reject(error);
                }
                
            resolve(c);
            
                
            })
        c.changeUser({database : databaseq});
        })
        .catch((e)=>{
            reject(e)
        });
    });
    
    return conn;
}
async function verify(username){
    let users = new Promise((resolve,reject)=>{
connecting()
.then((c)=>{
c.query('SHOW DATABASES',function(error,results,fields){
	if(error) throw error;
	let databases = new Array();
	let validate = {}
	for(let i=0; i<results.length; i++){
		databases.push(results[i].Database)
		
	}
	let i = 0;
	while(i<databases.length){
			
			if(username == databases[i]){
				validate.valid = true;
				validate.database = databases[i];
				//console.log('Found!')
				resolve(validate)
				break;
			}else{
				validate.valid = false;
				validate.database = null;
				//console.log('Checking...\t')
				
				i++;
				continue;
		    }
		    
	}
	reject(validate)
	c.release();
});
})
.catch((e)=>{
    reject(e);
})
});


return users;
}


module.exports = [db,verify];