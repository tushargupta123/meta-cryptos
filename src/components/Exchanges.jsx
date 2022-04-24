import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import Loader from './Loader';
import ExchangesData from './ExchangesData';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {

  return (
    <>
    <div className='exchange-data'>
      <Row className='exchange-heading'>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Coins</Col>
      </Row>
      <hr></hr>
      <Row >
        {ExchangesData.map((exchange) => (
           <Col span={24}>
               <Panel
               className='exchange-data'
                key={exchange.rank}
                showArrow={false}
                header={(  
                   <Row key={exchange.rank}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col> 
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.markets)}</Col>
                    <Col span={6}>{millify(exchange.coins)}</Col>
                   </Row> 
                    )}
              >
              </Panel> 
            </Col>
            
        ))}
       </Row> 
       <hr></hr> 
       </div>
    </>
  );
};

export default Exchanges;