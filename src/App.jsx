import React from "react";
import Header from "./Components/Header/Header";
import News from './News/News';
import './App.css'
import { BrowserRouter as Router , Route, Routes } from "react-router-dom";
import Coins from './Components/Coins/Coins'
import Login from "./Components/Login/Login";

const App = () => {
  
  return (
    <Router>
      <Header/>
      <Coins/>
      <News/>
      <Routes>
        <Route path="/Login" element={<Login/>}/>
      </Routes>
    </Router>
  );
};

export default App;
