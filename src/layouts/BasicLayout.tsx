import React from "react";
import styled from "styled-components";
import { Layout, ConfigProvider, Card, BackTop } from "antd";
import { connect } from "umi";
import { UseRequestProvider } from "ahooks";
import zhCN from "antd/es/locale/zh_CN";
import request from "@/utils/request";
import { NavBar } from "@/components/nav";
import { SiderMenu } from "@/components/sider";
import { PlayerMain, PlayerList } from "@/components/player";
import { ConnectProps, ConnectState } from "@/models/connect";
import { GlobalModelState } from "@/models/global";

const { Header, Sider, Content, Footer } = Layout;

interface BasicLayoutProps extends ConnectProps {
  children: React.ReactNode;
  global: GlobalModelState;
}

const AdminLayout = styled(Layout)`
  background: #f6f8f9;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .ant-pagination.mini .ant-pagination-item {
    border-radius: 50%;
  }
`;

const AdminLayoutWrapper = styled(AdminLayout)`
  position: relative;
  margin: 100px auto;
`;

const AdminHeader = styled(Header)`
  background: #fff;
  padding: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
`;

const AdminSider = styled(Sider)`
  overflow-y: auto;
  box-shadow: 0 2px 11px 0 hsla(0, 0%, 60%, 0.13);
  border-radius: 20px;
  background-color: #fff;
  position: fixed;
  left: 40px;
  top: 100px;
`;

const AdminContent = styled(Content)`
  margin-left: 210px;
  width: 970px;
  min-height: 100vh;
  box-shadow: 0 2px 11px 0 hsla(0, 0%, 60%, 0.13);
  border-radius: 20px;
  background-color: #fff;
  z-index: 2;
`;

const AdminMenuCard = styled.div`
  position: fixed;
  top: 64px;
  right: 0;
  height: calc(100vh - 132px);
  background-color: #fff;
  box-shadow: 0 12px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 420px;
  padding: 24px;
  opacity: ${(props: { position?: boolean }) => (props.position ? 1 : 0)};
  z-index: ${(props: { position?: boolean }) => (props.position ? 999 : 1)};
`;

const AdminFooter = styled(Footer)`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.85);
  padding: 12px 50px;
`;

const AdminBackTop = styled(BackTop)`
  border-radius: 6px;
  bottom: 90px;
  right: 40px;
`;

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    children,
    global: { settings },
    dispatch
  } = props;

  return (
    <UseRequestProvider value={{ refreshOnWindowFocus: true, requestMethod: params => request(params) }}>
      <ConfigProvider locale={zhCN}>
        <AdminLayout>
          <AdminHeader>
            <NavBar />
          </AdminHeader>
          <AdminLayoutWrapper>
            <AdminSider theme="light" width={170}>
              <SiderMenu />
            </AdminSider>
            <AdminContent>
              <Card bordered={false}>{children}</Card>
            </AdminContent>
            <AdminMenuCard position={settings.visiblePlayMenuList}>
              <PlayerList dispatch={dispatch} data={settings} />
            </AdminMenuCard>
          </AdminLayoutWrapper>
          <AdminFooter>
            <PlayerMain dispatch={dispatch} data={settings} />
          </AdminFooter>
          <AdminBackTop />
        </AdminLayout>
      </ConfigProvider>
    </UseRequestProvider>
  );
};

export default connect(({ global }: ConnectState) => ({
  global
}))(BasicLayout);
