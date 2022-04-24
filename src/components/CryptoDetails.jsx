import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined, CalendarOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery } from '../services/cryptoApi';
import { useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select;


const CryptoDetails = () => {
  var { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data: cryptoDetails, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory} = useGetCryptoHistoryQuery({coinId, timePeriod})
  var coinNum = coinId -1;
  console.log(cryptoDetails);
  // console.log(cryptoDetails[`${ coinNum }`].name);

  if(isFetching) return <Loader/>;

  const time = ['1d', '7d', '30d', '365d'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails[`${ coinNum }`]?.price && millify(cryptoDetails[`${ coinNum }`]?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails[`${ coinNum }`]?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails[`${ coinNum }`]?.ytd?.volume && millify(cryptoDetails[`${ coinNum }`]?.ytd?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails[`${ coinNum }`]?.market_cap && millify(cryptoDetails[`${ coinNum }`]?.market_cap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails[`${ coinNum }`]?.high && millify(cryptoDetails[`${ coinNum }`]?.high)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails[`${ coinNum }`]?.num_pairs, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails[`${ coinNum }`]?.num_exchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails[`${ coinNum }`]?.circulating_supply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails[`${ coinNum }`]?.max_supply && millify(cryptoDetails[`${ coinNum }`]?.max_supply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails[`${ coinNum }`]?.circulating_supply && millify(cryptoDetails[`${ coinNum }`]?.circulating_supply)}`, icon: <ExclamationCircleOutlined /> },
  ];

  const historyStats = [
    { title: 'Market Change', value: `${cryptoDetails[`${ coinNum }`]?.[`${timePeriod}`]?.market_cap_change_pct} %`, icon: <FundOutlined /> },
    { title: 'Price Change', value: `${cryptoDetails[`${ coinNum }`]?.[`${timePeriod}`]?.price_change_pct} %`, icon: <DollarCircleOutlined /> },
    { title: 'Volume', value: `$  ${millify(cryptoDetails[`${ coinNum }`]?.[`${timePeriod}`]?.volume)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Volume Change', value: `${cryptoDetails[`${ coinNum }`]?.[`${timePeriod}`]?.volume_change_pct} %`, icon: <ThunderboltOutlined /> },
    { title: 'First Trade', value: `${(new Date(cryptoDetails[`${ coinNum }`]?.first_trade)).toDateString()}`, icon: <CalendarOutlined /> },
  ]

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className='coin-name'>
           {cryptoDetails[`${coinNum}`].name}({cryptoDetails[`${coinNum}`].id}) Price 
        </Title>
        <p>
           {cryptoDetails[`${coinNum}`].name} live price in US dollars. 
          View value statistics, market cap and supply 
        </p>
      </Col>
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
               {cryptoDetails[`${coinNum}`].name} Value Statistics 
            </Title>
            <p>
               An overview showing the statistics of {cryptoDetails[`${coinNum}`].name} 
            </p>
          </Col>
          {stats.map(({icon,title,value}) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Statistics
            </Title>
            <p>
              An overview showing the statistics of all cryptocurrencies
            </p>
          </Col>
          {genericStats.map(({icon,title,value}) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
               {cryptoDetails[`${coinNum}`].name} History 
            </Title>
            <Select
        defaultValue='7d'
        className='select-timeperiod'
        placeholder='Select Time Period'
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
          </Col>
          {historyStats.map(({icon,title,value}) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
             What is {cryptoDetails[`${coinNum}`].name}? 
            <p id='description' >A cryptocurrency, crypto-currency, or crypto is a digital currency designed to work as a medium of exchange through a computer network that is not reliant on any central authority, such as a government or bank, to uphold or maintain it.
<br></br>
Individual coin ownership records are stored in a digital ledger, which is a computerized database using strong cryptography to secure transaction records, to control the creation of additional coins, and to verify the transfer of coin ownership. Despite their name, cryptocurrencies are not necessarily considered to be currencies in the traditional sense and while varying categorical treatments have been applied to them, including classification as commodities, securities, as well as currencies, cryptocurrencies are generally viewed as a distinct asset class in practice. Some crypto schemes use validators to maintain the cryptocurrency. In a proof-of-stake model, owners put up their tokens as collateral. In return, they get authority over the token in proportion to the amount they stake. Generally, these token stakers get additional ownership in the token over time via network fees, newly minted tokens or other such reward mechanisms.
<br></br>
Cryptocurrency does not exist in physical form (like paper money) and is typically not issued by a central authority. Cryptocurrencies typically use decentralized control as opposed to a central bank digital currency (CBDC). When a cryptocurrency is minted or created prior to issuance or issued by a single issuer, it is generally considered centralized. When implemented with decentralized control, each cryptocurrency works through distributed ledger technology, typically a blockchain, that serves as a public financial transaction database.
<br></br>
A cryptocurrency is a tradable digital asset or digital form of money, built on blockchain technology that only exists online. Cryptocurrencies use encryption to authenticate and protect transactions, hence their name. There are currently over a thousand different cryptocurrencies in the world.
</p>
          </Title>
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
             {cryptoDetails[`${coinNum}`].name} Links 
            <Row className='coin-link'>
             <a href={`https://en.wikipedia.org/wiki/${cryptoDetails[`${coinNum}`].name}#:~:text=${cryptoDetails[`${coinNum}`].name}%20is%20a%20permissionless%2C%20non-hierarchical%20network%20of%20computers,if%20the%20block%20is%20to%20be%20considered%20valid.`} target='_blank'>Wikipedia</a> 
            </Row>
            <Row className='coin-link'>
             <a href={`https://github.com/${cryptoDetails[`${coinNum}`].name}/`} target='_blank'>Github</a> 
            </Row>
            <Row className='coin-link'>
             <a href={`https://www.reddit.com/r/${cryptoDetails[`${coinNum}`].name}/`} target='_blank'>Reddit</a> 
            </Row>
            <Row className='coin-link'>
             <a href={`https://www.blockchain.com/explorer?view=${(cryptoDetails[`${coinNum}`].id).toLowerCase()}`} target='_blank'>Explorer</a> 
            </Row>
            <Row className='coin-link'>
             <a href={`https://${cryptoDetails[`${coinNum}`].name}.org/`} target='_blank'>Official Page</a> 
            </Row>
            <Row className='coin-link'>
             <a href={`https://${cryptoDetails[`${coinNum}`].name}.org/whitepaper`} target='_blank'>Whitepaper</a> 
            </Row>
          </Title>
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails