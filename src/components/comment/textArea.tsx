import React from "react";
import { Row, Col, Input, Space } from "antd";
import styled from "styled-components";
import { SmileOutlined, NumberOutlined } from "@ant-design/icons";
import Icon from "@/utils/iconfont";
import { Text, RaiseButton } from "@/components/style";

const Box = styled.div`
  position: relative;

  textarea {
    border-radius: 6px;
  }
`;

const Count = styled(Text)`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

interface Props {
  rows?: number;
  placeholder?: string;
  allowClear?: boolean;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  count: number | string;
}

const App: React.FC<Props> = props => {
  const { rows, placeholder, value, onChange, allowClear, count } = props;

  return (
    <>
      <Box>
        <Input.TextArea rows={rows || 3} value={value} placeholder={placeholder || ""} onChange={event => onChange(event.target.value)} allowClear={allowClear || true} />
        <Count color="#a9a9a9">{count}</Count>
      </Box>
      <br />
      <Row align="middle" justify="space-between">
        <Col>
          <Space>
            <Text size={18}>
              <SmileOutlined />
            </Text>
            <Text size={18}>
              <Icon type="icon-aite" />
            </Text>
            <Text size={18}>
              <NumberOutlined />
            </Text>
          </Space>
        </Col>
        <Col>
          <RaiseButton>评论</RaiseButton>
        </Col>
      </Row>
      <br />
    </>
  );
};

export const CommentTextArea = App;
