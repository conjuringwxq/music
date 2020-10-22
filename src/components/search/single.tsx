import React, { useEffect } from 'react';
import { Table, Row, Col, Space } from 'antd';
import { HeartOutlined, DownloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { SearchItemProps } from '@/pages/search';
import moment from 'moment';
import { useSetState } from 'ahooks';

interface StateType {
  dataSource?: any[];
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
  const { loading, data } = props;

  const [state, setState] = useSetState<StateType>({
    dataSource: [],
  });

  useEffect(() => {
    setState({
      dataSource: data.songs?.map((item: any, index: number) => ({
        key: item.id,
        index,
        ...item,
      })),
    });
  }, [data.songs, setState]);

  return (
    <Table
      loading={loading}
      size="small"
      dataSource={state.dataSource}
      columns={columns}
      pagination={{ hideOnSinglePage: true, pageSize: 100 }}
    />
  );
};
