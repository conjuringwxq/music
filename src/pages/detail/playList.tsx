import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Tabs, Input } from "antd";
import { useSetState, useMount, useUpdateEffect } from "ahooks";
import { connect, useParams } from "umi";
import moment from "moment";
import { ConnectProps, ConnectState } from "@/models/connect";
import { DetailModelMessage, DetailModelState } from "@/models/detail";
import styled from "styled-components";
import { DetailPlaylistIntroduce, DetailPlaylistTableList, DetailPlaylistComments, DetailPlaylistCollector } from "@/components/detail";

moment.locale("zh-CN");

interface DetailPlayListProps extends ConnectProps {
  detail: DetailModelState;
  submitting?: boolean;
}

interface StateType {
  activeKey: string;
  message: DetailModelMessage;
}

const { TabPane } = Tabs;

const DetailTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 0 !important;
    z-index: 1;
    background: #fff;
  }
`;

const SearchInput = styled(Input)`
  border: none;
  border-radius: 20px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const tabBarExtraContent = <SearchInput placeholder="搜索歌单音乐" prefix={<SearchOutlined />} bordered={false} allowClear />;

const DetailPlayList: React.FC<DetailPlayListProps> = props => {
  const params = useParams<{ id?: string }>();

  const [state, setState] = useSetState<StateType>({
    activeKey: "playList",
    message: {
      tracks: [],
      commentCount: 0
    }
  });

  const {
    detail: { message },
    dispatch,
    submitting
  } = props;

  useMount(() => {
    if (dispatch) {
      dispatch({ type: "detail/queryMessageAsync", id: params.id });
    }
  });

  useUpdateEffect(() => {
    if (state.activeKey === "playList" && dispatch) {
      dispatch({ type: "detail/queryMessageAsync", id: params.id });
    }
  }, [state.activeKey, dispatch, params.id]);

  useUpdateEffect(() => {
    setState({
      message: {
        ...message,
        tracks: message?.tracks.map((item: any, index: number) => ({
          key: index,
          ...item
        }))
      }
    });
  }, [message, setState]);

  const handleTabsChange = (activeKey: string) => setState({ activeKey });

  return (
    <>
      <DetailPlaylistIntroduce data={state.message} loading={submitting} />
      <DetailTabs activeKey={state.activeKey} tabBarExtraContent={state.activeKey === "playList" && tabBarExtraContent} onChange={handleTabsChange}>
        <TabPane tab="歌曲列表" key="playList">
          <DetailPlaylistTableList data={state.message.tracks} loading={submitting} />
        </TabPane>
        <TabPane tab={`评论 (${state.message.commentCount})`} key="comment">
          <DetailPlaylistComments activeKey={state.activeKey} />
        </TabPane>
        <TabPane tab="收藏者" key="like">
          <DetailPlaylistCollector activeKey={state.activeKey} />
        </TabPane>
      </DetailTabs>
    </>
  );
};

export default connect(({ detail, loading }: ConnectState) => ({
  detail,
  submitting: loading.effects["detail/queryMessageAsync"]
}))(DetailPlayList);
