var express = require('express'),
    router = express.Router(),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    request = require('request'),
    auth_handler = require('../modules/auth_handler');

// API routes
router.get('/s/:endpoint', (req,res,next) => {
  var endpoint = req.params.endpoint || '';
    switch(endpoint){
      case 'callback':
        var code = req.query.code;
        auth_handler.tokenRequest(code, 'initial', res, req);
        break;
      case 'code':
        res.send("FETCHING THE CODE...")
        break;
      case 'token':
        var refresh = req.query.refresh;
        auth_handler.tokenRequest(refresh, 'refresh', res, req);
        break;
      default:
        //logger.log_404(req);
        res.status(404);
        res.send("CANNOT FIND ENDPOINT");
        break;
    }
})

// main app
router.get(['/'], (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../../public/index.html'));
});

module.exports = router;
