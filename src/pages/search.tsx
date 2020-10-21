import React from 'react';
import { Card, Tabs } from 'antd';
import { connect, ConnectProps, useHistory, useParams } from 'umi';
import { useMount, useSetState } from 'ahooks';
import { ConnectState } from '@/models/connect';

interface SearchProps extends ConnectProps {
  children: React.ReactNode;
}

interface StateType {
  activeKey: string;
}

interface Params {
  keywords: string;
  type: string;
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
  const { children, dispatch } = props;

  const history = useHistory();
  const { keywords } = useParams<Params>();

  const [state, setState] = useSetState<StateType>({
    activeKey: '1',
  });

  useMount(() => {
    if (dispatch) {
      dispatch({
        type: 'search/querySearchByType',
        keywords,
        activeKey: state.activeKey,
      });
    }
  });

  /**
   * @description 切换 tab 方法
   * @param activeKey 激活的 tab 的 key
   */
  const handleTabsChange = (activeKey: string) => {
    setState({ activeKey });
    history.push(`/search/${keywords}/${activeKey}`);
    if (dispatch) {
      dispatch({
        type: 'search/querySearchByType',
        keywords,
        activeKey,
      });
    }
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

export default connect(({ search, loading }: ConnectState) => ({
  search,
  submitting: loading.effects['search/querySearchByType'],
}))(Search);
