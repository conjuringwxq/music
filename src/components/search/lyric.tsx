import React, { useEffect } from "react";
import { Link } from "umi";
import { Table, Row, Col, Space } from "antd";
import { HeartOutlined, DownloadOutlined } from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";
import { useSetState } from "ahooks";
import { SearchItemProps } from "@/pages/search";
import { Text, ItalicDivider, Pre, Code } from "@/components/style";
import { ProfileActiveKey } from "@/pages/profile";

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
    dataIndex: "index",
    width: 100,
    render: (scope: number) => (
      <Row justify="space-between" gutter={[16, 0]}>
        <Col>
          <Text>{(scope + 1).toString().padStart(2, "0")}</Text>
        </Col>
        <Col>
          <Space>
            <IconHeart />
            <IconDownload />
          </Space>
        </Col>
      </Row>
    )
  },
  {
    title: "音乐标题",
    dataIndex: "name",
    width: 350,
    render: (scope: any) => <Text>{scope}</Text>
  },
  {
    title: "歌手",
    dataIndex: "artists",
    width: 150,
    render: (scope: any[]) => (
      <>
        {scope.map((item: any, index: number) => (
          <Text key={item.id}>
            <Link to={`/profile/${item.id}/${ProfileActiveKey.Album}`}>{item.name}</Link>
            {index !== scope.length - 1 && <ItalicDivider type="vertical" />}
          </Text>
        ))}
      </>
    )
  },
  {
    title: "专辑",
    dataIndex: "album",
    render: (scope: any) => <Text>{scope.name}</Text>
  },
  {
    title: "时长",
    dataIndex: "duration",
    render: (scope: any) => <Text color="#a9a9a9">{moment(scope).format("mm:ss")}</Text>
  }
];

const ExpandedRow: React.FC<{ content?: string }> = props => (
  <Pre>
    <Code color="#a9a9a9">{props.content}</Code>
  </Pre>
);

const App: React.FC<SearchItemProps> = props => {
  const { loading, data, pageNum, pageSize } = props;

  const [state, setState] = useSetState<StateType>({
    dataSource: []
  });

  useEffect(() => {
    if (pageNum && pageSize) {
      setState({
        dataSource: data?.map((item: any, index: number) => ({
          key: index,
          index: index + (pageNum - 1) * pageSize,
          ...item
        }))
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
        expandedRowRender: record => <ExpandedRow content={record.lyrics?.txt} />
      }}
    />
  );
};

export const SearchLyric = App;
