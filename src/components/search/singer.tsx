import React from 'react';
import { List, Avatar } from 'antd';
import styled from 'styled-components';
import { SearchItemProps } from '@/pages/search';

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
              avatar={<Avatar src={item.picUrl} shape="square" size={50} />}
              title={item.name}
            />
          </ListItem>
        )}
      />
    </>
  );
};
