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

const Pre = styled.pre`
  text-align: center;
`;

const Code = styled.code`
  font-size: 12px;
  color: #c9c9c9;
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
    render: (scope: any) => <Text>{scope}</Text>,
  },
  {
    title: '歌手',
    dataIndex: 'artists',
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
    dataIndex: 'album',
    render: (scope: any) => <Text>{scope.name}</Text>,
  },
  {
    title: '时长',
    dataIndex: 'duration',
    render: (scope: any) => <Intro>{moment(scope).format('mm:ss')}</Intro>,
  },
];

const ExpandedRow: React.FC<{ content?: string }> = (props) => (
  <Pre>
    <Code>{props.content}</Code>
  </Pre>
);

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
      expandable={{
        expandedRowRender: (record) => (
          <ExpandedRow content={record.lyrics?.txt} />
        ),
      }}
    />
  );
};
