var express = require('express');
var router = express.Router();

const eventsfile = './public/events.json';

/* GET users listing. */
router.get('/', function (req, res, next) {

    var fs = require('fs');
    var obj;
    fs.readFile(eventsfile, 'utf8', function (err, data) {
        if (err) throw err;
         var events = JSON.parse(data);
         res.send(events);
    });

    // var events = [
    //     {
    //         news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
    //         date: "24-08-2017"
    //     },
    //     {
    //         news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
    //         date: "26-08-2017"
    //     },
    //     {
    //         news: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
    //         date: "22-09-2017"
    //     }

    // ];
    // res.send(events);
});

module.exports = router;
