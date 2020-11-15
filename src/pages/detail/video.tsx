import React, { useState, useEffect } from "react";
import { Space, Row, Col } from "antd";
import { LikeOutlined, FolderAddOutlined, ShareAltOutlined, LeftOutlined, CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import moment from "moment";
import { connect, DetailModelState, useParams, useHistory } from "umi";
import { ConnectState, ConnectProps } from "@/models/connect";
import { Text, RaiseButton, Image, ItalicDivider } from "@/components/style";
import { CommentTextArea } from "@/components/comment";
import { VideoPlayer } from "@/components/video";

interface Params {
  id: string;
}

interface Props extends ConnectProps {
  detail: DetailModelState;
  submitting?: boolean;
}

const App: React.FC<Props> = props => {
  const {
    detail: { video, videoRelated },
    submitting,
    dispatch
  } = props;
  const { id } = useParams<Params>();
  const history = useHistory();

  const [textArea, setTextArea] = useState("");
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: "detail/queryVideoDetailAsync", id });
      dispatch({ type: "detail/queryVideoRelatedAsync", id });
    }
  }, [dispatch, id]);

  return (
    <>
      <Row gutter={[0, 16]}>
        <Col span={15}>
          <Space>
            <Text size={14}>
              <LeftOutlined onClick={() => history.go(-1)} />
            </Text>
            <Text size={18} bold>
              视频详情
            </Text>
          </Space>
        </Col>
        <Col span={9}>
          <Text size={18} bold>
            相关推荐
          </Text>
        </Col>
      </Row>
      <Row>
        <Col span={15}>
          <VideoPlayer url={video.videoUrl} pic={video.coverUrl} />
          <br />
          <Space>
            <Image
              src={require("@/assets/error.png")}
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
            {video.desc && <Text size={14}>{showDesc ? <CaretUpOutlined onClick={() => setShowDesc(false)} /> : <CaretDownOutlined onClick={() => setShowDesc(true)} />}</Text>}
          </Space>
          <br />
          <br />
          <Space>
            <Text color="#c9c9c9">发布: {moment(video.publishTime).format("YYYY-MM-DD")}</Text>
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
                <RaiseButton icon={<LikeOutlined />}>赞({video.likedCount || 0})</RaiseButton>
                <RaiseButton icon={<FolderAddOutlined />}>收藏({video.subscribeCount || 0})</RaiseButton>
                <RaiseButton icon={<ShareAltOutlined />}>分享({video.shareCount || 0})</RaiseButton>
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
          <CommentTextArea rows={3} placeholder="输入评论或@朋友" allowClear count={140 - textArea.length} value={textArea} onChange={setTextArea} />
        </Col>
        <Col span={9}>
          {videoRelated?.map((related: any) => (
            <Row gutter={[0, 14]} onClick={() => history.push(`/detail/video/${related.vid}`)}>
              <Col span={11}>
                <Image
                  src={require("@/assets/error.png")}
                  shape="square"
                  size={{ width: "140px", height: "80px" }}
                  alt=""
                  onLoad={(event: any) => {
                    event.target.src = related.coverUrl;
                  }}
                />
              </Col>
              <Col span={13}>
                <Space direction="vertical">
                  <Text bold>{related.title}</Text>
                  <Space>
                    <Text color="#a9a9a9" size={12}>
                      by
                    </Text>
                    {related.creator?.map((item: any, index: number) => (
                      <Text color="#c9c9c9" size={12} key={item.userId}>
                        {item.userName} {index !== related.creator.length - 1 && <ItalicDivider type="vertical" />}{" "}
                      </Text>
                    ))}
                  </Space>
                </Space>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </>
  );
};

const DetailVideo = connect(({ detail, loading }: ConnectState) => ({
  detail,
  submitting: loading.models.detail
}))(App);

export default DetailVideo;
