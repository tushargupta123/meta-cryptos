import React from 'react';
import { Typography, Row, Col, Statistic } from 'antd';
import { NavLink } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies15, News10 } from '../components';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery();

  if(isFetching) return <Loader/>;

  function conversion (labelValue) {

    // Twelve Zeroes fro Trillion
    return Math.abs(Number(labelValue)) >= 1.0e+12      // xe+y => x X 10^y
                                                        // Math.abs => gives always absolute value , i.e , Mat.abs(-2) = 2
    
    ? (Math.abs(Number(labelValue)) / 1.0e+12).toFixed(2) + "T"        // toFixed => numbers after decimal

    // Nine Zeroes for Billions
    : Math.abs(Number(labelValue)) >= 1.0e+9

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

    : Math.abs(Number(labelValue));

}

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={data.length} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={data[0].num_exchanges} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={conversion(data[0].market_cap)} /></Col>
        <Col span={12}><Statistic title="Total 24th Volume" value={conversion(data[0].ytd.volume)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={conversion(data[0].num_pairs)} /></Col>
      </Row>
      <div className="home-heading-container">
      <Title level={2} className="home-title">Top 15 Cryptocurrencies in the world &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<NavLink to="/cryptocurrencies" className="show-more">Show more</NavLink></Title>
      </div>
      <Cryptocurrencies15 simplified />
      <div className="home-heading-container">
      <Title level={2} className="home-title">Latest Crypto News&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<NavLink to="/news" className="show-more">Show more</NavLink></Title>
      </div>
      <News10 simplified />
    </>
  )
}

export default Homepage