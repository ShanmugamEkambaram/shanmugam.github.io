var express = require('express');
var router = express.Router();
const bannerfolder = './public/images/banners';
var fs = require('fs');
const eventsfile = './public/events.json';
const galleryfolder = './public/images/gallery';
var path = require('path')
var multer = require('multer');

var bannerstorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, bannerfolder)
  },
  filename: function (req, file, callback) {
    callback(null, "banner" + '-' + Date.now() + path.extname(file.originalname))
  }
})

var gallerystorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, galleryfolder)
  },
  filename: function (req, file, callback) {
    callback(null, "gallery" + '-' + Date.now() + path.extname(file.originalname))
  }
})

router.get('/banners', function (req, res, next) {
  fs.readdir(bannerfolder, (err, files) => {
    var banners = [];
    files.forEach(file => {
      banners.push("images/banners/" + file);
      //console.log(file);
    });
    res.send(banners);
  })
});
router.get('/events', function (req, res, next) {
  var fs = require('fs');
  var obj;
  fs.readFile(eventsfile, 'utf8', function (err, data) {
    if (err) throw err;
    var events = JSON.parse(data);
    res.send(events);
  });
});

router.post('/events', function (req, res, next) {
  console.log(req.body);  
  fs.writeFileSync('./public/events.json', JSON.stringify(req.body) , 'utf-8'); 
  return res.status(200).send("post success");
});

router.get('/gallery', function (req, res, next) {
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

router.post('/upload', function (req, res, next) {
  var upload;
  var action = req.query.action;
  if (action == "banner") {
    upload = multer({
      storage: bannerstorage
    }).single('fileToUpload');
  }
  else {
    upload = multer({
      storage:  multer.diskStorage({
      destination: function (req, file, callback) {
          callback(null, './public/images/'+action)
        },
        filename: function (req, file, callback) {
          callback(null, "gallery" + '-' + Date.now() + path.extname(file.originalname))
        }
      })
    }).single('fileToUpload');
  }
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return  res.status(500).send(err);
    }
    return res.status(200).send("uload success");
  });

});

router.delete('/deletefile', function (req, res, next) {
  var fp = appRoot + "/public/"+ req.query.filepath;
  fs.unlink(fp, function(err){
      if (err) {
        return res.status(500).send("delete failed");
      }
      else {
        return res.status(200).send("delete success");
      }
  });
});
module.exports = router;
