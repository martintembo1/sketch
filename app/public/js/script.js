const aside = () =>{
    document.querySelector('.mobile-aside').classList.toggle('active');
    document.querySelector('.header').classList.toggle('w100');
    document.querySelector('.header').classList.toggle('r-20');
    document.querySelector('.header').classList.toggle('flx-rv');
    //document.querySelector('.main').classList.toggle('ml-100');
}


const category = (el=null,fs=null) =>{
    let cat = document.querySelector('.category');
    cat.classList.toggle('active')
    //cat.classList.toggle('')
    if(el){
        let par = document.querySelector('.recent-search');
        let c = document.createElement('a');
        c.setAttribute('class','bd-blue1 pd5 rd db m10 c-blue bg-ablue')
        c.setAttribute('href','#');
        c.setAttribute('data-link',`${el}`);
        c.textContent = el;
        par.prepend(c)
        let fs = new FormData();
        fs.set('category',`${el}`)
        
        request('post','/category',fs)
        .then((c)=>{
            
            alert(c)
            document.querySelector('.loader').classList.add('none');
        document.querySelector('.status').textContent = 'Searching...';
            
        })
        .catch((e)=>{
            
            alert(e)
            root.innerHTML = "";
        document.querySelector('.loader').classList.remove('none');
        document.querySelector('.status').textContent = `${e}`
            
        })
        
    }
}


window.onclick = async ev =>{
    if(ev.target.dataset.link){
        //ev.target.preventDefault();
        category(el=ev.target.dataset.link);
        
    }
}

const expandEL = (el) =>{
    //element.preventDefault();
    
    let detail = el.lastElementChild;
    
    detail.classList.toggle('none')
    
    //(classList.toggle('none');)
    
}

const sendFeedback = (el) =>{
    let data = el.previousElementSibling
    if(data.value != ""){
        let fs = new FormData()
        fs.set('feedback',data.value)
        fs.set('id',el.dataset.id)
        request('post','/feedback',fs)
        .then((c)=>{
            data.classList.add('none');
        })
        .catch((e)=>{
            data.value = 'Feedback not sent,please try again.'
        })
    }else{
        data.placeholder = 'No Values specified';
    }
}

const order = async (el) =>{
    let price = el.dataset.price;
    let name = el.dataset.name;
    let date = new Date();
    //let date.getDate();
    //let time = date;
    
    let product = {
        'PRICE':price,
        'NAME':name,
        'DATE':date
    }
    let fs = new FormData();
    for(let i in product){
        fs.set(i,product[i]);
    }
    
    request('post','/order',fs)
    .then((c)=>{
        el.textContent = 'Ordered';
        el.removeAttribute('onclick');
    })
    .catch((e)=>{
        el.textContent = 'failed';
    });
    
}

const product = async (el) =>{
    let items = el.dataset;
    let form = new FormData();
    for(let item in items){
        form.set(item,items[item]);
    }
    request('post','product',form)
    .then((c)=>{
        root.innerHTML = c;
    })
    .catch((e)=>{
        alert(e)
    });
}

const back = async () =>{
    request('get','/products')
    .then((c)=>{
        root.innerHTML = c;
        generate_goods();
    })
    .catch((e)=>{
        alert(e)
    });
}

async function generate_goods(){
    
    let line = document.querySelector('.line');
    let line2 = document.querySelector('.line-2');
    let line3 = document.querySelector('.line-3');
    let line4 = document.querySelector('.line-4');
    if(line != null){
    request('get','/goods')
    .then((c)=>{
       let data = JSON.parse(c);
       for(let i in data){
           let item = document.createElement('span');
           item.setAttribute('class','good bg-default dl tc  m5 rd pd5 w100');
           item.setAttribute('onclick','product(this);');
           let image = document.createElement('img');
           image.setAttribute('width','150px');
           image.setAttribute('height','150px');
           let b = document.createElement('br');
           let b2 = document.createElement('br');
           let star = document.createElement('i');
           star.setAttribute('class','icofont-star c-yellow');
           let name = document.createElement('span');
           name.setAttribute('class','p11 dl c-dark pd5')
           for(let k in data[i]){
               item.dataset[k] = data[i][k];
               image.setAttribute('src',data[i]['image']);
               name.textContent = data[i]['name'];
           }
           item.appendChild(image);
           item.appendChild(star);
           item.appendChild(name)
           if(line.childElementCount <= 8){
               line.appendChild(item);
           }else if(line2.childElementCount <= 8){
               line2.appendChild(item);
           }
           //line.childElementCount
       }
       /*for(let p in data[1]){
           alert(p)
       }*/
    })
    .catch((e)=>{
        
    });
    //line2.textContent = 'Loaded';
    }
}
//generate_goods()
//setTimeout('generate_goods();',000);


