var express = require('express');
var router = express.Router();

var HashMap = require('hashmap');
var request = require('request');

var foods = new HashMap();
foods.set("mexican","true");
foods.set("indian","true");
foods.set("pizza","true");
foods.set("moroccan","true");
foods.set("mediterranean","true");
foods.set("chinese","true");
foods.set("japanese","true");
foods.set("korean","true");
foods.set("australian","true");
foods.set("american","true");

var alcohol = new HashMap();
alcohol.set("beer","true");
alcohol.set("wine","true");
alcohol.set("liquor","true");


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
    var lat = req.body.curr_lat;
    var lon = req.body.curr_long;

    var txt = req.body.comment;

    var arr = txt.split(" ");
    var dollarVal ="";
    var cusines = [];
    var alcVal = "";
    arr.forEach(function(value){
        value = value.trim().toLowerCase();
        if(value.startsWith('$')) {
            if(value <= 10) dollarVal = 1;
            else if(value <= 20) dollarVal = 2;
            else if(value <= 30) dollarVal = 3;
            else if(value <= 50) dollarVal = 4;
            else dollarVal = 5;
        } else if(foods.has(value)) {
            cusines.push(value);
        } else if(alcohol.has(value)) {
            alcVal = value;        
        }

    //long lat to address
    var revgeocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon;
    console.log('getting address ' + revgeocodeUrl);
    var addr = "";
    request.get(revgeocodeUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                var respp = JSON.parse(body);    
            addr = respp.results[0].formatted_address;            
            console.log('address: '+addr);
             //alcohol    
        var alcUrl = 'https://www.delivery.com/api/data/search?search_type=alcohol&address=' + addr 
           + '&section=' + alcVal
           +'&filter_price=' + dollarVal
           +'&order_time=ASAP&order_type=delivery&client_id=YzczMWQzMGYzNDg4NjM5YjVmYWJmMzhiNDU0MjA5YzI5';

        request.get(alcUrl, function (error, response, body) {
            console.log('alcUrl:' + alcUrl);   
            if (!error && response.statusCode == 200) {
                var respp = JSON.parse(body);
                console.log(body);
             }
        });   

         }
    });   
        

       
        //food...


    });

    console.log(cusines);
    console.log(dollarVal);

    console.log(req.url);
    res.render('index');
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
