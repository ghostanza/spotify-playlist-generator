var url = require('url'),
    request = require('request');

module.exports.tokenRequest = (code, type, res, req) => {
  var form;
  if(type === 'initial'){
    form = { code, grant_type: 'authorization_code', redirect_uri: process.env.REDIRECT_URI}
  }
  else if(type === 'refresh'){
    form = { refresh_token: code, grant_type: 'refresh_token' }
  }

  var options = {
    url: 'https://accounts.spotify.com/api/token',
    form,
    headers: {
      'Authorization': `Basic ${new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')}`
    },
    json: true
  };

  request.post(options, (err, response, body) => {
    var token = body.access_token,
        refresh_token = body.refresh_token,
        maxAge = body.expires_in,
        expiration = new Date(Number(new Date()) + (maxAge * 1000));
    res.cookie('token', token, { 'expires': expiration, httpOnly: false });
    if(refresh_token){ res.cookie('refresh', refresh_token, { httpOnly: false }); }
    if(type === 'initial'){
        res.redirect('/');
    }
    else{
      res.send({token, type: 'refresh'});
    }
  });
}
