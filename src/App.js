import React, { useState } from 'react'
import './App.css';
import AppLayout from './components/AppLayout';
import { AuthContext } from './contexts/AuthContext';

function App() {

  const [auth, setAuth] = useState('')

  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <AppLayout />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
