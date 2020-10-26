import React, { useEffect } from 'react';
import { Tabs, Pagination, Row } from 'antd';
import { connect, SearchModelState, useHistory, useParams } from 'umi';
import { useSetState } from 'ahooks';
import styled from 'styled-components';
import { ConnectProps, ConnectState } from '@/models/connect';
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
  data?: any[];
  total?: number;
  pageNum?: number;
  pageSize?: number;
}

interface AvatarProps {
  size: number;
  shape: 'square' | 'circle';
}

export const Avatar = styled.img`
  border-radius: ${({ shape = 'circle' }: AvatarProps) =>
    shape === 'circle' ? '50%' : '6px'};
  width: ${({ size = 40 }: AvatarProps) => `${size}px`};
  height: ${({ size = 40 }: AvatarProps) => `${size}px`};
`;

interface SearchProps extends ConnectProps {
  search: SearchModelState;
  submitting?: boolean;
}

interface StateType {
  activeKey: string;
  pageNum?: number;
  pageSize?: number;
}

interface Params {
  keywords: string;
  type: string;
}

interface SearchResult {
  key: string;
  value: string;
  total: number;
  component: JSX.Element;
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
    pageNum: 1,
    pageSize: 100,
  });

  const searchResultMap: SearchResult[] = [
    {
      key: '1',
      value: '单曲',
      total: result.songCount || 0,
      component: (
        <SearchSingle
          loading={submitting}
          data={result.songs}
          pageNum={state.pageNum}
          pageSize={state.pageSize}
        />
      ),
    },
    {
      key: '100',
      value: '歌手',
      total: result.artistCount || 0,
      component: <SearchSinger loading={submitting} data={result.artists} />,
    },
    {
      key: '10',
      value: '专辑',
      total: result.albumCount || 0,
      component: <SearchAlbum loading={submitting} data={result.albums} />,
    },
    {
      key: '1014',
      value: '视频',
      total: result.videoCount || 0,
      component: <SearchVideo loading={submitting} data={result.videos} />,
    },
    {
      key: '1000',
      value: '歌单',
      total: result.playlistCount || 0,
      component: (
        <SearchPlayList loading={submitting} data={result.playlists} />
      ),
    },
    {
      key: '1006',
      value: '歌词',
      total: result.songCount || 0,
      component: (
        <SearchLyric
          loading={submitting}
          data={result.songs}
          pageNum={state.pageNum}
          pageSize={state.pageSize}
        />
      ),
    },
    {
      key: '1009',
      value: '主播电台',
      total: result.djRadiosCount || 0,
      component: <SearchRadio loading={submitting} data={result.djRadios} />,
    },
    {
      key: '1002',
      value: '用户',
      total: result.userprofileCount || 0,
      component: <SearchUser loading={submitting} data={result.userprofiles} />,
    },
    {
      key: '1004',
      value: 'MV',
      total: result.mvCount || 0,
      component: <SearchMv loading={submitting} data={result.mvs} />,
    },
    {
      key: '1018',
      value: '综合',
      total: result.songCount || 0,
      component: <SearchSynthesize loading={submitting} data={result} />,
    },
  ];

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'search/querySearchByType',
        keywords,
        ...state,
      });
    }
  }, [dispatch, keywords, state]);

  /**
   * @description 切换 tab 方法
   * @param activeKey 激活的 tab 的 key
   */
  const handleTabsChange = (activeKey: string) => {
    setState({ activeKey, pageNum: 1, pageSize: 100 });
    history.push(`/search/${keywords}/${activeKey}`);
  };

  /**
   * @description 分页器切换的监听
   * @param pageNum 当前页码
   * @param pageSize 每页条目
   */
  const onChange = (pageNum: number, pageSize?: number) => {
    setState({ pageNum, pageSize });
  };

  return (
    <Tabs activeKey={state.activeKey} onChange={handleTabsChange}>
      {searchResultMap.map(({ value, key, component, total }) => (
        <TabPane tab={value} key={key}>
          {component}
          <br />
          <Row justify="center">
            <Pagination
              size="small"
              hideOnSinglePage
              showSizeChanger={false}
              total={total}
              current={state.pageNum}
              pageSize={state.pageSize}
              onChange={onChange}
            />
          </Row>
        </TabPane>
      ))}
    </Tabs>
  );
};

export default connect(({ search, loading }: ConnectState) => ({
  search,
  submitting: loading.effects['search/querySearchByType'],
}))(Search);
