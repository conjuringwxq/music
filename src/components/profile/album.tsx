import React, { useEffect, useMemo } from "react";
import { AlbumModelState, connect } from "umi";
import { Row, Col, List, Divider, Space, Table } from "antd";
import { PlayCircleFilled, PlayCircleOutlined, FolderAddOutlined, HeartOutlined, DownloadOutlined } from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";
import { ProfileItemProps, ViewFormat } from "@/pages/profile";
import { Text, Image, ItalicDivider, CdMask } from "@/components/style";
import { ConnectProps, ConnectState } from "@/models/connect";

interface TableWidgetProps extends ProfileItemProps, ConnectProps {
  album: AlbumModelState;
  submitting?: boolean;
}

interface TableItemProps {
  item: any;
  data: { [key: string]: any[] };
  loading?: boolean;
}

const Box = styled.a`
  width: 150px;
  position: relative;
  display: block;

  &:hover {
    .video-play {
      opacity: 1;
      background: rgba(30, 30, 34, 0.38);

      > .icon {
        transform: scale(0.9);
        opacity: 1;
      }
    }
  }
`;

const VideoPlay = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 6px;
  opacity: 0;

  > .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 46px;
    margin: -23px 0 0 -23px;
    opacity: 0;
    background: #215fff;
    color: #fff;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
    transform: scale(0);
  }
`;

const ListItem = styled(List.Item)`
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #f2f2f3;
  }
`;

const ListItemContent = styled(Row)`
  width: 100%;
`;

const Title = styled(Text)`
  margin-right: 20px;
`;

const IconHeart = styled(HeartOutlined)`
  cursor: pointer;
`;

const IconDownload = styled(DownloadOutlined)`
  cursor: pointer;
`;

const TableWidgetBox = styled.div`
  margin-bottom: 20px;
`;

const AppWidget = ({ loading, data }: { loading?: boolean; data: any }) => {
  return (
    <List
      loading={loading}
      dataSource={data}
      pagination={false}
      grid={{ gutter: 16, column: 5 }}
      renderItem={(item: any) => (
        <List.Item>
          <CdMask>
            <Box>
              <Image
                src={require("@/assets/error.png")}
                shape="square"
                size={150}
                alt=""
                onLoad={(event: any) => {
                  event.target.src = item.picUrl;
                }}
              />
              <VideoPlay className="video-play">
                <PlayCircleFilled className="icon" />
              </VideoPlay>
            </Box>
          </CdMask>
          <Text>
            {item.name}
            {item.transNames?.map((val: any, idx: number) => (
              <Text color="#a9a9a9" key={idx}>
                （{val}
                {idx !== item.transNames.length - 1 && <ItalicDivider type="vertical" />}）
              </Text>
            ))}
          </Text>
          <br />
          <Text color="#a9a9a9">{moment(item.publishTime).format("YYYY-MM-DD")}</Text>
        </List.Item>
      )}
    />
  );
};

const ListWidget = ({ loading, data }: { loading?: boolean; data: any }) => {
  return (
    <List
      loading={loading}
      dataSource={data}
      pagination={false}
      renderItem={(item: any) => (
        <ListItem>
          <ListItemContent align="middle">
            <Col span={14}>
              <List.Item.Meta
                avatar={
                  <Image
                    src={require("@/assets/error.png")}
                    shape="square"
                    size={60}
                    onLoad={(event: any) => {
                      event.target.src = item.picUrl;
                    }}
                  />
                }
                title={
                  <Text>
                    {item.name}
                    {item.transNames?.map((val: any, idx: number) => (
                      <Text color="#a9a9a9" key={idx}>
                        （{val}
                        {idx !== item.transNames.length - 1 && <ItalicDivider type="vertical" />}）
                      </Text>
                    ))}
                  </Text>
                }
              />
            </Col>
            <Col span={4}>
              <Text color="#a9a9a9">{item.size}首</Text>
            </Col>
            <Col span={6}>
              <Text color="#a9a9a9">发行时间: {moment(item.publishTime).format("YYYY-MM-DD")}</Text>
            </Col>
          </ListItemContent>
        </ListItem>
      )}
    />
  );
};

const columns = [
  {
    dataIndex: "index",
    width: 100,
    render: (val: number) => (
      <Row justify="space-between" gutter={[16, 0]}>
        <Col>
          <Text>{(val + 1).toString().padStart(2, "0")}</Text>
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
    textWrap: "word-break",
    render: (scope: any) => <Text>{scope}</Text>
  },
  {
    title: "时长",
    dataIndex: "dt",
    width: 200,
    render: (scope: any) => <Text color="#a9a9a9">{moment(scope).format("mm:ss")}</Text>
  }
];

const Item: React.FC<TableItemProps> = props => {
  const { item, loading, data } = props;
  const dataSource = useMemo(() => data[item.id], [data, item.id]);

  return <Table size="small" columns={columns} dataSource={dataSource} loading={loading} pagination={false} />;
};

const TableItem = React.memo(Item);

const TableWidget: React.FC<TableWidgetProps> = props => {
  const {
    data,
    dispatch,
    submitting,
    album: { songs }
  } = props;

  useEffect(() => {
    if (dispatch) {
      data.forEach((item: any) => {
        dispatch({ type: "album/getAlbumContent", id: item.id });
      });
    }
  }, [data, dispatch]);

  return data.map((item: any) => (
    <TableWidgetBox key={item.key}>
      <Row>
        <Col span={5}>
          <CdMask>
            <Box>
              <Image
                src={require("@/assets/error.png")}
                shape="square"
                size={150}
                alt=""
                onLoad={(event: any) => {
                  event.target.src = item.picUrl;
                }}
              />
              <VideoPlay className="video-play">
                <PlayCircleFilled className="icon" />
              </VideoPlay>
            </Box>
          </CdMask>
          <Text color="#a9a9a9">{moment(item.publishTime).format("YYYY-MM-DD")}</Text>
        </Col>
        <Col span={19}>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Title size={18} bold>
                {item.name}
              </Title>
              <Text size={18}>
                <PlayCircleOutlined />
                <Divider type="vertical" />
                <FolderAddOutlined />
              </Text>
            </Col>
            <Col span={24}>
              <TableItem item={item} loading={submitting} data={songs} />
            </Col>
          </Row>
        </Col>
      </Row>
    </TableWidgetBox>
  ));
};

const DvaTableWidget = connect(({ album, loading }: ConnectState) => ({
  album,
  submitting: loading.effects["album/getAlbumContent"]
}))(TableWidget);

const App: React.FC<ProfileItemProps> = props => {
  const { data, loading, viewFormat } = props;

  const renderView = useMemo(() => {
    switch (viewFormat) {
      case ViewFormat.App:
        return <AppWidget data={data} loading={loading} />;
      case ViewFormat.List:
        return <ListWidget data={data} loading={loading} />;
      case ViewFormat.Table:
        return <DvaTableWidget data={data} loading={loading} />;
      default:
        return <></>;
    }
  }, [data, loading, viewFormat]);

  return <>{renderView}</>;
};

export const ProfileAlbum = App;
