import React from 'react';

export default class LoginButton extends React.Component {
  render() {
    var auth_link = 'http://accounts.spotify.com/authorize',
        client_id = process.env.CLIENT_ID,
        redirect_uri = process.env.REDIRECT_URI,
        scope = encodeURIComponent('user-read-email user-top-read playlist-modify-public user-read-currently-playing user-read-recently-played'),
        response_type = 'code',
        login_link = `${auth_link}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}`;
    return(
      <div className='login'>
        <div className='content'>
          <h2>Audio<br/>cAUlDrOn</h2>
          <p>
            Provide up to 5 different artists and/or genres and we will give you back a unique playlist!
          </p>
          <div className='login-btn'><a href={login_link}>Get Started</a></div>
        </div>
      </div>
    )
  }
}
