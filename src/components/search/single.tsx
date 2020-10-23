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
        <Col>{(val + 1).toString().padStart(2, '0')}</Col>
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
  const { loading, data, pageNum, pageSize } = props;

  const [state, setState] = useSetState<StateType>({
    dataSource: [],
  });

  useEffect(() => {
    if (pageNum && pageSize) {
      setState({
        dataSource: data?.map((item: any, index: number) => ({
          key: item.id,
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
