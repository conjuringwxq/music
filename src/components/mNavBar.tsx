import React from 'react';
import styled from 'styled-components';
import { Row, Col, Input } from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SearchOutlined,
  SettingOutlined,
  MailOutlined,
  SkinOutlined,
  BlockOutlined,
} from '@ant-design/icons';
import { useHistory, useLocation } from 'umi';
import { useSetState, useUpdateEffect } from 'ahooks';
import MNavMenu from './mNavMenu';

const { ipcRenderer } = window.require('electron');

interface StateType {
  path?: string;
  searchValue: string;
}

const NavBox = styled(Row)`
  margin: 0 auto;
  width: 1180px;
`;

const NavPaginationBox = styled(Col)`
  width: 170px;
  text-align: right;

  span:first-child {
    margin-right: 8px;
  }
`;

const NavControlBox = styled(Col)`
  width: calc(100% - 170px);

  input {
    border-radius: 20px;
  }
`;

const SettingIcon = styled(SettingOutlined)`
  cursor: pointer;
  color: ${(props: { path?: string }) =>
    props.path === '/setting' && '#3570bf'};
`;
const MailIcon = styled(MailOutlined)`
  cursor: pointer;
`;
const SkinIcon = styled(SkinOutlined)`
  cursor: pointer;
`;
const BlockOutIcon = styled(BlockOutlined)`
  cursor: pointer;
  transform: rotate(90deg);
`;

const BackNavigationIconButton = styled(ArrowLeftOutlined)`
  cursor: pointer;
  margin-right: 10px;
`;

const ForwardNavigationIconButton = styled(ArrowRightOutlined)`
  cursor: pointer;
`;

const InputTextField = styled(Input)`
  border-radius: 20px;
`;

const MNavBar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [state, setState] = useSetState<StateType>({
    searchValue: '',
  });

  useUpdateEffect(() => {
    setState({ path: location.pathname });
  }, [location.pathname]);

  const changeFullScreen = () => {
    ipcRenderer.send('changeFullScreen');
  };

  const handleSearch = () => {
    history.push(`/search/${state.searchValue}`);
  };

  return (
    <NavBox>
      <NavPaginationBox>
        <BackNavigationIconButton onClick={() => history.go(-1)} />
        <ForwardNavigationIconButton onClick={() => history.go(1)} />
      </NavPaginationBox>
      <NavControlBox>
        <Row justify="space-between">
          <Col span={14}>
            <MNavMenu />
          </Col>
          <Col span={10}>
            <Row justify="space-between">
              <Col span={14}>
                <InputTextField
                  prefix={<SearchOutlined onClick={handleSearch} />}
                  value={state.searchValue}
                  onChange={(event) =>
                    setState({ searchValue: event.target.value })
                  }
                  onPressEnter={handleSearch}
                  placeholder="搜索"
                  allowClear
                />
              </Col>
              <Col span={10}>
                <Row justify="end">
                  <Col span={5}>
                    <SettingIcon
                      path={state.path}
                      onClick={() => history.push('/setting')}
                    />
                  </Col>
                  <Col span={5}>
                    <MailIcon />
                  </Col>
                  <Col span={5}>
                    <SkinIcon />
                  </Col>
                  <Col span={5}>
                    <BlockOutIcon onClick={changeFullScreen} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </NavControlBox>
    </NavBox>
  );
};

export default MNavBar;
