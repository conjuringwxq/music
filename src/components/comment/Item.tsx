import React from "react";
import { Row, Col, Tooltip, Space, Divider } from "antd";
import { LikeOutlined, ShareAltOutlined, MessageOutlined } from "@ant-design/icons";
import moment from "moment";
import styled from "styled-components";
import { Image, Text } from "@/components/style";

const Box = styled.div`
  margin-left: 10px;
`;

interface Props {
  avatar: string;
  review: React.ReactNode;
  reply: React.ReactNode;
  createTime: number;
  likedCount: number;
}

const App: React.FC<Props> = props => {
  const { avatar, review, reply, createTime, likedCount } = props;

  return (
    <Row justify="space-between">
      <Col span={1}>
        <Image src={avatar} shape="circle" />
      </Col>
      <Col span={23}>
        <Box>
          {review}
          {reply}
          <Row align="middle" justify="space-between">
            <Col>
              <Tooltip placement="right" title={moment(createTime).format("YYYY-MM-DD HH:mm:ss")} color="#3570bf">
                <Text color="#a9a9a9">{moment(createTime).fromNow()}</Text>
              </Tooltip>
            </Col>
            <Col>
              <Text color="#a9a9a9">
                <Space>
                  <LikeOutlined />
                  {likedCount !== 0 && likedCount}
                </Space>
                <Divider type="vertical" />
                <ShareAltOutlined />
                <Divider type="vertical" />
                <MessageOutlined />
              </Text>
            </Col>
          </Row>
          <Divider />
        </Box>
      </Col>
    </Row>
  );
};

export const CommentItem = App;
