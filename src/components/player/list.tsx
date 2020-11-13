import React, { useMemo } from "react";
import { Row, Col, Button } from "antd";
import styled from "styled-components";
import { ConnectProps } from "@/models/connect";
import { Settings } from "@/models/global";

interface Props extends ConnectProps {
  data: Settings;
}

const TabCard = styled(Row)`
  border: 1px solid #a9a9a9;
  border-radius: 20px;
`;

const TabButton = styled(Button)`
  border-radius: 20px;

  &.ant-btn {
    border-color: transparent;
  }
`;

const PlayTableList: React.FC = () => {
  return <>播放列表</>;
};
const HistoryTableList: React.FC = () => {
  return <>历史记录</>;
};

const App: React.FC<Props> = props => {
  const { data, dispatch } = props;

  const buttonPlayListType = useMemo(() => (data.tabKey === "playList" ? "primary" : "default"), [data.tabKey]);

  const buttonHistoryType = useMemo(() => (data.tabKey === "history" ? "primary" : "default"), [data.tabKey]);

  const handleChange = (tabKey: any) => {
    if (dispatch) {
      dispatch({ type: "global/handleChangeTabKey", tabKey });
    }
  };

  return (
    <Row gutter={[0, 24]} justify="center" align="middle">
      <Col>
        <TabCard>
          <TabButton type={buttonPlayListType} onClick={() => handleChange("playList")}>
            播放列表
          </TabButton>
          <TabButton type={buttonHistoryType} onClick={() => handleChange("history")}>
            历史记录
          </TabButton>
        </TabCard>
      </Col>
      <Col span={24}>
        {data.tabKey === "playList" && <PlayTableList />}
        {data.tabKey === "history" && <HistoryTableList />}
      </Col>
    </Row>
  );
};

export const PlayerList = App;
