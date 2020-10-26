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
`;

const ListItemContent = styled(Row)`
  width: 100%;
`;

export const SearchAlbum: React.FC<SearchItemProps> = (props) => {
  const { loading, data } = props;

  return (
    <>
      <List
        loading={loading}
        dataSource={data}
        pagination={false}
        renderItem={(item) => (
          <ListItem>
            <ListItemContent>
              <Col span={14}>
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
              <Col span={10}>
                <Text>{item.artist.name}</Text>
                {item.artist.alia.map((intro: any, index: number) => (
                  <Intro key={index}>{intro && `（${intro}）`}</Intro>
                ))}
              </Col>
            </ListItemContent>
          </ListItem>
        )}
      />
    </>
  );
};
