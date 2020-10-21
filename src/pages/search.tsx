import React from 'react';
import { Card, Tabs } from 'antd';
import { useHistory, useParams } from 'umi';
import { useSetState } from 'ahooks';

interface SearchProps {
  children: React.ReactNode;
}

interface StateType {
  activeKey: string;
}

interface Params {
  keywords: string;
}

const { TabPane } = Tabs;

const searchResultMap = {
  1: '单曲',
  100: '歌手',
  10: '专辑',
  1014: '视频',
  1000: '歌单',
  1006: '歌词',
  1009: '主播电台',
  1002: '用户',
  1004: 'MV',
  1018: '综合',
};

const Search: React.FC<SearchProps> = (props) => {
  const { children } = props;
  const history = useHistory();
  const { keywords } = useParams<Params>();
  const [state, setState] = useSetState<StateType>({
    activeKey: Object.keys(searchResultMap)[0],
  });

  const handleTabsChange = (activeKey: string) => {
    setState({ activeKey });
    history.push(`/search/${keywords}/${activeKey}`);
  };

  return (
    <Card bordered={false}>
      <Tabs activeKey={state.activeKey} onChange={handleTabsChange}>
        {Object.entries(searchResultMap).map(([key, value]) => (
          <TabPane tab={value} key={key}>
            {children}
          </TabPane>
        ))}
      </Tabs>
    </Card>
  );
};

export default Search;
