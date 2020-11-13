import React, { useState } from "react";
import { connect, Link, useParams } from "umi";
import { useSetState, useMount, useUpdateEffect } from "ahooks";
import { Row, Pagination, Card } from "antd";
import styled from "styled-components";
import { DetailModelState } from "@/models/detail";
import { ConnectProps, ConnectState } from "@/models/connect";
import { Text } from "@/components/style";
import { CommentTextArea, CommentItem } from "@/components/comment";

interface Props extends ConnectProps {
  detail: DetailModelState;
  submitting?: boolean;
  activeKey: string;
}

interface StateType {
  pagination: {
    pageNum?: number;
    pageSize?: number;
  };
  comment: {
    list: any[];
    total: number;
  };
}

interface Params {
  id?: string;
}

const Container = styled.div`
  margin-top: 16px;
`;

const Box = styled(Card)`
  .ant-card-body {
    padding: 0;
  }
`;

const Reply = styled(Text)`
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 6px;
  background-color: #f5f5f5;
`;

const App: React.FC<Props> = props => {
  const {
    detail: { comment },
    dispatch,
    submitting,
    activeKey
  } = props;

  const params = useParams<Params>();

  const [state, setState] = useSetState<StateType>({
    comment: {
      list: [],
      total: 0
    },
    pagination: {
      pageNum: 1,
      pageSize: 50
    }
  });

  const [textArea, setTextArea] = useState("");

  useMount(() => {
    if (dispatch) {
      dispatch({
        type: "detail/queryCommentsAsync",
        id: params.id,
        ...state.pagination
      });
    }
  });

  useUpdateEffect(() => {
    if (activeKey === "comment" && dispatch) {
      dispatch({
        type: "detail/queryCommentsAsync",
        id: params.id,
        ...state.pagination
      });
    }
  }, [activeKey, dispatch, params.id, state.pagination]);

  useUpdateEffect(() => {
    setState({ comment });
  }, [comment, setState]);

  const handleCurrentChange = (pageNum: number, pageSize?: number) => {
    setState({ pagination: { pageNum, pageSize } });
  };

  const handleSizeChange = (pageNum: number, pageSize: number) => {
    setState({ pagination: { pageNum, pageSize } });
  };

  return (
    <Container>
      <CommentTextArea rows={3} placeholder="输入评论或@朋友" allowClear count={140 - textArea.length} value={textArea} onChange={setTextArea} />
      <Box loading={submitting} bordered={false}>
        {state.comment.list.map((item: any) => (
          <CommentItem
            key={item.commentId}
            avatar={item.user.avatarUrl}
            review={
              <p>
                <Text size={14}>
                  <Link to="/">{item.user.nickname}:&nbsp;</Link>
                  {item.content}
                </Text>
              </p>
            }
            reply={
              <>
                {item.beReplied.map((chat: any) => (
                  <Reply key={chat.beRepliedCommentId}>
                    <Link to="/">{chat.user.nickname}:&nbsp;</Link>
                    <Text>{chat.content}</Text>
                  </Reply>
                ))}
              </>
            }
            createTime={item.time}
            likedCount={item.likedCount}
          />
        ))}
        <br />
        <Row align="middle" justify="center">
          <Pagination
            size="small"
            total={state.comment.total}
            current={state.pagination.pageNum}
            pageSize={state.pagination.pageSize}
            pageSizeOptions={["20", "30", "50", "100"]}
            onChange={handleCurrentChange}
            onShowSizeChange={handleSizeChange}
            showSizeChanger
            showQuickJumper
          />
        </Row>
      </Box>
    </Container>
  );
};

export const DetailPlaylistComments = connect(({ detail, loading }: ConnectState) => ({
  detail,
  submitting: loading.effects["detail/queryCommentsAsync"]
}))(App);
