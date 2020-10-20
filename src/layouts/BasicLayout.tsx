import React from 'react';
import styled from 'styled-components';
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import MNavBar from '@/components/mNavBar';
import MSiderMenu from '@/components/mSiderMenu';
import MPlayer from '@/components/mPlayer';

const { Header, Sider, Content, Footer } = Layout;

interface BasicLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = styled(Layout)`
  background: #f6f8f9;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const AdminLayoutWrapper = styled(AdminLayout)`
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
`;

const AdminFooter = styled(Footer)`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.85);
  padding: 12px;
`;

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { children } = props;
  return (
    <ConfigProvider locale={zhCN}>
      <AdminLayout>
        <AdminHeader>
          <MNavBar />
        </AdminHeader>
        <AdminLayoutWrapper>
          <AdminSider theme="light" width={170}>
            <MSiderMenu />
          </AdminSider>
          <AdminContent>{children}</AdminContent>
        </AdminLayoutWrapper>
        <AdminFooter>
          <MPlayer />
        </AdminFooter>
      </AdminLayout>
    </ConfigProvider>
  );
};

export default BasicLayout;
