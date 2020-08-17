const aside = () =>{
    document.querySelector('.mobile-aside').classList.toggle('active');
    document.querySelector('.header').classList.toggle('w100');
    document.querySelector('.header').classList.toggle('r-20');
    document.querySelector('.header').classList.toggle('flx-rv');
    //document.querySelector('.main').classList.toggle('ml-100');
}


const category = async (el=null,fs=null) =>{
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
        document.querySelector('.loader').classList.toggle('none');
        document.querySelector('.status').textContent = 'searching'
    }
}


window.onclick = async ev =>{
    if(ev.target.dataset.link){
        //ev.target.preventDefault();
        category(ev.target.dataset.link);
        
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
        request('post','/product_feedback',data.value)
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

const order = (el) =>{
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
    request('post','/order',product)
    .then((c)=>{
        el.textContent = 'Ordered';
    })
    .catch((e)=>{
        el.textContent = 'failed';
    });
}