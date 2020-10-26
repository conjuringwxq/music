import React from 'react';
import { List, Row, Col } from 'antd';
import styled from 'styled-components';
import { SearchItemProps } from '@/pages/search';
import { Avatar, Text, Intro } from '@/components/style';

const ListItem = styled(List.Item)`
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #f2f2f3;
  }

  .signature {
    font-size: 12px;
    color: #c9c9c9;
  }
`;

const ListItemContent = styled(Row)`
  width: 100%;
`;

export const SearchPlayList: React.FC<SearchItemProps> = (props) => {
  const { loading, data } = props;

  return (
    <>
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
                        event.target.src = item.coverImgUrl;
                      }}
                    />
                  }
                  title={<Text>{item.name}</Text>}
                />
              </Col>
              <Col span={4}>
                <Intro>{item.trackCount}首</Intro>
              </Col>
              <Col span={4}>
                <Intro>by {item.creator.nickname}</Intro>
              </Col>
            </ListItemContent>
          </ListItem>
        )}
      />
    </>
  );
};
