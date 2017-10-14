import React from 'react';

export default class LoginButton extends React.Component {
  render() {
    var auth_link = 'http://accounts.spotify.com/authorize',
        client_id = 'b50d1c31d01d487cbff136f628ddf57d',
        redirect_uri = 'http://localhost:8080/s/callback',
        scope = encodeURIComponent('user-read-email user-top-read playlist-modify-public user-read-currently-playing user-read-recently-played'),
        response_type = 'code',
        login_link = `${auth_link}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}`;
    return(
      <div className='login-btn-wrap'>
        <a href={login_link} className='login-btn'>Get Started</a>
      </div>
    )
  }
}
