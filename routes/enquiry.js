var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
console.log("enquiryform post");
var name=req.body.firstName;
 console.log(name);

});
/*Send Email through Express Mailer*/
/*
router.post('/enquiry', function (req, res, next) {
  var name=req.body.name;
  var email=req.body.mail;
  var mobile=req.body.mobile;
  var enquiry=req.body.message;	
  router.mailer.send('email', {
    to: 'shan2cog@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.  
    subject: 'Test Email', // REQUIRED. 
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables. 
  }, function (err) {
    if (err) {
      // handle error 
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    res.send('Email Sent');
  });
});
*/
module.exports = router;
