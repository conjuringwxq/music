import React from 'react';
import { Row, Col, Table, Space } from 'antd';
import { HeartOutlined, DownloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import moment from 'moment';
import { ConnectProps } from '@/models/connect';

interface Props extends ConnectProps {
  data: any[];
  loading?: boolean;
}

const columns = [
  {
    dataIndex: 'key',
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

const DetailPlaylistTableList: React.FC<Props> = (props) => {
  const { data, loading } = props;

  return (
    <Table
      loading={loading}
      size="small"
      dataSource={data}
      columns={columns}
      pagination={{
        position: ['bottomCenter'],
        hideOnSinglePage: true,
      }}
    />
  );
};

export default DetailPlaylistTableList;
