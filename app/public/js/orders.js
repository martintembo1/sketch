window.onclick = function(event) {
	
}
var orders = {
	"ITEM": {
		"PRICE":0,
		"ITEM":0
	}
}
const order = (e) =>{
	const stock = "stock";
	const stock_details = e.dataset;
	if(e.dataset.order === stock){
		for(let i in stock_details){
			for(let k in orders["ITEM"]){
				if(i === "item"){
					orders["ITEM"]["ITEM"] = stock_details[i]
				}else{
					orders["ITEM"]["PRICE"] = stock_details["price"]
				}
			}
		}
		
	}
}


const showOrders = (e) =>{
	for(let i in orders){
		for(let k in orders[i]){
			console.log(k,orders[i][k])
		}
	}
}