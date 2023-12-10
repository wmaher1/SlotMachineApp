import React from 'react';
import { GoogleLogin } from 'react-google-login';

const SignIn = () => {
  const responseMessage = (response) => {
    console.log('Google login successful:', response);
  };

  const errorMessage = (error) => {
    console.error('Google login error:', error);
  };

  return (
    <div>
      <h2>Login Page</h2>
      {/* Use the GoogleLogin component */}
      <GoogleLogin
        clientId="554028928492-gvjnv380u7uv4va2pi492g1h9cua8bkk.apps.googleusercontent.com"
        onSuccess={responseMessage}
        onError={errorMessage}
      />
      {/* Add other login form elements if needed */}
    </div>
  );
};

export default SignIn;
