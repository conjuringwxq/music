import React from 'react';
import styled from 'styled-components';
import { Row, Col, Input } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  SettingOutlined,
  MailOutlined,
  SkinOutlined,
  ExpandOutlined,
} from '@ant-design/icons';
import { useHistory } from 'umi';
import MNavMenu from './mNavMenu';

const NavPaginationBox = styled(Col)`
  width: 300px;
  text-align: right;

  span:first-child {
    margin-right: 8px;
  }
`;

const NavControlBox = styled(Col)`
  width: calc(100% - 300px);

  input {
    border-radius: 20px;
  }
`;

const MNavBar: React.FC = () => {
  const history = useHistory();

  return (
    <Row>
      <NavPaginationBox>
        <span>
          <LeftOutlined onClick={() => history.go(-1)}/>
        </span>
        <span>
          <RightOutlined onClick={() => history.go(1)}/>
        </span>
      </NavPaginationBox>
      <NavControlBox>
        <Row justify="space-between">
          <Col span={12}>
            <MNavMenu/>
          </Col>
          <Col span={12}>
            <Row justify="end">
              <Col span={8}>
                <Input
                  prefix={<SearchOutlined/>}
                  placeholder="搜索"
                  style={{ borderRadius: '20px' }}
                />
              </Col>
              <Col span={2} offset={2}>
                <SettingOutlined/>
              </Col>
              <Col span={2}>
                <MailOutlined/>
              </Col>
              <Col span={2}>
                <SkinOutlined/>
              </Col>
              <Col span={2}>
                <ExpandOutlined/>
              </Col>
            </Row>
          </Col>
        </Row>
      </NavControlBox>
    </Row>
  );
};

export default MNavBar;
