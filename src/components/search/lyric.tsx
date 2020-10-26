import React, { useEffect } from 'react';
import { Table, Row, Col, Space } from 'antd';
import { HeartOutlined, DownloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Text, Intro, SearchItemProps } from '@/pages/search';
import moment from 'moment';
import { useSetState } from 'ahooks';

interface StateType {
  dataSource?: any[];
}

const IconHeart = styled(HeartOutlined)`
  cursor: pointer;
`;
const IconDownload = styled(DownloadOutlined)`
  cursor: pointer;
`;

const columns = [
  {
    dataIndex: 'index',
    width: 100,
    render: (val: number) => (
      <Row justify="space-between" gutter={[16, 0]}>
        <Col>
          <Text>{(val + 1).toString().padStart(2, '0')}</Text>
        </Col>
        <Col>
          <Space>
            <IconHeart />
            <IconDownload />
          </Space>
        </Col>
      </Row>
    ),
  },
  {
    title: '音乐标题',
    dataIndex: 'name',
    width: 350,
    render: (scope: any, row: any) => (
      <>
        <Text>{scope}</Text>
        <br />
        <Intro>{row.lyrics?.txt}</Intro>
      </>
    ),
  },
  {
    title: '歌手',
    dataIndex: 'artists',
    width: 150,
    render: (scope: any[]) => (
      <Text>
        {scope.map((item: any, index: number) => (
          <>
            <a href="#">{item.name}</a>
            {index !== scope.length - 1 && <Text> / </Text>}
          </>
        ))}
      </Text>
    ),
  },
  {
    title: '专辑',
    dataIndex: 'album',
    render: (scope: any) => <Text>{scope.name}</Text>,
  },
  {
    title: '时长',
    dataIndex: 'duration',
    render: (scope: any) => <Intro>{moment(scope).format('mm:ss')}</Intro>,
  },
];

export const SearchLyric: React.FC<SearchItemProps> = (props) => {
  const { loading, data, pageNum, pageSize } = props;

  const [state, setState] = useSetState<StateType>({
    dataSource: [],
  });

  useEffect(() => {
    if (pageNum && pageSize) {
      setState({
        dataSource: data?.map((item: any, index: number) => ({
          key: index,
          index: index + (pageNum - 1) * pageSize,
          ...item,
        })),
      });
    }
  }, [data, pageNum, pageSize, setState]);

  return (
    <Table
      size="small"
      loading={loading}
      dataSource={state.dataSource}
      columns={columns}
      pagination={false}
    />
  );
};
