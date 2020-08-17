const moult = require("moult");
const http = require('http')
const Auth = require('./auth')
const utils = require('./utils')
const Crypto = require('./utils');
const fs = require('fs');
const app = moult.app("sketch-admin");


//const Auth = require('./auth');


//const key = fs.readFileSync('utils/secrets.json');
//const keys = JSON.parse(key.toString());

let keys = {
    "key": "f6dc105326e037a4e1c4f7da6b7752594b99ac6647ccff4154f2abffdfc5f206"

}
let crypto = new Crypto(keys.key);


app.set("404", (req, res, rep)=>{

    res.render('404', {})
});

app.use(moult.static({
    host: "public"
}));
app.use(moult.multipart())
app.use(moult.cookies());
app.use(moult.sessions({
    save: true,
    expires: 31,
    json: true,
    path: "/"
}));
//app.use(ejs())

app.get('/', function(req, res, rep) {
    try {
        let u  = JSON.parse(req.cookies['sketchCurrent']);
           let saveUser ={ 
                                        fullname: crypto.decrypt(u.fullname),
                                        username: crypto.decrypt(u.sketchUser),
                                        myphone: crypto.decrypt(u.myphone),
                                        email: crypto.decrypt(u.email),
                                        location: u.state,
                                        bio: u.mybio,
                                        myphoto: u.picture
                                        
                                    }
        res.render('main', saveUser);
    } catch (e) {
        console.log('Not Set')
        res.render('main', {});
    }

});
app.post('/', function(req, res, rep) {
    let user;
    for (let k in req.params) {
        user[k] = req.params[k]['buffer'].toString();
    }

    res.redirect('/');
});
app.get('/resume', (req, res, rep)=>{

    res.json({})
});
app.post('/resume',async (req, res, rep)=>{

    let user = JSON.parse(req.cookies['sketch']);
    let username = crypto.decrypt(user.sketchUser);
    let auth = new Auth(username);
    if (req.cookies['sketchCurrent']) {
        await auth.user()
            .then((c)=>{
                let currentUser = JSON.stringify(c);
                res.cookie('sketchCurrent', currentUser);
                res.redirect('/dashboard');
            })
            .
        catch ((e)=> {
            console.log(e)
        });
    } else {
        res.redirect('/dashboard');
    }
    //res.redirect('/dashboard');
});
app.post('/logout', (req, res, rep)=>{
    let user = {}
    for (let k in req.params) {
        user[k] = req.params[k]['buffer'].toString();

    }

    /*
    let data = {
        name: crypto.decrypt(user['sketchUser'])
    }*/
    let savedUser = req.cookies['sketch'];
    let savedUserJson = JSON.parse(savedUser);
    let name = savedUserJson['sketchUser'];
    let pass = savedUserJson['sketchPass'];
    if ((crypto.decrypt(name) === crypto.decrypt(user['name'])) && (crypto.decrypt(pass) === crypto.decrypt(user['pass']))) {
        res.cookie('sketch', '');
        res.json({
            'logout': true
        });
    } else {
        res.json({
            'logout': false
        });
    }

});

app.routes()
    .get('/login', (req, res, rep)=>{

        res.render('user/login', {
            'title': 'Create Account',
            'link': '/create'
        });
    })
    .post('/login', (req, res, rep)=>{
        let qs = req.params['userAccount']['buffer'].toString();
        let qq = req.params['userPassword']['buffer'].toString();
        let user = {
            'name': crypto.encrypt(qs),
            'pass': crypto.encrypt(qq)
        }
        let auth = new Auth(crypto.decrypt(user.name));
        auth.login(user)
            .then((c)=> {
                let data2 = {
                    'sketchUser': user.name,
                    'sketchPass': user.pass
                }
                res.cookie('sketch', JSON.stringify(data2));
                req.cookies['sketch']
                res.json(data2)
            })
            .
        catch ((e)=>{

            res.json(e)
        });

        //res.json({'status':'OK'})
    })
    .get('/create', (req, res, rep)=>{

        res.render('user/join', {
            'title': 'Login',
            'link': '/login'
        });
    })
    .post('/create',async (req, res, rep)=>{
        let user = {}
        for (let k in req.params) {
            user[k] = req.params[k].buffer.toString();
        }
        if (user.password === user.verifyPassword) {
            let validation = {}
            Auth.existence(user.username)
                .then((c)=>{
                    Auth.create(user)
                        .then(async (c)=>{
                            res.cookie('sketch', JSON.stringify(c));
                                let auth = new Auth(user.username)
                              await  auth.user()
                                .then((u)=>{
                                    let saveUser ={ 
                                        fullname: crypto.decrypt(u.fullname),
                                        username: crypto.decrypt(u.sketchUser),
                                        myphone: crypto.decrypt(u.myphone),
                                        email: crypto.decrypt(u.email),
                                        location: u.state,
                                        bio: u.mybio,
                                        myphoto: u.picture
                                        
                                    }
                                res.cookie('sketchCurrent',JSON.stringify(saveUser));
                                })
                                .catch((err)=>{
                                    console.log(err)
                                });
                            res.json(c)

                        })
                        .
                    catch ((e)=>{
                        res.json({
                            'error': 'kaya'
                        });
                    });
                })
                .
            catch ((e)=>{
                validation.exists = true;
                res.json(validation);
            });
        } else {
            res.json({
                'pass': 'fail'
            })
        }
    })
    .get('/dashboard', (req, res, rep)=>{

        res.render('dashboard/dashboard', {})
    })
    .get('/profile', (req, res, rep)=>{
        let me = JSON.parse(req.cookies['sketchCurrent']);
        let user = {
            'fullname': crypto.decrypt(me.fullname),
            'username': crypto.decrypt(me.sketchUser),
            'myphone': crypto.decrypt(me.myphone),
            'email': crypto.decrypt(me.email),
            'location': me.state,
            'bio': me.bio,
            'myphoto': me.picture
        }
        console.log(user)
        res.render('dashboard/profile', user)
    })
    .post('/profile/update', (req, res, rep)=>{
        let link = {
            'link': 'images/default/me.png'
        }
        let user = {}
        for(let detail in req.params){
            if(req.params['myphoto']){
                user['photo'] == req.params['myPhoto'];
            }else{
                user[detail] = req.params[detail].buffer.toString();
            }
        }
        console.log(user);
        res.json(link)
    })
    .get('/admin/update', (req, res, rep)=>{
        
        res.render('user/update', {});
    })
    .post('/admin/update', (req, res, rep)=>{


        res.json({});
    })
    .get('/feedback', (req, res, rep)=>{

        res.render('dashboard/feedback', {})
    })
    .post('/feedback', (req, res, rep)=>{

        res.render('dashboard/settings', {})
    })
    .get('/policy', (req, res, rep)=>{

        res.render('dashboard/policy', {});
    })
    .get('/data', (req, res, rep)=>{

        res.render('dashboard/data', {})
    })
    .get('/settings', (req, res, rep)=>{

        res.render('dashboard/settings', {})
    })
    .get('/terms', (req, res, rep)=>{

        res.render('dashboard/terms', {})
    })
    .get('/color', (req, res, rep)=>{
        res.render('dashboard/color', {});
    })
    .post('/color', (req, res, rep)=>{
        res.json({
            'color': 'pink'
        });
    })
    .get('/stock', (req, res, rep)=>{
        res.render('dashboard/stock', {})
    })
    .post('/stock', (req, res, rep)=>{
        res.json({
            'status': 'added'
        })
    })
    .get('/about', (req, res, rep)=>{
        res.render('dashboard/about', {});
    })
    .get('/web',(req,res,rep)=>{
        let options = {
            host: 'localhost',
            path: '/',
            port: '3000'
        }
        var req = http.get(options,(response)=>{
            var bodyChunks = [];
            response.on('data',chunk=>{
                bodyChunks.push(chunk);
            });
            response.on('end',()=>{
                var body = Buffer.concat(bodyChunks);
                res.json({'app':body.toString()})
            })
        });
        req.on('error',e =>{
            console.log(e)
            res.json({'app':false})
        });
    });
app.listen(3001)