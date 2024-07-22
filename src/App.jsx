import React, { useState } from "react";
import Header from "./Components/Header";
import Login from "./Components/Login";
import News from './News/News'
import './App.css'
import Coins from './Components/Coins/Coins'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <Header />
      {!isLoggedIn && <Login onLogin={handleLogin} />}
      <Coins/>


<News/>

    </div>
  );
};

export default App
