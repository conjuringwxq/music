import React, { useEffect, useState } from 'react';
import { Space, Row, Col } from 'antd';
import {
  LikeOutlined,
  FolderAddOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { connect, DetailModelState, useParams } from 'umi';
import { ConnectState, ConnectProps } from '@/models/connect';
import { VideoPlayer, Text, RaiseButton } from '@/components/style';
import TextArea from '@/components/textArea';

const Box = styled.div`
  width: 550px;
`;

interface Params {
  id: string;
}

interface DetailMvProps extends ConnectProps {
  detail: DetailModelState;
  submitting?: boolean;
}

const DetailMv: React.FC<DetailMvProps> = (props) => {
  const {
    detail: { mv },
    submitting,
    dispatch,
  } = props;

  const { id } = useParams<Params>();

  const [textArea, setTextArea] = useState('');

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'detail/queryMvDetailAsync', id });
    }
  }, [dispatch, id]);

  return (
    <Box>
      <p>
        <VideoPlayer
          width={550}
          height={310}
          src={mv.cover}
          poster={mv.cover}
          controls
        />
      </p>
      <Text color="#a9a9a9">{mv.artistName}</Text>
      <br />
      <br />
      <p>
        <Text size={20} bold>
          {mv.name}
        </Text>
      </p>
      <Space>
        <Text color="#c9c9c9">发布: {mv.publishTime}</Text>
        <Text color="#c9c9c9">播放: {mv.playCount} 次</Text>
      </Space>
      <br />
      <br />
      <Row align="middle" justify="space-between">
        <Col>
          <Space>
            <RaiseButton icon={<LikeOutlined />}>
              赞({mv.likedCount || 0})
            </RaiseButton>
            <RaiseButton icon={<FolderAddOutlined />}>
              收藏({mv.subCount || 0})
            </RaiseButton>
            <RaiseButton icon={<ShareAltOutlined />}>
              分享({mv.shareCount || 0})
            </RaiseButton>
          </Space>
        </Col>
        <Col>
          <Text color="#a9a9a9">举报</Text>
        </Col>
      </Row>
      <br />
      <br />
      <p>
        <Text size={16} bold>
          听友评论
          <Text color="#a9a9a9">（已有{mv.commentCount || 0}条评论）</Text>
        </Text>
      </p>
      <TextArea
        rows={3}
        placeholder="输入评论或@朋友"
        allowClear
        count={140 - textArea.length}
        value={textArea}
        onChange={setTextArea}
      />
    </Box>
  );
};

export default connect(({ detail, loading }: ConnectState) => ({
  detail,
  submitting: loading.effects['detail/queryMvDetailAsync'],
}))(DetailMv);
