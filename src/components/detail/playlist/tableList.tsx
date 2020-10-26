import React from 'react';
import { Row, Col, Table, Space } from 'antd';
import { HeartOutlined, DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ConnectProps } from '@/models/connect';
import { Text, Intro } from '@/components/style';

interface Props extends ConnectProps {
  data: any[];
  loading?: boolean;
}

const columns = [
  {
    dataIndex: 'key',
    width: 80,
    render: (scope: number) => (
      <Row justify="space-between">
        <Col>
          <Text>{(scope + 1).toString().padStart(2, '0')}</Text>
        </Col>
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
    render: (scope: any) => <Text>{scope}</Text>,
  },
  {
    title: '歌手',
    dataIndex: 'ar',
    width: 150,
    render: (scope: any[]) => (
      <>
        {scope.map((item: any, index: number) => (
          <Text key={item.id}>
            <a href="#">{item.name}</a>
            {index !== scope.length - 1 && ' / '}
          </Text>
        ))}
      </>
    ),
  },
  {
    title: '专辑',
    dataIndex: 'al',
    render: (scope: any) => scope.name,
  },
  {
    title: '时长',
    dataIndex: 'dt',
    render: (scope: any) => <Intro>{moment(scope).format('mm:ss')}</Intro>,
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
