'use strict';

var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap
var watson = require('watson-developer-cloud');
var vcapServices = require('vcap_services');
var extend = (extend = require('util')._extend);

// another endpoint for the text to speech service

// For local development, replace username and password or set env properties
var ttsConfig = extend(
    {
        version: 'v1',
        url: 'https://stream.watsonplatform.net/text-to-speech/api',
        username: process.env.TTS_USERNAME || 'bf47d3a1-97c4-4fc3-bac4-d3ce472acf01',
        password: process.env.TTS_PASSWORD || 'CqopFLJ46wKr'
    },
    vcapServices.getCredentials('text_to_speech')
);

var ttsAuthService = watson.authorization(ttsConfig);

router.get('/token', function(req, res) {
    ttsAuthService.getToken({ url: ttsConfig.url }, function(err, token) {
        if (err) {
            console.log('Error retrieving token: ', err);
            res.status(500).send('Error retrieving token');
            return;
        }
        res.send(token);
    });
});

module.exports = router;