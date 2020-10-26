import React from 'react';
import { List } from 'antd';
import styled from 'styled-components';
import { SearchItemProps } from '@/pages/search';
import { Avatar, Text } from '@/components/style';

const ListItem = styled(List.Item)`
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #f2f2f3;
  }
`;

export const SearchSinger: React.FC<SearchItemProps> = (props) => {
  const { loading, data } = props;

  return (
    <>
      <List
        loading={loading}
        dataSource={data}
        pagination={false}
        renderItem={(item) => (
          <ListItem>
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
          </ListItem>
        )}
      />
    </>
  );
};
