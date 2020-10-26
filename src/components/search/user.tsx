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

  .signature {
    font-size: 12px;
    color: #c9c9c9;
  }
`;

const ListItemContent = styled(Row)`
  width: 100%;
`;

export const SearchUser: React.FC<SearchItemProps> = (props) => {
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
                  avatar={<Avatar src={item.avatarUrl} size={60} />}
                  title={item.nickname}
                />
              </Col>
              <Col span={8}>
                <span className="signature">{item.signature}</span>
              </Col>
            </ListItemContent>
          </ListItem>
        )}
      />
    </>
  );
};
