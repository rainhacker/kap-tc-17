/**
 * Created by alan on 5/13/17.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;


var Clarifai = require('clarifai');

var app = new Clarifai.App(
    'eJ8GG7KGvHjBjw-JLFO8SBNylcTuQp7BPRL9V1Mt',
    'YTtvAffPvOqrrZV4ZOi_d22CsBfuxAcRd20vxPFh'
);



app.models.predict(Clarifai.GENERAL_MODEL, 'http://recolo.org/images/Sam.JPG').then(
    function(response) {
        console.log(JSON.stringify(response));
    },
    function(err) {
        console.error(err);
    }
);

;