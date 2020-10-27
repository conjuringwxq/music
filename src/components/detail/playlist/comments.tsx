import React from 'react';
import { connect, Link, useParams } from 'umi';
import { useSetState, useMount, useUpdateEffect } from 'ahooks';
import {
  Row,
  Col,
  Pagination,
  Card,
  Divider,
  Tooltip,
  Input,
  Space,
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
import { Text, RaiseButton, Image } from '@/components/style';

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

const Container = styled.div`
  margin-top: 16px;
`;

const Control = styled(Row)`
  margin: 8px auto;
`;

const TextAreaBox = styled.div`
  position: relative;

  textarea {
    border-radius: 6px;
  }
`;

const TextAreaCount = styled(Text)`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

const Box = styled.div`
  margin-left: 10px;
`;

const Review = styled(Text)`
  display: block;
  margin-bottom: 10px;
`;

const Reply = styled(Text)`
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 6px;
  background-color: #f5f5f5;
`;

const CardBox = styled(Card)`
  .ant-card-body {
    padding: 0;
  }
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
    <Container>
      <TextAreaBox>
        <TextArea
          rows={3}
          value={state.form.textArea}
          placeholder="输入评论或@朋友"
          onChange={(event) =>
            setState({ form: { textArea: event.target.value } })
          }
          allowClear
        />
        <TextAreaCount color="#a9a9a9">
          {140 - state.form.textArea.length}
        </TextAreaCount>
      </TextAreaBox>
      <Control align="middle" justify="space-between">
        <Col>
          <Space>
            <Text size={18}>
              <SmileOutlined />
            </Text>
            <Text size={18}>
              <Icon type="icon-aite" />
            </Text>
            <Text size={18}>
              <NumberOutlined />
            </Text>
          </Space>
        </Col>
        <Col>
          <RaiseButton>评论</RaiseButton>
        </Col>
      </Control>
      <CardBox loading={submitting} bordered={false}>
        {state.comment.list.map((item: any, index: number) => (
          <Row justify="space-between" key={item.commentId}>
            <Col span={1}>
              <Image src={item.user.avatarUrl} shape="circle" />
            </Col>
            <Col span={23}>
              <Box>
                <Review size={14}>
                  <Link to="/">{item.user.nickname}:&nbsp;</Link>
                  <Text size={14}>{item.content}</Text>
                </Review>
                {item.beReplied.map((chat: any) => (
                  <Reply key={chat.beRepliedCommentId}>
                    <Link to="/">{chat.user.nickname}:&nbsp;</Link>
                    <Text>{chat.content}</Text>
                  </Reply>
                ))}
                <Row align="middle" justify="space-between">
                  <Col>
                    <Tooltip
                      placement="right"
                      title={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}
                      color="#3570bf"
                    >
                      <Text color="#a9a9a9">{moment(item.time).fromNow()}</Text>
                    </Tooltip>
                  </Col>
                  <Col>
                    <Text color="#a9a9a9">
                      <Space>
                        <LikeOutlined />
                        {item.likedCount !== 0 && item.likedCount}
                      </Space>
                      <Divider type="vertical" />
                      <ShareAltOutlined />
                      <Divider type="vertical" />
                      <MessageOutlined />
                    </Text>
                  </Col>
                </Row>
                {index === state.comment.list.length - 1 || <Divider />}
              </Box>
            </Col>
          </Row>
        ))}
        <br />
        <Row align="middle" justify="center">
          <Pagination
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
    </Container>
  );
};

export default connect(({ detail, loading }: ConnectState) => ({
  detail,
  submitting: loading.effects['detail/queryCommentsAsync'],
}))(DetailPlaylistComments);
