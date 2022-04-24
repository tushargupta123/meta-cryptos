import React, { useState, useEffect} from 'react';
import millify from 'millify';
import { NavLink } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies15 = ({ simplified }) => {
  const {data: cryptosList, isFetching} = useGetCryptosQuery();
  
  if (isFetching) return  <Loader />;

  return (
    <>
  <Row gutter={[32,32]} className="crypto-card-conatiner">
    {cryptosList.slice(0,15).map((items) => {return(
        <Col xs={24} sm={12} lg={7} className="crypto-card" >
          <NavLink key={items.rank} to={`cryptocurrencies/${items.rank}`}>
             <Card title={`${items.rank}. ${items.name}`} extra={<img className="crypto-image" src={items.logo_url} />} hoverable >
               <p>Price : Rs. {millify(items.price*76)}</p>
              <p>Market Cap : {millify(items.market_cap)}</p>
              <p>Daily Change : {millify(items.ytd.price_change_pct)}%</p> 
            </Card> 
          </NavLink>
          </Col>
          ) })}
          </Row>
    </>
  )
}

export default Cryptocurrencies15