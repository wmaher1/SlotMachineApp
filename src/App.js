import './App.css';
import './slot-machine.css';
import React, { useState } from 'react';
import SlotMachine from './slotMachine';
import SignIn from './SignIn';

const App = () => {
  const [user, setUser] = useState(null);

  const handleSignIn = (userInfo) => {
    setUser(userInfo);
  };


  return (
    <div>
      {!user ? (
        <SignIn onSignIn={handleSignIn} />
      ) : (
        <SlotMachine user={user} />
      )}
    </div>
  );
};

export default App;