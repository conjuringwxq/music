import React from "react";
import { Row, Col, Slider, Divider, Tooltip } from "antd";
import { HeartOutlined, PlayCircleFilled, PauseCircleFilled, StepBackwardFilled, StepForwardFilled, MenuUnfoldOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useSetState, useUpdateEffect } from "ahooks";
import { ConnectProps } from "@/models/connect";
import { Settings } from "@/models/global";
import Icon from "@/utils/iconfont";
import { Text, Image } from "@/components/style";

interface Props extends ConnectProps {
  data: Settings;
}

interface StateType {
  playMenuListCardVisible: boolean;
  progressValue: number;
  volumeValue: number;
}

const Part = styled(Col)`
  .icon {
    color: #fff;
    transition: all 0.3s ease;

    &:hover {
      color: #3570bf;
      cursor: pointer;
    }
  }
`;

const PartBox = styled(Row)`
  height: 100%;
`;

const Lock = styled.div`
  position: absolute;
  right: 40px;
  top: -14px;
  width: 64px;
  height: 14px;
  transform: perspective(0.5em) scale(1.1, 1.3) rotateX(5deg);
  transform-origin: bottom;
  background-color: rgba(0, 0, 0, 0.85);
  text-align: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  z-index: 999;

  .icon {
    color: #fff;
    transition: all 0.3s ease;
    font-size: 12px;

    &:hover {
      color: #3570bf;
      cursor: pointer;
    }
  }
`;

const DividerLine = styled(Divider)`
  border-left: 1px solid #a9a9a9;
`;

const SliderWidget = styled(Slider)`
  margin-top: 0;
  margin-bottom: 0;
`;

const Volume = styled(Slider)`
  margin-left: 0;
  margin-right: 0;
  height: 150px;
`;

const App: React.FC<Props> = props => {
  const { dispatch, data } = props;
  const [state, setState] = useSetState<StateType>({
    playMenuListCardVisible: false,
    progressValue: 0,
    volumeValue: 0
  });

  const onHandleVisiblePlayMenuListCard = () => {
    setState({ playMenuListCardVisible: !state.playMenuListCardVisible });
    if (dispatch) {
      dispatch({ type: "global/handleChangeTabKey", tabKey: "playList" });
    }
  };

  useUpdateEffect(() => {
    if (dispatch) {
      dispatch({
        type: "global/handleVisiblePlayMenuList",
        visiblePlayMenuList: state.playMenuListCardVisible
      });
    }
  }, [dispatch, state.playMenuListCardVisible]);

  return (
    <>
      <Row>
        <Part flex={1}>
          <PartBox gutter={[16, 0]} align="middle">
            <Col>
              <Image
                src="//imagev2.xmcdn.com/group47/M02/53/0A/wKgKk1ufCSKyQnThAAEhCDo_C-M319.jpg!op_type=5&upload_type=album&device_type=ios&name=mobile_large&magick=webp"
                size={44}
                shape="square"
                alt=""
              />
            </Col>
            <Col>
              <PartBox gutter={[24, 0]} justify="center" align="middle">
                <Col>
                  <Text size={18}>
                    <StepBackwardFilled className="icon" />
                  </Text>
                </Col>
                <Col>
                  <Text size={32}>
                    <PlayCircleFilled className="icon" />
                  </Text>
                </Col>
                <Col>
                  <Text size={18}>
                    <StepForwardFilled className="icon" />
                  </Text>
                </Col>
              </PartBox>
            </Col>
            <Col flex={1}>
              <PartBox justify="center" align="middle">
                <Col span={24}>
                  <Text color="#fff">末班飞行</Text>
                  <Text color="#a9a9a9"> - </Text>
                  <Text color="#a9a9a9">往苏龙</Text>
                </Col>
                <Col span={20}>
                  <SliderWidget value={state.progressValue} tooltipVisible={false} onChange={(progressValue: number) => setState({ progressValue })} />
                </Col>
                <Col span={4}>
                  <Text color="#a9a9a9">00:02 / 04:07</Text>
                </Col>
              </PartBox>
            </Col>
          </PartBox>
        </Part>
        <Part>
          <PartBox gutter={[20, 0]} justify="end" align="middle">
            <Col>
              <Text size={18}>
                <HeartOutlined className="icon" />
              </Text>
            </Col>
            <Col>
              <Text size={18}>
                <Icon className="icon" type="icon-Share" />
              </Text>
            </Col>
            <DividerLine type="vertical" />
            <Col>
              <Tooltip placement="top" trigger="click" title={<Volume vertical value={state.volumeValue} onChange={(volumeValue: number) => setState({ volumeValue })} />}>
                <Text size={18}>
                  <Icon className="icon" type="icon-volume-high" />
                </Text>
              </Tooltip>
            </Col>
            <Col>
              <Text size={18}>
                <MenuUnfoldOutlined className="icon" onClick={onHandleVisiblePlayMenuListCard} />
              </Text>
            </Col>
          </PartBox>
        </Part>
      </Row>
      <Lock>
        <LockOutlined className="icon" />
      </Lock>
    </>
  );
};

export const PlayerMain = App;
