import React, { useEffect } from "react";
import { Tabs, Pagination, Row } from "antd";
import { connect, SearchModelState, useHistory, useParams } from "umi";
import { useSetState } from "ahooks";
import { ConnectProps, ConnectState } from "@/models/connect";
import { SearchSingle, SearchSinger, SearchAlbum, SearchVideo, SearchPlayList, SearchLyric, SearchRadio, SearchUser, SearchMv, SearchSynthesize } from "@/components/search";

export enum SearchActiveKey {
  Single = "1",
  Singer = "100",
  Album = "10",
  Video = "1014",
  PlayList = "1000",
  Lyric = "1006",
  Radio = "1009",
  User = "1002",
  Mv = "1004",
  Synthesize = "1018"
}

export interface SearchItemProps {
  loading?: boolean;
  data?: any[];
  total?: number;
  pageNum?: number;
  pageSize?: number;
}

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
  key: SearchActiveKey;
  value: string;
  total: number;
  component: JSX.Element;
}

const { TabPane } = Tabs;

const Search: React.FC<SearchProps> = props => {
  const {
    search: { result },
    dispatch,
    submitting
  } = props;

  const history = useHistory();
  const { keywords, type } = useParams<Params>();

  const [state, setState] = useSetState<StateType>({
    activeKey: SearchActiveKey.Single,
    pageNum: 1,
    pageSize: 100
  });

  const searchResultMap: SearchResult[] = [
    {
      key: SearchActiveKey.Single,
      value: "单曲",
      total: result.songCount || 0,
      component: <SearchSingle loading={submitting} data={result.songs} pageNum={state.pageNum} pageSize={state.pageSize} />
    },
    {
      key: SearchActiveKey.Singer,
      value: "歌手",
      total: result.artistCount || 0,
      component: <SearchSinger loading={submitting} data={result.artists} />
    },
    {
      key: SearchActiveKey.Album,
      value: "专辑",
      total: result.albumCount || 0,
      component: <SearchAlbum loading={submitting} data={result.albums} />
    },
    {
      key: SearchActiveKey.Video,
      value: "视频",
      total: result.videoCount || 0,
      component: <SearchVideo loading={submitting} data={result.videos} />
    },
    {
      key: SearchActiveKey.PlayList,
      value: "歌单",
      total: result.playlistCount || 0,
      component: <SearchPlayList loading={submitting} data={result.playlists} />
    },
    {
      key: SearchActiveKey.Lyric,
      value: "歌词",
      total: result.songCount || 0,
      component: <SearchLyric loading={submitting} data={result.songs} pageNum={state.pageNum} pageSize={state.pageSize} />
    },
    {
      key: SearchActiveKey.Radio,
      value: "主播电台",
      total: result.djRadiosCount || 0,
      component: <SearchRadio loading={submitting} data={result.djRadios} />
    },
    {
      key: SearchActiveKey.User,
      value: "用户",
      total: result.userprofileCount || 0,
      component: <SearchUser loading={submitting} data={result.userprofiles} />
    },
    {
      key: SearchActiveKey.Mv,
      value: "MV",
      total: result.mvCount || 0,
      component: <SearchMv loading={submitting} data={result.mvs} />
    },
    {
      key: SearchActiveKey.Synthesize,
      value: "综合",
      total: result.songCount || 0,
      component: <SearchSynthesize loading={submitting} data={result} />
    }
  ];

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "search/querySearchByType",
        keywords,
        ...state
      });
    }
  }, [dispatch, keywords, state]);

  // 根据 url 上路径变化来对应相应的 activeKey，为了实现返回上一页功能
  useEffect(() => {
    setState({ activeKey: type });
  }, [setState, type]);

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
            <Pagination size="small" hideOnSinglePage showSizeChanger={false} total={total} current={state.pageNum} pageSize={state.pageSize} onChange={onChange} />
          </Row>
        </TabPane>
      ))}
    </Tabs>
  );
};

export default connect(({ search, loading }: ConnectState) => ({
  search,
  submitting: loading.effects["search/querySearchByType"]
}))(Search);
