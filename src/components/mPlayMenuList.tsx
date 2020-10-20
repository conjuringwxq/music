import React, { useMemo } from 'react';
import { Row, Col, Button } from 'antd';
import { useSetState } from 'ahooks';
import styled from 'styled-components';

type TabKey = 'playList' | 'history';

interface StateType {
  tabKey: TabKey;
}

const TabCard = styled(Row)`
  border: 1px solid #c9c9c9;
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

const MPlayMenuList: React.FC = () => {
  const [state, setState] = useSetState<StateType>({ tabKey: 'playList' });

  const buttonPlayListType = useMemo(
    () => (state.tabKey === 'playList' ? 'primary' : 'default'),
    [state.tabKey],
  );

  const buttonHistoryType = useMemo(
    () => (state.tabKey === 'history' ? 'primary' : 'default'),
    [state.tabKey],
  );

  return (
    <Row gutter={[0, 24]} justify="center" align="middle">
      <Col>
        <TabCard>
          <TabButton
            type={buttonPlayListType}
            onClick={() => setState({ tabKey: 'playList' })}
          >
            播放列表
          </TabButton>
          <TabButton
            type={buttonHistoryType}
            onClick={() => setState({ tabKey: 'history' })}
          >
            历史记录
          </TabButton>
        </TabCard>
      </Col>
      <Col span={24}>
        {state.tabKey === 'playList' ? <PlayTableList /> : <HistoryTableList />}
      </Col>
    </Row>
  );
};
export default MPlayMenuList;
