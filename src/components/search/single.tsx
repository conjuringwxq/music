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
    width: 100,
    render: (val: number) => (
      <Row justify="space-between" gutter={[16, 0]}>
        <Col>{(val + 1).toString().padStart(2, '0')}</Col>
        <Col>
          <Space>
            <HeartOutlined />
            <DownloadOutlined />
          </Space>
        </Col>
      </Row>
    ),
  },
  {
    title: '音乐标题',
    dataIndex: 'name',
  },
  {
    title: '歌手',
    dataIndex: 'artists',
    render: (arr: any[]) => arr.map((item) => item.name).join('/'),
  },
  {
    title: '专辑',
    dataIndex: 'album',
    render: (obj: any) => obj.name,
  },
  {
    title: '时长',
    dataIndex: 'duration',
    render: (durationTime: any) => (
      <span>{moment(durationTime).format('mm:ss')}</span>
    ),
  },
];

export const SearchSingle: React.FC<SearchItemProps> = (props) => {
  const { loading, data, total, callback } = props;

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

  const onChange = (pageNum: number, pageSize?: number) => {
    setState({ pagination: { pageNum, pageSize } });
    callback(pageNum, pageSize);
  };

  return (
    <Table
      size="small"
      loading={loading}
      dataSource={state.dataSource}
      columns={columns}
      pagination={{
        hideOnSinglePage: true,
        showSizeChanger: false,
        total,
        ...state.pagination,
        onChange,
      }}
    />
  );
};
