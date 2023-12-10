import React from 'react';

const SignIn = () => {
 const handleSignInClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
 };

 return (
    <div>
      <h1>Please sign in:</h1>
      <button onClick={handleSignInClick}>Sign In</button>
    </div>
 );
};

export default SignIn;