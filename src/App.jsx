import React, { useState } from "react";
import Header from "./Components/Header";
import Login from "./Components/Login";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <Header />
      {!isLoggedIn && <Login onLogin={handleLogin} />}
    </div>
  );
};

export default App;
