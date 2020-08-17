fetch('http://localhost:3000')
.then((c)=>{
    for(let k in c){
       // alert(c[k])
    }
    //alert(c['text']())
})
.catch((e)=>{
    alert(e)
})

function auth(){
   // let form = document.getElementById('sss');
    //let data = new FormData(form);
    request('post','/products')
    .then((c)=>{
     root.innerHTML = c;
     generate_goods();
})
    .catch((e)=>{
    
})
}
//setTimeout('auth();',1000)
auth();