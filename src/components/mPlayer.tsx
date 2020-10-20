import React from 'react';
import { Row, Col } from 'antd';
import {
  HeartOutlined,
  PlayCircleFilled,
  PauseCircleFilled,
  StepBackwardFilled,
  StepForwardFilled,
  MenuUnfoldOutlined,
  LockOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import Icon from '@/utils/iconfont';

const Part = styled(Col)`
  .icon {
    color: #fff;
    transition: all 0.3s ease;

    &:hover {
      color: #3570bf;
      cursor: pointer;
    }

    &-auto {
      font-size: 18px;
    }

    &-large {
      font-size: 32px;
    }
  }
`;

const PartBox = styled(Row)`
  height: 100%;
`;

const PlayPoster = styled.img`
  border-radius: 6px;
  width: 44px;
  height: 44px;
`;

const Text = styled.span`
  &.main {
    font-size: 14px;
    color: #fff;
  }

  &.intro {
    font-size: 12px;
    color: #c9c9c9;
  }
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

const MPlayer: React.FC = () => {
  return (
    <>
      <Row>
        <Part span={8}>
          <PartBox gutter={[16, 0]} align="middle">
            <Col>
              <PlayPoster
                src="//imagev2.xmcdn.com/group47/M02/53/0A/wKgKk1ufCSKyQnThAAEhCDo_C-M319.jpg!op_type=5&upload_type=album&device_type=ios&name=mobile_large&magick=webp"
                alt=""
              />
            </Col>
            <Col>
              <Text className="main">末班飞行</Text>
              <Text className="intro"> - </Text>
              <Text className="intro">往苏龙</Text>
              <br />
              <Text className="intro">00:02 / 04:07</Text>
            </Col>
          </PartBox>
        </Part>
        <Part span={8}>
          <PartBox gutter={[24, 0]} justify="center" align="middle">
            <Col>
              <HeartOutlined className="icon icon-auto" />
            </Col>
            <Col>
              <StepBackwardFilled className="icon icon-auto" />
            </Col>
            <Col>
              <PlayCircleFilled className="icon icon-large" />
            </Col>
            <Col>
              <StepForwardFilled className="icon icon-auto" />
            </Col>
            <Col>
              <Icon className="icon icon-auto" type="icon-Share" />
            </Col>
          </PartBox>
          {/* <PauseCircleFilled /> */}
        </Part>
        <Part span={8}>
          <PartBox gutter={[16, 0]} justify="end" align="middle">
            <Col>
              <MenuUnfoldOutlined className="icon icon-auto" />
            </Col>
            <Col>
              <Icon className="icon icon-auto" type="icon-volume-high" />
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

export default MPlayer;
