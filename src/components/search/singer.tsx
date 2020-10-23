import React, { useEffect } from 'react';
import { List, Avatar } from 'antd';
import styled from 'styled-components';
import { SearchItemProps } from '@/pages/search';
import { useSetState } from 'ahooks';

interface Pagination {
  pageNum?: number;
  pageSize?: number;
}

interface StateType {
  dataSource?: any[];
  pagination: Pagination;
}

const ListItem = styled(List.Item)`
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #f2f2f3;
  }
`;

export const SearchSinger: React.FC<SearchItemProps> = (props) => {
  const { loading, data, total, callback } = props;

  const [state, setState] = useSetState<StateType>({
    dataSource: [],
    pagination: {
      pageNum: 1,
      pageSize: 100,
    },
  });

  useEffect(() => {
    setState({
      dataSource: data?.map((item: any) => ({
        key: item.id,
        ...item,
      })),
    });
  }, [data, setState]);

  const onChange = (pageNum: number, pageSize?: number) => {
    setState({ pagination: { pageNum, pageSize } });
    callback(pageNum, pageSize);
  };

  return (
    <>
      <List
        loading={loading}
        dataSource={data}
        pagination={{
          size: 'small',
          hideOnSinglePage: true,
          total,
          ...state.pagination,
          onChange,
        }}
        renderItem={(item) => (
          <ListItem>
            <List.Item.Meta
              avatar={<Avatar src={item.picUrl} shape="square" size="large" />}
              title={item.name}
            />
          </ListItem>
        )}
      />
    </>
  );
};
