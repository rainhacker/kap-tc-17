var express = require('express');
var router = express.Router();

//var map = new HashMap();

var server = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/v2t', function (req,res,next) {
    res.render('index', {title: "Hello World"});
})

router.get('/audio', function (req,res,next) {
    res.render('voiceip');
})

router.get('/uploadFile', function (req,res,next) {
    console.log(res)
})

router.post('/uploadFile', function (req,res,next) {
    uploadFile(req,res)
})


router.get('/voice2txt', function (req,res,next) {
    res.render('vxt');
})

router.get('/recommend', function (req,res,next) {
    res.render('recommend');
})

router.post('/recommend', function (req,res,next) {
    console.log('----------' + req);
    
    var lat = req.body.curr_lat;
    var lon = req.body.curr_long;
    var txt = req.body.txt;

    var arr = txt.split(",");


    console.log(req.url);
})

router.post('/order', function (req,res,next) {
    res.render('vxt');
})

function uploadFile(request, response) {
// parse a file upload
    var mime = require('mime');
    var formidable = require('formidable');
    var util = require('util');

    var form = new formidable.IncomingForm();

    var dir = !!process.platform.match(/^win/) ? '\\uploads\\' : '/uploads/';

    form.uploadDir = __dirname + dir;
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.maxFields = 1000;
    form.multiples = false;

    form.parse(request, function(err, fields, files) {
        var file = util.inspect(files);

        response.writeHead(200, getHeaders('Content-Type', 'application/json'));

        var fileName = file.split('path:')[1].split('\',')[0].split(dir)[1].toString().replace(/\\/g, '').replace(/\//g, '');
        var fileURL = 'http://localhost' + ':3000' + '/uploads/' + fileName;

        console.log('fileURL: ', fileURL);
        response.write(JSON.stringify({
            fileURL: fileURL
        }));
        response.end();
    });
}
function getHeaders(opt, val) {
    try {
        var headers = {};
        headers["Access-Control-Allow-Origin"] = "https://secure.seedocnow.com";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = true;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";

        if (opt) {
            headers[opt] = val;
        }

        return headers;
    } catch (e) {
        return {};
    }
}
module.exports = router;
