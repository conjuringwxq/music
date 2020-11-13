import React from "react";
import { connect, useParams } from "umi";
import { useSetState, useMount, useUpdateEffect } from "ahooks";
import { Row, Col, Card } from "antd";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { DetailModelState } from "@/models/detail";
import { ConnectProps, ConnectState } from "@/models/connect";
import { Text, Image } from "@/components/style";

interface Props extends ConnectProps {
  detail: DetailModelState;
  submitting?: boolean;
  activeKey: string;
}

interface StateType {
  collector: {
    list: any[];
    total: number;
  };
  pagination: {
    pageNum?: number;
    pageSize?: number;
  };
}

interface Params {
  id?: string;
}

const CardBox = styled(Card)`
  .ant-card-body {
    padding: 0;
  }
`;

const Gender = styled.span`
  .icon {
    padding: 4px;
    border-radius: 50%;
    margin-left: 10px;
    font-size: 12px;

    &.blue {
      background-color: #c3f3fe;
      color: #3b9dcd;
    }

    &.pink {
      background-color: #fecee7;
      color: #e6548e;
    }
  }
`;

const App: React.FC<Props> = props => {
  const {
    detail: { collector },
    dispatch,
    submitting,
    activeKey
  } = props;

  const params = useParams<Params>();

  const [state, setState] = useSetState<StateType>({
    collector: {
      list: [],
      total: 0
    },
    pagination: {
      pageNum: 1,
      pageSize: 50
    }
  });

  useMount(() => {
    if (dispatch) {
      dispatch({
        type: "detail/queryCollectorAsync",
        id: params.id,
        ...state.pagination
      });
    }
  });

  useUpdateEffect(() => {
    if (activeKey === "like" && dispatch) {
      dispatch({
        type: "detail/queryCollectorAsync",
        id: params.id,
        ...state.pagination
      });
    }
  }, [activeKey, dispatch, params.id, state.pagination]);

  useUpdateEffect(() => {
    setState({ collector });
  }, [collector, setState]);

  return (
    <>
      <br />
      <CardBox loading={submitting} bordered={false}>
        <Row gutter={[16, 16]}>
          {state.collector.list.map(item => (
            <Col key={item.userId} span={8}>
              <Row align="middle" justify="space-between">
                <Col span={8}>
                  <Image src={item.avatarUrl} shape="circle" size={80} />
                </Col>
                <Col span={16}>
                  <Text size={16}>
                    {item.nickname}
                    <Gender>
                      {item.gender === 0 && <ManOutlined className="icon blue" />}
                      {item.gender === 1 && <WomanOutlined className="icon pink" />}
                    </Gender>
                  </Text>
                  <br />
                  <Text color="#a9a9a9">{item.signature}</Text>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </CardBox>
    </>
  );
};

export const DetailPlaylistCollector = connect(({ detail, loading }: ConnectState) => ({
  detail,
  submitting: loading.effects["detail/queryCollectorAsync"]
}))(App);
