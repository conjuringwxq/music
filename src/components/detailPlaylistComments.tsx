import React from 'react';
import { connect, Link, useParams } from 'umi';
import { useSetState, useMount, useUpdateEffect } from 'ahooks';
import {
  Row,
  Col,
  Pagination,
  Card,
  Button,
  Avatar,
  Divider,
  Tooltip,
  Input,
} from 'antd';
import {
  SmileOutlined,
  LikeOutlined,
  ShareAltOutlined,
  MessageOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import moment from 'moment';
import { DetailModelState } from '@/models/detail';
import { ConnectProps, ConnectState } from '@/models/connect';
import Icon from '@/utils/iconfont';

const { TextArea } = Input;

interface Props extends ConnectProps {
  detail: DetailModelState;
  submitting?: boolean;
  activeKey: string;
}

interface StateType {
  form: {
    textArea: string;
  };
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

const CommentContainer = styled.div`
  margin-top: 16px;

  .control {
    margin: 8px auto;
  }

  .icon {
    margin-right: 8px;
    font-size: 18px;
  }
`;

const CommentTextAreaBox = styled.div`
  position: relative;

  textarea {
    border-radius: 6px;
  }

  .maxLength {
    position: absolute;
    color: #a9a9a9;
    right: 10px;
    bottom: 10px;
  }
`;

const CommentListItem = styled(Row)``;

const GridCol = styled(Col)`
  &.comment-content-box {
    padding-left: 8px;

    .content {
      span {
        color: #333;
      }
    }

    .replay {
      padding: 8px;
      font-size: 12px;
      border-radius: 6px;
      background-color: #f5f5f5;
    }

    .time {
      font-size: 12px;
      color: #a9a9a9;
    }

    .icon {
      cursor: pointer;
      font-size: 14px;
      color: #a9a9a9;
    }

    .like-content {
      font-size: 12px;
      color: #a9a9a9;
    }
  }
`;

const CommentPagination = styled(Pagination)`
  &.ant-pagination.mini .ant-pagination-item {
    border-radius: 50%;
  }
`;

const CardBox = styled(Card)`
  .ant-card-body {
    padding: 0;
  }
`;

const RaiseButton = styled(Button)`
  border-radius: 20px;
`;

const DetailPlaylistComments: React.FC<Props> = (props) => {
  const {
    detail: { comment },
    dispatch,
    submitting,
    activeKey,
  } = props;

  const params = useParams<Params>();

  const [state, setState] = useSetState<StateType>({
    comment: {
      list: [],
      total: 0,
    },
    pagination: {
      pageNum: 1,
      pageSize: 50,
    },
    form: {
      textArea: '',
    },
  });

  useMount(() => {
    if (dispatch) {
      dispatch({
        type: 'detail/queryCommentsAsync',
        id: params.id,
        ...state.pagination,
      });
    }
  });

  useUpdateEffect(() => {
    if (activeKey === 'comment' && dispatch) {
      dispatch({
        type: 'detail/queryCommentsAsync',
        id: params.id,
        ...state.pagination,
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
    <CommentContainer>
      <CommentTextAreaBox>
        <TextArea
          rows={3}
          value={state.form.textArea}
          placeholder="输入评论或@朋友"
          onChange={(event) =>
            setState({ form: { textArea: event.target.value } })
          }
          allowClear
        />
        <span className="maxLength">{140 - state.form.textArea.length}</span>
      </CommentTextAreaBox>
      <Row className="control" align="middle" justify="space-between">
        <Col>
          <SmileOutlined className="icon" />
          <Icon className="icon" type="icon-aite" />
          <NumberOutlined className="icon" />
        </Col>
        <Col>
          <RaiseButton>评论</RaiseButton>
        </Col>
      </Row>
      <CardBox loading={submitting} bordered={false}>
        {state.comment.list.map((item: any, index: number) => (
          <CommentListItem justify="space-between" key={item.commentId}>
            <GridCol span={1}>
              <Avatar src={item.user.avatarUrl} shape="circle" />
            </GridCol>
            <GridCol span={23} className="comment-content-box">
              <p className="content">
                <Link to="/">{item.user.nickname}:&nbsp;</Link>
                <span>{item.content}</span>
              </p>
              {item.beReplied.map((chat: any) => (
                <p className="replay" key={chat.beRepliedCommentId}>
                  <Link to="/">{chat.user.nickname}:&nbsp;</Link>
                  <span>{chat.content}</span>
                </p>
              ))}
              <Row align="middle" justify="space-between">
                <Col>
                  <Tooltip
                    placement="right"
                    title={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}
                    color="#3570bf"
                  >
                    <div className="time">{moment(item.time).fromNow()}</div>
                  </Tooltip>
                </Col>
                <Col>
                  <LikeOutlined className="icon" />
                  {item.likedCount !== 0 && (
                    <span className="like-content">{item.likedCount}</span>
                  )}
                  <Divider type="vertical" />
                  <ShareAltOutlined className="icon" />
                  <Divider type="vertical" />
                  <MessageOutlined className="icon" />
                </Col>
              </Row>
              {index === state.comment.list.length - 1 || <Divider />}
            </GridCol>
          </CommentListItem>
        ))}
        <br />
        <Row align="middle" justify="center">
          <CommentPagination
            size="small"
            total={state.comment.total}
            current={state.pagination.pageNum}
            pageSize={state.pagination.pageSize}
            pageSizeOptions={['20', '30', '50', '100']}
            onChange={handleCurrentChange}
            onShowSizeChange={handleSizeChange}
            showSizeChanger
            showQuickJumper
          />
        </Row>
      </CardBox>
    </CommentContainer>
  );
};

export default connect(({ detail, loading }: ConnectState) => ({
  detail,
  submitting: loading.effects['detail/queryCommentsAsync'],
}))(DetailPlaylistComments);
