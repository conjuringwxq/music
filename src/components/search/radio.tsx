import React from 'react';
import { List, Row, Col } from 'antd';
import styled from 'styled-components';
import { Avatar, Text, Intro, SearchItemProps } from '@/pages/search';

const ListItem = styled(List.Item)`
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #f2f2f3;
  }
`;

const ListItemContent = styled(Row)`
  width: 100%;
`;

export const SearchRadio: React.FC<SearchItemProps> = (props) => {
  const { loading, data } = props;

  return (
    <>
      <Text>主播电台</Text>
      <br />
      <br />
      <List
        loading={loading}
        dataSource={data}
        pagination={false}
        renderItem={(item) => (
          <ListItem>
            <ListItemContent align="middle">
              <Col span={16}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={require('@/assets/error.png')}
                      shape="square"
                      size={60}
                      onLoad={(event: any) => {
                        event.target.src = item.picUrl;
                      }}
                    />
                  }
                  title={<Text>{item.name}</Text>}
                />
              </Col>
              <Col span={8}>
                <Intro>by {item.dj.nickname}</Intro>
              </Col>
            </ListItemContent>
          </ListItem>
        )}
      />
    </>
  );
};
