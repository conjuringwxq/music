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

const { Paragraph } = Typography;

interface Props {
  data: DetailModelMessage;
  loading?: boolean;
}

const CardContent = styled(Card)`
  .ant-card-body {
    padding: 0;
  }
`;

const SquareAvatar = styled(Avatar)`
  &.ant-avatar-square {
    border-radius: 6px;
  }
`;

const CreatorDate = styled.span`
  color: #a9a9a9;
  font-size: 12px;
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

const Desc = styled.div`
  font-size: 12px;
  color: #a9a9a9;

  .title {
    font-size: 14px;
    color: #333;
  }

  .ant-typography {
    font-size: 12px;
    color: #a9a9a9;
  }
`;

const FlexCol = styled(Col)`
  flex: 1;
`;

const MarginTop = styled.div`
  margin-top: 15px;
`;

export const DetailPlaylistIntroduce: React.FC<Props> = (props) => {
  const { data, loading } = props;

  const [state, setState] = useSetState({
    foldKey: 1, // 折叠的 key
    fold: false, // 是否可折叠
  });

  return (
    <CardContent loading={loading} bordered={false}>
      <Row gutter={[16, 0]}>
        <Col>
          <SquareAvatar src={data.coverImgUrl} shape="square" size={160}/>
        </Col>
        <FlexCol>
          <Row>
            <h3>{data.name}</h3>
          </Row>
          {data.creator && (
            <>
              <Row align="middle" gutter={[8, 0]}>
                <Col>
                  <Avatar src={data.creator.avatarUrl} shape="circle"/>
                </Col>
                <Col>
                  <Link to="/">{data.creator.nickname}</Link>
                </Col>
                <Col>
                  <CreatorDate>
                    {moment(data.creator.createTime).format('YYYY-MM-DD')}创建
                  </CreatorDate>
                </Col>
              </Row>
            </>
          )}
          <MarginTop>
            <Row align="middle" gutter={[8, 0]}>
              <Col>
                <RaiseButton
                  icon={<PlayCircleOutlined/>}
                  type="primary"
                  danger
                  className="left"
                >
                  播放全部
                </RaiseButton>
                <RaiseButton
                  icon={<PlusOutlined/>}
                  type="primary"
                  danger
                  className="right"
                />
              </Col>
              <Col>
                <RaiseButton icon={<FolderAddOutlined/>}>
                  收藏({data.subscribedCount})
                </RaiseButton>
              </Col>
              <Col>
                <RaiseButton icon={<ShareAltOutlined/>}>
                  分享({data.shareCount})
                </RaiseButton>
              </Col>
              <Col>
                <RaiseButton icon={<DownloadOutlined/>}>下载全部</RaiseButton>
              </Col>
            </Row>
          </MarginTop>
          <MarginTop>
            <Desc>
              <Row align="middle">
                <span className="title">标签：</span>
                {data.tags?.map((item: any, index: number) => (
                  <Col key={item}>
                    <a href="#">{item}</a>
                    &nbsp;
                    {index !== data.tags.length - 1 && '/'}
                    &nbsp;
                  </Col>
                ))}
              </Row>
              <Row align="middle" gutter={[8, 0]}>
                <Col>
                  <span className="title">歌曲数：</span>
                  {data.trackCount}
                </Col>
                <Col>
                  <span className="title">播放数：</span>
                  {data.playCount}
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
                  <span className="title">简 介：</span>
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
            </Desc>
          </MarginTop>
        </FlexCol>
      </Row>
    </CardContent>
  );
};
