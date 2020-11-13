import React from "react";
import { Link } from "umi";
import { Row, Col, Table, Space } from "antd";
import { HeartOutlined, DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import { ConnectProps } from "@/models/connect";
import { Text, ItalicDivider } from "@/components/style";
import { ProfileActiveKey } from "@/pages/profile";

interface Props extends ConnectProps {
  data: any[];
  loading?: boolean;
}

const columns = [
  {
    dataIndex: "key",
    width: 80,
    render: (scope: number) => (
      <Row justify="space-between">
        <Col>
          <Text>{(scope + 1).toString().padStart(2, "0")}</Text>
        </Col>
        <Space>
          <HeartOutlined />
          <DownloadOutlined />
        </Space>
      </Row>
    )
  },
  {
    title: "音乐标题",
    dataIndex: "name",
    render: (scope: any) => <Text>{scope}</Text>
  },
  {
    title: "歌手",
    dataIndex: "ar",
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
    dataIndex: "al",
    render: (scope: any) => <Text>{scope.name}</Text>
  },
  {
    title: "时长",
    dataIndex: "dt",
    render: (scope: any) => <Text color="#a9a9a9">{moment(scope).format("mm:ss")}</Text>
  }
];

const App: React.FC<Props> = props => {
  const { data, loading } = props;

  return (
    <Table
      loading={loading}
      size="small"
      dataSource={data}
      columns={columns}
      pagination={{
        position: ["bottomCenter"],
        hideOnSinglePage: true
      }}
    />
  );
};

export const DetailPlaylistTableList = App;
