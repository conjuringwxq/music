import React from 'react';
import { Tabs } from 'antd';
import {
  connect,
  ConnectProps,
  SearchModelState,
  useHistory,
  useParams,
} from 'umi';
import { useMount, useSetState } from 'ahooks';
import { ConnectState } from '@/models/connect';
import {
  SearchSingle,
  SearchSinger,
  SearchAlbum,
  SearchVideo,
  SearchPlayList,
  SearchLyric,
  SearchRadio,
  SearchUser,
  SearchMv,
  SearchSynthesize,
} from '@/components/search';

export interface SearchItemProps {
  loading?: boolean;
  data: {
    songs?: any[];
  };
}

interface SearchProps extends ConnectProps {
  search: SearchModelState;
  submitting?: boolean;
}

interface StateType {
  activeKey: string;
}

interface Params {
  keywords: string;
  type: string;
}

const { TabPane } = Tabs;

const Search: React.FC<SearchProps> = (props) => {
  const {
    search: { result },
    dispatch,
    submitting,
  } = props;

  const history = useHistory();
  const { keywords } = useParams<Params>();

  const [state, setState] = useSetState<StateType>({
    activeKey: '1',
  });

  const searchResultMap = [
    {
      key: '1',
      value: '单曲',
      component: <SearchSingle loading={submitting} data={result} />,
    },
    {
      key: '100',
      value: '歌手',
      component: <SearchSinger loading={submitting} data={result} />,
    },
    {
      key: '10',
      value: '专辑',
      component: <SearchAlbum loading={submitting} data={result} />,
    },
    {
      key: '1014',
      value: '视频',
      component: <SearchVideo loading={submitting} data={result} />,
    },
    {
      key: '1000',
      value: '歌单',
      component: <SearchPlayList loading={submitting} data={result} />,
    },
    {
      key: '1006',
      value: '歌词',
      component: <SearchLyric loading={submitting} data={result} />,
    },
    {
      key: '1009',
      value: '主播电台',
      component: <SearchRadio loading={submitting} data={result} />,
    },
    {
      key: '1002',
      value: '用户',
      component: <SearchUser loading={submitting} data={result} />,
    },
    {
      key: '1004',
      value: 'MV',
      component: <SearchMv loading={submitting} data={result} />,
    },
    {
      key: '1018',
      value: '综合',
      component: <SearchSynthesize loading={submitting} data={result} />,
    },
  ];

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
    <>
      <Tabs activeKey={state.activeKey} onChange={handleTabsChange}>
        {searchResultMap.map((route) => (
          <TabPane tab={route.value} key={route.key}>
            {route.component}
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};

export default connect(({ search, loading }: ConnectState) => ({
  search,
  submitting: loading.effects['search/querySearchByType'],
}))(Search);
