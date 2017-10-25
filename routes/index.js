var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var flash = require('connect-flash');


/*To enable Session*/
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var sess = {
  secret: 'shan123@',
  cookie: {},
  saveUninitialized: false,
  resave: false
}

router.use(session(sess));
router.use(flash());


/*Function to check for Authorized user*/
function checkAuth(req, res, next) {
  if (!req.session.username) {
    res.redirect('/login');
  } else {
    next();
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/home', { navactive: 'home' });
});

router.get('/about', function(req, res, next) {
  res.render('pages/about', { navactive: 'about' });
});

router.get('/academic', function(req, res, next) {
  res.render('pages/academic', { navactive: 'academic' });
});

router.get('/activities', function(req, res, next) {
  res.render('pages/activities', { navactive: 'activities' });
});

router.get('/infrastructure', function(req, res, next) {
  res.render('pages/infrastructure', { navactive: 'infrastructure' });
});

router.get('/gallery', function(req, res, next) {
  res.render('pages/gallery', { navactive: 'gallery' });
});

router.get('/enquiry', function(req, res, next) {
  res.render('pages/enquiry', { result : 2 });
});


router.post('/enquiry', function (req, res, next) {
  console.log("enquiryform post");
  var name = req.body.firstName;
  var message =req.body.query;
  var email =req.body.email;
  var mobile =req.body.telephone;
  /*console.log(name);

});*/
var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: "drbgroupinc@gmail.com",
       pass: "drbgroup*3"
   }
});

smtpTransport.sendMail({  //email options
   from: "Appxel <aramesh@aapxel.com>", // sender address.  Must be the same as authenticated user if using GMail.
   to: "Receiver Name <shanmugamekambaram16@gmail.com>", // receiver
   subject: "Enquiry", // subject
   text:  name +'\n' + mobile +'\n' + message// body
}, function(error, response ,success){  //callback
   if(error){
        //req.flash("msg","Error Occured");
        res.render('pages/enquiry', { result: 1 });
  
  }
  else{
        //req.flash("msg", "Data updated successfully");
        res.render('pages/enquiry', { result: 0 });
        }
   
   smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
});
});



router.get('/contact', function(req, res, next) {
  res.render('pages/contact', { navactive: 'contact' });
});

router.get('/manage',checkAuth, function(req, res, next) {
  res.render('pages/manage', { navactive: 'login' });
});
router.get('/login', function(req, res, next) {
  res.render('pages/login', { navactive: 'login' });
});

router.post('/login', function (req, res) {
  var post = req.body;
  if (post.username === 'admin' && post.password === 'efmhss') {
    req.session.username = 'admin';
    res.redirect('/manage');
  } else {
    res.redirect('/login');
  }
});

router.get('/logout', function (req, res) {
  delete req.session.username;
  res.redirect('http://localhost:3100');
});   


module.exports = router;
