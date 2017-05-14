var express = require('express');
var router = express.Router();

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

module.exports = router;
