var express = require('express');
var router = express.Router();

router.get('/audio', function (req,res,next) {
    res.render('voiceip');
})

module.exports = router;
