import React from 'react';
import { List, Row, Col } from 'antd';
import styled from 'styled-components';
import { SearchItemProps } from '@/pages/search';
import { Image, Text } from '@/components/style';

const ListItem = styled(List.Item)`
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #f2f2f3;
  }

  .signature {
    font-size: 12px;
    color: #a9a9a9;
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
                    <Image
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
                <Text color="#a9a9a9">{item.trackCount}首</Text>
              </Col>
              <Col span={4}>
                <Text color="#a9a9a9">by {item.creator.nickname}</Text>
              </Col>
            </ListItemContent>
          </ListItem>
        )}
      />
    </>
  );
};
