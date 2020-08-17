const mysql = require('mysql');


const config = {
	host: 'localhost',
	user: 'root',
	password: ''
}
const conn = mysql.createConnection(config)
async function verify(username){
    let users = new Promise((resolve,reject)=>{

conn.query('SHOW DATABASES',function(error,results,fields){
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
				console.log('Found!')
				resolve(validate);
				break;
			}else{
				validate.valid = false;
				validate.database = null;
				console.log('Checking...\t')
				reject(validate);
				i++;
				continue;
		    }
		    
	}
	conn.end();
});
});

return users;
}

verify('josephine')
.then((c)=>{
	console.log(c);
})
.catch((e)=>{
	console.log(e);
})