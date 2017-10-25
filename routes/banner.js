var express = require('express');
var router = express.Router();
const bannerfolder = './public/images/banners';
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readdir(bannerfolder, (err, files) => {    
  var banners = [];
  files.forEach(file => {
    banners.push("images/banners/"+file);
    console.log(file);
  });
  res.send(banners);
})
});

module.exports = router;
