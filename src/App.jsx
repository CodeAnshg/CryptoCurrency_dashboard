import React from "react";
import Header from "./Components/Header/Header";
import News from './Components/News/News';
import './App.css'
import { BrowserRouter as Router , Route, Routes } from "react-router-dom";
import Coins from './Components/Coins/Coins'
import Login from "./Components/Login/Login";
import CoinChart from "./Components/CoinChart/CoinChart";
import backgroundImage from '../src/assets/pexels-martabranco-1263324.jpg';

const App = () => {

  return (
    <div className="app-header">
      <Router>
      <Header />
      <div className="getStarted"></div>
        <div className="app-main">
          
          <Coins />
          <CoinChart />
          
        </div>
        <div className="getStarted"></div>
        <div className="app-News"><News /></div>
        <Routes>
          <Route path="/Login" Component={<Login/>}></Route>
        </Routes>
      </Router>
    </div>
    // <><Login/></>

  );
};

export default App;
