import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import Expenditures from './Expenditures';
import './styles/frontpage.css';

const App = () => {
  const [token, setToken] = useState('');
  const [activeForm, setActiveForm] = useState('login'); // New state to track active form

  return (
    <div className='landpage'>
      <div className='auth-form'>
        {!token ? (
          <>
            <h1>BudgetTrack</h1>
            {activeForm === 'register' ? (
              <Register setActiveForm={setActiveForm} setToken={setToken} />
            ) : (
              <Login setActiveForm={setActiveForm} setToken={setToken} />
            )}
            <button className='main-button' onClick={() => setActiveForm(activeForm === 'login' ? 'register' : 'login')}>
            {activeForm === 'login' ? 'Register' : 'Login'}
            </button>
          </>
        ) : (
          <>
            <h1>Welcome to Budget Tracker</h1>
            <Expenditures token={token} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
