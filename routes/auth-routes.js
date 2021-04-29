const AddressModel = require('../models/Address.model');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

const authRouter = require('express').Router();

authRouter.post('/login',(req, res, next)=>{
    
    User.findOne({email: req.body.email})
        .then((user)=>{
            if(user){
                console.log('>>> USER EXISTS');
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatching)=>{
                        if(isMatching){
                            req.session.userInfo = user;
                            req.app.locals.isUserLoggedIn = true;
                            res.redirect('/');
                        }
                        else {
                            res.redirect('/');
                            console.error('Login failed');
                        }

                    })
                    .catch((err)=>{
                        next(err);
                    });
            }

        })
        .catch((err)=>{
            next(err);
        });
    
});

authRouter.get('/signup',(req,res,next)=>{
    res.render('signup')
});
 

authRouter.post('/signup',(req,res,next)=>{
<<<<<<< HEAD
    const {email, password, confirmPW, street, houseNum, zipCode, city} = req.body;
    const address = {street, houseNum, zipCode, city};


    if(!email || !password || !confirmPW || !street || !houseNum || !zipCode || !city){
        res.render("signup", {msg: 'Please fill out all fields'});
=======
    const {email, password, confirmPW, firstname, lastname, street, houseNum, zipCode, city} = req.body;

    const address = {street, houseNum, zipCode, city};


    if(!email || !password || !confirmPW || !firstname || !lastname || !street || !houseNum || !zipCode || !city){
        res.render("signup", {msg: 'Fill up every input field'});
>>>>>>> 22141c28d8e925bc54638e18b7a9519bd7afd5a2
        return;
    }

    const re = /^[^@ ]+@[^@ ]+\.[^@ ]+$/;

    if (!re.test(String(email).toLowerCase())) {
<<<<<<< HEAD
        res.render("signup", {msg: 'Enter a valid Email'});
=======
        res.render("signup", {msg: 'Enter a valid email address.'});
>>>>>>> 22141c28d8e925bc54638e18b7a9519bd7afd5a2
        return;
    }

    const pwRe = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!pwRe.test(password)) {
<<<<<<< HEAD
        res.render("signup", {msg: 'Enter a valid password'});
=======
        res.render("signup", {msg: 'Enter a valid password.'});
>>>>>>> 22141c28d8e925bc54638e18b7a9519bd7afd5a2
        return;
    }
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);




    AddressModel.create(address)
        .then((newAddress)=>{
            return User.create({email, password: hash, firstname, lastname, address: newAddress._id, role: 'user'});                
        })
        .then((newUser)=>{
            console.log('>>> Created User: ' + newUser._id);
            res.redirect('/');
        })
        .catch((err)=>{next(err);});



});


module.exports = authRouter;