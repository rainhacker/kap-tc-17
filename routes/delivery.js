var express = require('express');
var router = express.Router();
var http = require('http');

var request = require('request');

var url = 'https://www.delivery.com/api/data/search?search_type=alcohol&address=1006+Avenue+of+the+Americas,10018&order_time=ASAP&order_type=delivery&client_id=YzczMWQzMGYzNDg4NjM5YjVmYWJmMzhiNDU0MjA5YzI5';

	router.get('/', function(req, res, next) {

		request.get(url, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        var respp = JSON.parse(body);
	        console.log(respp.data.categories);
	        console.log('-------------');
	        console.log(body);
	        res.render('index', { title:  body});
	     }
	});
});

module.exports = router;






