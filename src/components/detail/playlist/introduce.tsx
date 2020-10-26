import React from 'react';
import { useSetState } from 'ahooks';
import { Row, Col, Card, Avatar, Button, Typography } from 'antd';
import {
  PlayCircleOutlined,
  FolderAddOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Link } from 'umi';
import moment from 'moment';
import styled from 'styled-components';
import { DetailModelMessage } from '@/models/detail';
import { Text, ItalicDivider } from '@/components/style';

const { Paragraph } = Typography;

interface Props {
  data: DetailModelMessage;
  loading?: boolean;
}

const CardContent = styled(Card)`
  .ant-card-body {
    padding: 0;
  }

  .ant-typography {
    font-size: 12px;
    color: #a9a9a9;
  }
`;

const SquareAvatar = styled(Avatar)`
  &.ant-avatar-square {
    border-radius: 6px;
  }
`;

const RaiseButton = styled(Button)`
  border-radius: 20px;

  &.left {
    border-radius: 20px 0 0 20px;
  }

  &.right {
    border-radius: 0 20px 20px 0;
  }
`;

const Flex = styled(Col)`
  flex: 1;
`;

const DetailPlaylistIntroduce: React.FC<Props> = (props) => {
  const { data, loading } = props;

  const [state, setState] = useSetState({
    foldKey: 1, // 折叠的 key
    fold: false, // 是否可折叠
  });

  return (
    <CardContent loading={loading} bordered={false}>
      <Row gutter={[16, 0]}>
        <Col>
          <SquareAvatar src={data.coverImgUrl} shape="square" size={160} />
        </Col>
        <Flex>
          <Row>
            <Text size={16} bold>
              {data.name}
            </Text>
          </Row>
          {data.creator && (
            <>
              <Row align="middle" gutter={[8, 0]}>
                <Col>
                  <Avatar src={data.creator.avatarUrl} shape="circle" />
                </Col>
                <Col>
                  <Link to="/profile">{data.creator.nickname}</Link>
                </Col>
                <Col>
                  <Text color="#a9a9a9">
                    {moment(data.creator.createTime).format('YYYY-MM-DD')}创建
                  </Text>
                </Col>
              </Row>
            </>
          )}
          <br />
          <Row align="middle" gutter={[8, 0]}>
            <Col>
              <Row>
                <RaiseButton
                  icon={<PlayCircleOutlined />}
                  type="primary"
                  danger
                  className="left"
                >
                  播放全部
                </RaiseButton>
                <RaiseButton
                  icon={<PlusOutlined />}
                  type="primary"
                  danger
                  className="right"
                />
              </Row>
            </Col>
            <Col>
              <RaiseButton icon={<FolderAddOutlined />}>
                收藏({data.subscribedCount})
              </RaiseButton>
            </Col>
            <Col>
              <RaiseButton icon={<ShareAltOutlined />}>
                分享({data.shareCount})
              </RaiseButton>
            </Col>
            <Col>
              <RaiseButton icon={<DownloadOutlined />}>下载全部</RaiseButton>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Text size={14}>标签：</Text>
            {data.tags?.map((item: any, index: number) => (
              <Text key={item}>
                <Link to="/tag">{item}</Link>
                {index !== data.tags.length - 1 && (
                  <ItalicDivider type="vertical" />
                )}
              </Text>
            ))}
          </Row>
          <Row align="middle" gutter={[8, 0]}>
            <Col>
              <Text size={14}>歌曲数：</Text>
              <Text color="#a9a9a9">{data.trackCount}</Text>
            </Col>
            <Col>
              <Text size={14}>播放数：</Text>
              <Text color="#a9a9a9">{data.playCount}</Text>
            </Col>
          </Row>
          <Row key={state.foldKey}>
            <Paragraph
              ellipsis={{
                rows: 1,
                expandable: true,
                onExpand: () => setState({ fold: true }),
              }}
            >
              <Text size={14}>简 介：</Text>
              {data.description}
              {state.fold && (
                <a
                  className="ant-typography-expand"
                  onClick={() =>
                    setState(({ foldKey }) => ({
                      fold: false,
                      foldKey: foldKey + 1,
                    }))
                  }
                >
                  收起
                </a>
              )}
            </Paragraph>
          </Row>
        </Flex>
      </Row>
    </CardContent>
  );
};

export default DetailPlaylistIntroduce;
