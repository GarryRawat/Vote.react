import logo from './logo.svg';
import './App.css';
import React from 'react';


import Home from './component/Home';
import Login from './component/Login';
import VoteNow from './component/VoteNow';


import { BrowserRouter, Route, Routes, } from 'react-router-dom';






function App() {
  return (

    <div style={{ "backgroundColor": "#F778A1" }}>
      <div className="row" >
        <div className="col-md-3">
          <img src="1.jpg" height="200px" width="100%" border="4px solid black" />
        </div>
        <div className='col-md-1'></div>
        <div className="col-md-6" style={{ "border": "5px solid black", "padding": "33px", "textAlign": 'center', "backgroundColor": "#FFFF33" }}>
          <h1><b>Online Voting System</b></h1><hr />
          <p style={{ "backgroundColor": "violet", "color": "black" }}> “Democracy is based upon the conviction there are extraordinary possibilities in ordinary people.” - Harry Emerson Fosdick</p>

        </div>




      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/VoteNow" element={<VoteNow />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App