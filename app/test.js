const mysql = require('mysql');

let config = {
	host: 'localhost',
	user: 'root',
	password: ''
}

async function connect(){

	return new Promise((resolve,reject)=>{
		let conn = mysql.createPool(config);
		//console.log(conn)
		conn.getConnection(function(error,connection){
			if(error){
				console.log('Retrying to connect')
				reject(error);
			}
			//console.log('Connected!')
			resolve(connection);
		});
		conn.on('error',function(error){
			console.log('AN ERROR OCCURED!')
			console.log(error)
		})
	});
}

function establishConnection(){
	let conn = connect();
	conn.then((c)=>{
		console.log('Connected!')
		
	})
	.catch((e)=>{
		console.log('Retrying to connect')
		setTimeout(function(){
			connect()
			.then((c)=>{
				console.log('Connected!')
			})
			.catch((e)=>{
				console.log('Connection error');
			});
		},1000);
		setTimeout(function(){
			connect()
			.then((c)=>{
				console.log('Connected!')
			})
			.catch((e)=>{
				console.log('Connection Error')
			})
		},2000);
		setTimeout(function(){
			connect()
			.then((c)=>{
				console.log('Connected!')
			})
			.catch((e)=>{
				console.log('Connection Error')
			})
		},10000);
	});
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
				resolve(state);
				console.log('connected')
				clearInterval(retry);
			})
			.catch((e)=>{
				//console.log(e)
				reject('Connection Error');
				
			});
		},1000);
	});
	

	return status;
}


//establishConnection();
connecting()
.then((c)=>{
	c.query('INSERT INTO admin(name);',function(error,results){
		if(error) throw error;
		console.log(results)
	})
})
.catch((e)=>{
	
})

