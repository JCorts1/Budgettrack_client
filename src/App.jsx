import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import Expenditures from './Expenditures';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <div>
      {!token ? (
        <>
          <h1>Budget Tracker</h1>
          <Register />
          <Login setToken={setToken} />
        </>
      ) : (
        <>
          <h1>Welcome to Budget Tracker</h1>
          <Expenditures token={token} />
        </>
      )}
    </div>
  );
};

export default App;
