var css = $("link");
for(let i in css){
	
}
new Notification("SKETCH",{body:"Prices Reduced!"})
Notification.requestPermission(()=>{
	if(Notification.permission === "granted"){
		new Notification("SKETCH PRICES",{
			body:"Prices have been reduced",
			icon:""
		})
	}else if(Notification.permission === "denied"){
		alert(1)
	}else{
		alert(0)
	}
});

Notification.requestPermission().then((permission)=>{
	if(!("permission" in Notification)){
		alert("5","allowed")
	}else{
		alert("denied")
	}
})