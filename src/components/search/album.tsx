import React from 'react';
import { List, Avatar, Row, Col } from 'antd';
import styled from 'styled-components';
import { SearchItemProps } from '@/pages/search';

const ListItem = styled(List.Item)`
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #f2f2f3;
  }
`;

const Text = styled.span`
  font-size: 12px;
  color: #333;
`;

const Intro = styled.span`
  font-size: 12px;
  color: #c9c9c9;
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
                  avatar={<Avatar src={item.picUrl} shape="square" size={60} />}
                  title={<Text>{item.name}</Text>}
                />
              </Col>
              <Col span={10}>
                <Text>{item.artist.name}</Text>
                {item.artist.alia.map((intro: any) => (
                  <Intro>{intro && `（${intro}）`}</Intro>
                ))}
              </Col>
            </ListItemContent>
          </ListItem>
        )}
      />
    </>
  );
};
