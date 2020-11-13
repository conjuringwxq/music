import React from "react";
import styled from "styled-components";
import { Row, Col, Input, message, Space, Button } from "antd";
import { LeftOutlined, RightOutlined, SearchOutlined, SettingOutlined, MailOutlined, SkinOutlined, BlockOutlined } from "@ant-design/icons";
import { useHistory, useLocation, Link } from "umi";
import { useSetState, useUpdateEffect } from "ahooks";
import { SearchActiveKey } from "@/pages/search";

// const { ipcRenderer } = window.require('electron');

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

  .ant-input-affix-wrapper {
    border-radius: 20px;
  }
`;

const SettingIcon = styled(SettingOutlined)`
  cursor: pointer;
  color: ${(props: { path?: string }) => props.path === "/setting" && "#3570bf"};
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

const BackNavigationIconButton = styled(LeftOutlined)`
  cursor: pointer;
`;

const ForwardNavigationIconButton = styled(RightOutlined)`
  cursor: pointer;
`;

const Box = styled.div`
  margin-left: 40px;
`;

const App: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [state, setState] = useSetState<StateType>({
    searchValue: ""
  });

  useUpdateEffect(() => {
    setState({ path: location.pathname });
  }, [location.pathname]);

  const changeFullScreen = () => {
    // ipcRenderer.send('changeFullScreen');
  };

  const handleSearch = () => {
    if (state.searchValue !== "") {
      history.push(`/search/${state.searchValue}/${SearchActiveKey.Single}`);
    } else {
      message.error("搜索内容不能为空!");
    }
  };

  return (
    <NavBox>
      <NavPaginationBox>
        <Space>
          <BackNavigationIconButton onClick={() => history.go(-1)} />
          <ForwardNavigationIconButton onClick={() => history.go(1)} />
        </Space>
      </NavPaginationBox>
      <NavControlBox>
        <Row justify="space-between">
          <Col span={14}>
            <Box>
              <Button type="link">
                <Link to="/personalRecommend">个性推荐</Link>
              </Button>
              <Button type="link">
                <Link to="/playList">歌单</Link>
              </Button>
              <Button type="link">
                <Link to="/radio">主播电台</Link>
              </Button>
              <Button type="link">
                <Link to="/ranking">排行榜</Link>
              </Button>
              <Button type="link">
                <Link to="/singer">歌手</Link>
              </Button>
              <Button type="link">
                <Link to="/newest">最新音乐</Link>
              </Button>
            </Box>
          </Col>
          <Col span={10}>
            <Row justify="space-between">
              <Col span={14}>
                <Input
                  prefix={<SearchOutlined onClick={handleSearch} />}
                  value={state.searchValue}
                  onChange={event => setState({ searchValue: event.target.value })}
                  onPressEnter={handleSearch}
                  placeholder="搜索"
                  allowClear
                />
              </Col>
              <Col span={10}>
                <Row justify="end">
                  <Col span={5}>
                    <SettingIcon path={state.path} onClick={() => history.push("/setting")} />
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

export const NavBar = App;
