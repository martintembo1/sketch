async function auth(){
   let data = new FormData();
    if((localStorage['sketchUser']) && (localStorage['sketchPass'])){
        let name = localStorage['sketchUser'];
        let pass = localStorage['sketchPass'];
        let form = new FormData();
        form.set('name',name);
        form.set('pass',pass);
        await request('post','/resume',form)
        .then((c)=>{
            header.classList.remove('none');
            root.innerHTML = c
        })
        .catch((e)=>{
            alert(e)
        })
        .catch((n)=>{
            alert(n)
        });
    }else{
    await request('get','/login')
    .then((c)=>{
        header.classList.add('none');
        root.innerHTML = c;
        
})
    .catch((e)=>{
    alert(e)
})
}
}
auth();