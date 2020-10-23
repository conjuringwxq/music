import React, { useEffect } from 'react';
import { Table, Row, Col, Space } from 'antd';
import { HeartOutlined, DownloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { SearchItemProps } from '@/pages/search';
import moment from 'moment';
import { useSetState } from 'ahooks';

interface Pagination {
  pageNum?: number;
  pageSize?: number;
}

interface StateType {
  dataSource?: any[];
  pagination: Pagination;
}

const columns = [
  {
    dataIndex: 'index',
    width: 80,
    render: (val: number) => (
      <Row justify="space-between">
        <Col>{(val + 1).toString().padStart(2, '0')}</Col>
        <Space>
          <HeartOutlined />
          <DownloadOutlined />
        </Space>
      </Row>
    ),
  },
  {
    title: '音乐标题',
    dataIndex: 'name',
  },
  {
    title: '歌手',
    dataIndex: 'ar',
    render: (arr: any[]) => arr.map((item) => item.name).join('/'),
  },
  {
    title: '专辑',
    dataIndex: 'al',
    render: (obj: any) => obj.name,
  },
  {
    title: '时长',
    dataIndex: 'dt',
    render: (durationTime: any) => (
      <span>{moment(durationTime).format('mm:ss')}</span>
    ),
  },
];

export const SearchSingle: React.FC<SearchItemProps> = (props) => {
  const { loading, data, total, onPaginationChange } = props;

  const [state, setState] = useSetState<StateType>({
    dataSource: [],
    pagination: {
      pageNum: 1,
      pageSize: 100,
    },
  });

  useEffect(() => {
    const { pageNum, pageSize } = state.pagination;
    if (pageNum && pageSize) {
      setState({
        dataSource: data?.map((item: any, index: number) => ({
          key: item.id,
          index: index + (pageNum - 1) * pageSize,
          ...item,
        })),
      });
    }
  }, [data, setState, state.pagination]);

  const handleCurrentChange = (pageNum: number, pageSize?: number) => {
    setState({ pagination: { pageNum, pageSize } });
    if (onPaginationChange) {
      onPaginationChange(pageNum, pageSize);
    }
  };

  return (
    <Table
      loading={loading}
      size="small"
      dataSource={state.dataSource}
      columns={columns}
      pagination={{
        hideOnSinglePage: true,
        total,
        ...state.pagination,
        onChange: handleCurrentChange,
      }}
    />
  );
};
