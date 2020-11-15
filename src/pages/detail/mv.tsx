import React, { useEffect, useState } from "react";
import { Space, Row, Col } from "antd";
import { LikeOutlined, FolderAddOutlined, ShareAltOutlined, LeftOutlined, CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { connect, DetailModelState, useParams, useHistory } from "umi";
import styled from "styled-components";
import { ConnectState, ConnectProps } from "@/models/connect";
import { Text, RaiseButton, ItalicDivider } from "@/components/style";
import { CommentTextArea } from "@/components/comment";
import { VideoPlayer } from "@/components/video";

interface Params {
  id: string;
}

interface Props extends ConnectProps {
  detail: DetailModelState;
  submitting?: boolean;
}

const Box = styled.div`
  width: 550px;
`;

const App: React.FC<Props> = props => {
  const {
    detail: { mv },
    submitting,
    dispatch
  } = props;

  const { id } = useParams<Params>();
  const history = useHistory();

  const [textArea, setTextArea] = useState("");
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: "detail/queryMvDetailAsync", id });
    }
  }, [dispatch, id]);

  return (
    <Box>
      <Space>
        <Text size={14}>
          <LeftOutlined onClick={() => history.go(-1)} />
        </Text>
        <Text size={18} bold>
          mv详情
        </Text>
      </Space>
      <br />
      <br />
      <VideoPlayer url={mv.mvUrl} pic={mv.cover} />
      <br />
      {mv.artists?.map((author: any, index: number) => (
        <Text size={14} key={author.id}>
          {author.name}
          {index !== mv.artists.length - 1 && <ItalicDivider type="vertical" />}
        </Text>
      ))}
      <br />
      <br />
      <Space>
        <Text size={20} bold>
          {mv.name}
        </Text>
        {mv.desc && <Text size={14}>{showDesc ? <CaretUpOutlined onClick={() => setShowDesc(false)} /> : <CaretDownOutlined onClick={() => setShowDesc(true)} />}</Text>}
      </Space>
      <br />
      <br />
      <Space>
        <Text color="#c9c9c9">发布: {mv.publishTime}</Text>
        <Text color="#c9c9c9">播放: {mv.playCount} 次</Text>
      </Space>
      <br />
      <br />
      {showDesc && (
        <p>
          <Text>{mv.desc}</Text>
        </p>
      )}
      <Row align="middle" justify="space-between">
        <Col>
          <Space>
            <RaiseButton icon={<LikeOutlined />}>赞({mv.likedCount || 0})</RaiseButton>
            <RaiseButton icon={<FolderAddOutlined />}>收藏({mv.subCount || 0})</RaiseButton>
            <RaiseButton icon={<ShareAltOutlined />}>分享({mv.shareCount || 0})</RaiseButton>
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
      <CommentTextArea rows={3} placeholder="输入评论或@朋友" allowClear count={140 - textArea.length} value={textArea} onChange={setTextArea} />
    </Box>
  );
};

const DetailMv = connect(({ detail, loading }: ConnectState) => ({
  detail,
  submitting: loading.effects["detail/queryMvDetailAsync"]
}))(App);

export default DetailMv;
