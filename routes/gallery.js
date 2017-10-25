var express = require('express');
var router = express.Router();
const galleryfolder = './public/images/gallery';
var fs = require('fs');

/* GET users listing. */
router.get('/', function (req, res, next) {

  var gallery = {};
  var subfolders = fs.readdirSync(galleryfolder);
   for (var j = 0; j < subfolders.length; j++) {
      console.log(subfolders[j]);
      var files = fs.readdirSync(galleryfolder + "/" + subfolders[j]);
      var filearray = [];
      for (var i = 0; i < files.length; i++) {
          var filepath = "/images/gallery" + "/" + subfolders[j] + "/" + files[i];
          filearray.push(filepath);
      }
      gallery[subfolders[j]] = filearray;
   }
   res.send(gallery);
  });

module.exports = router;
