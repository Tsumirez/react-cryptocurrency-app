import React, { useState, useEffect } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

import demoImg from "../images/news.jpg";
import Loader from './Loader';


const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: newsList } = useGetNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (!newsList?.value) return <Loader />;

  return (
    <Row gutter={[16, 16]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurrency"></Option>
            {data?.data?.coins.map(coin => (<Option value={coin.name}>{coin.name}</Option>))}


          </Select>
        </Col>
      )}
      {newsList.value.map((news) => (
        <Col xs={24} sm={12} lg={8} key={1}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="norefferer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImg}
                  alt="news"
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0].image?.thumbnail?.contentUrl || demoImg} />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
