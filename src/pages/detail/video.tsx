import React, { useState, useEffect } from 'react';
import { Space, Row, Col } from 'antd';
import {
  LikeOutlined,
  FolderAddOutlined,
  ShareAltOutlined,
  LeftOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { connect, DetailModelState, useParams, useHistory } from 'umi';
import { ConnectState, ConnectProps } from '@/models/connect';
import { Text, RaiseButton, Image } from '@/components/style';
import { CommentTextArea } from '@/components/comment';
import { VideoPlayer } from '@/components/video';

interface Params {
  id: string;
}

interface Props extends ConnectProps {
  detail: DetailModelState;
  submitting?: boolean;
}

const App: React.FC<Props> = (props) => {
  const {
    detail: { video },
    submitting,
    dispatch,
  } = props;

  const { id } = useParams<Params>();
  const history = useHistory();

  const [textArea, setTextArea] = useState('');
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'detail/queryVideoDetailAsync', id });
    }
  }, [dispatch, id]);

  return (
    <>
      <Space>
        <Text size={14}>
          <LeftOutlined onClick={() => history.go(-1)} />
        </Text>
        <Text size={18} bold>
          视频详情
        </Text>
      </Space>
      <br />
      <br />
      <VideoPlayer url={video.videoUrl} pic={video.coverUrl} />
      <br />
      <Space>
        <Image
          src={require('@/assets/error.png')}
          alt=""
          onLoad={(event: any) => {
            event.target.src = video.creator?.avatarUrl;
          }}
        />
        <Text size={14}>{video.creator?.nickname}</Text>
      </Space>
      <br />
      <br />
      <Space>
        <Text size={20} bold>
          {video.title}
        </Text>
        {video.desc && (
          <Text size={14}>
            {showDesc ? (
              <CaretUpOutlined onClick={() => setShowDesc(false)} />
            ) : (
              <CaretDownOutlined onClick={() => setShowDesc(true)} />
            )}
          </Text>
        )}
      </Space>
      <br />
      <br />
      <Space>
        <Text color="#c9c9c9">
          发布: {moment(video.publishTime).format('YYYY-MM-DD')}
        </Text>
        <Text color="#c9c9c9">播放: {video.playTime} 次</Text>
      </Space>
      <br />
      <br />
      {showDesc && (
        <p>
          <Text>{video.desc}</Text>
        </p>
      )}
      <Row align="middle" justify="space-between">
        <Col>
          <Space>
            <RaiseButton icon={<LikeOutlined />}>
              赞({video.likedCount || 0})
            </RaiseButton>
            <RaiseButton icon={<FolderAddOutlined />}>
              收藏({video.subscribeCount || 0})
            </RaiseButton>
            <RaiseButton icon={<ShareAltOutlined />}>
              分享({video.shareCount || 0})
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
          <Text color="#a9a9a9">（已有{video.commentCount || 0}条评论）</Text>
        </Text>
      </p>
      <CommentTextArea
        rows={3}
        placeholder="输入评论或@朋友"
        allowClear
        count={140 - textArea.length}
        value={textArea}
        onChange={setTextArea}
      />
    </>
  );
};

const DetailVideo = connect(({ detail, loading }: ConnectState) => ({
  detail,
  submitting: loading.effects['detail/queryVideoDetailAsync'],
}))(App);

export default DetailVideo;
