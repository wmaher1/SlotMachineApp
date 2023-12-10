import React from 'react';
import { GoogleLogin } from 'react-google-login';

const SignIn = ({ onSignIn }) => {
  const responseGoogle = (response) => {
    if (response.profileObj) {
      onSignIn(response.profileObj);
    }
  };

  return (
    <div>
      <h2>Sign In with Google</h2>
      <GoogleLogin
        clientId="554028928492-gvjnv380u7uv4va2pi492g1h9cua8bkk.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default SignIn;
