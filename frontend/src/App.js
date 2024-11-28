import React from 'react';
import './App.css';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Movies from './components/Movies'

function App() {
  return (
    <div className="App">
      {/* Header Section */}
      <header className="App-header">
        <div className="logo">NETFITZ</div>
        <div className="header-right">
          <button className="register-btn">Register</button>
          <span className="welcome-msg">Welcome, user</span>
        </div>
      </header>

      {/* Main Content Section */}
      <main>
        {/* Register Component */}
        <section className="register">
          <h2>Register</h2>
          <Register/>
        </section>

        {/* SignIn Component */}
        <section className="sign-in">
          <h2>Sign In</h2>
          <SignIn/>
        </section>
        <Movies/>
      </main>
    </div>
  );
}

export default App;
