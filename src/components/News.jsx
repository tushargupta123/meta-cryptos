import React, {useState, useEffect} from 'react';
import { Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';

const { Text, Title} = Typography;
const { Option } = Select;

const News = () => {
  const [cryptoNews, setCryptoNews ] = useState([]);

  const fetchNews =  async() => {
    const url = 'https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=5a4d5991089d406e8117d408dc2cfead';
    let data = await fetch(url);
    let response = await data.json();
    setCryptoNews(response.articles);
   }
   console.log(cryptoNews);
   useEffect(() =>{
     fetchNews();
   },[]);

   const defaultImage = 'https://i.morioh.com/200702/b3154d32.jpg';

  return (
    
    <Row gutter={[24, 24]} >
      {cryptoNews.map((news) =>{return(
        <Col xs={24} sm={12} lg={7} >
          <Card hoverable className="news-card">
            <a href={news.url} target='_blank' rel="noreferrer">
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{news.title}</Title>
                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.urlToImage || defaultImage} alt="news" />
              </div>
              <p>
                {news.description > 100 ? `${news.description.substring(0,100)} . . .` : news.description}
              </p>
              <div className='provider-container'>
                <div>
                  <Text>- {news.source.name}</Text>
                </div>
                <Text>{moment(news.publishedAt).startOf('seconds').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
)})}
    </Row>
  )
}

export default News