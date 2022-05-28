import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import {Layout, Typography, Space } from 'antd';
import { Navbar, Exchanges, Homepage, Cryptocurrencies, News, CryptoDetails,Cryptocurrencies15 } from './components';
import './App.css';
import cors from 'cors'
function App() {

  return (
    <div className="App">
      <div className="navbar">
         <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
              <Routes>
                <Route exact path="/" element={<Homepage />}></Route>
                <Route exact path="/exchanges" element={<Exchanges />}></Route>
                <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />}></Route>
                <Route path="/cryptocurrencies/:coinId" element={<CryptoDetails />}></Route>
                <Route exact path="/news" element={<News />}></Route>


                {/* For using one route at two different locations
                                OR
                    Just simply chnage the navLink to in [:coinId] with [cryptocurrencies/:coinId] */}
                {/* {[':coinId','/cryptocurrencies/:coinId'].map((path) => (<Route path={path} element={<CryptoDetails />} ></Route>))} */}

              </Routes>
          </div>
        </Layout>
      <div className="footer">
        <Typography.Title level={5} style={{ color: 'white' , textAlign: 'center'}}>
          Cryptoverse <br/>
          All rights reserved
        </Typography.Title>
        <Space>
          <NavLink  to="/">Home</NavLink>
          <NavLink  to="/exchanges">Exchanges</NavLink>
          <NavLink  to="/news">News</NavLink>
        </Space>
      </div>
      </div>
    </div>
  );
}

export default App;
