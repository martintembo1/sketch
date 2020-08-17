const moult = require("moult");
const db = require('./models');
const app = moult.app('sketch-web')
const ejs = require('ejs');
app.set("404",(req,res,rep)=>{
	
    res.redirect("/");
});



//app.set('/auth',auth.login);
app.use(moult.static({ host:"public"}));
app.use(moult.multipart())
app.use(moult.cookies());
app.use(moult.sessions({save:true,expires:2,json:true,path:"/"}));
//app.use(ejs())
app.get('/',(req,res,rep)=>{
    //res.session('KEY')
    data = {
        'toolbartitle':'SKETCH - Selling Services'
    }
    res.render('main',data);
});
app.post('/',(req,res,rep)=>{
    console.log(req.params);
    res.json(req.params);
});

app.get('/products',(req,res,rep)=>{
    let product = new db();
    product.all()
    .then((results)=>{
        for(let i=0; i<=results.length; i++){
            //console.log(results[i])
        }
        res.render('products',{'P':results})
    });
    
    //res.render('products',{})
});
app.post('/products',(req,res,rep)=>{
    console.log(req.params)
    res.redirect('/products')
});

app.post('/product',(req,res,rep)=>{
    let product = {}
    console.log(req.params)
    for(let k in req.params){
        product[k]=req.params[k]['buffer'].toString()
    }
    res.session('product',product)
    res.render('product',product);
});

app.post('/category',(req,res,rep)=>{
    category = {}
    for(let k in req.params){
        category[k] = req.params[k]['buffer'].toString();
    }
    console.log(category);
    res.json(category);
});

app.get('/order',(req,res,rep)=>{
    res.render('product',{})
});
app.post('/order',(req,res,rep)=>{
    console.log(req.params)
    res.json({'ORDER':'PRODUCT'})
});

app.get('/goods',(req,res,rep)=>{
    let products = {
        
    }
     let product = new db();
    product.all()
    .then((results)=>{
        for(let i=0; i<=results.length; i++){
            //console.log(results[i])
        }
        res.json(results);
    });
    //res.json(req.session)
});

app.routes()
.get('/feedback',(req,res,rep)=>{
    let feedback = {}
    for(let k in req.params){
        feedback[k] = req.params[k]['buffer'].toString();
    }
    console.log(feedback);
    res.json(feedback);
})
.post('/feedback',(req,res,rep)=>{
    console.log(req.params)
    
    res.redirect('/')
});
app.listen(3000);