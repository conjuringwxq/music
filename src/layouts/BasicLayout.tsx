import React from 'react';
import styled from 'styled-components';
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import WyNavBar from '@/components/wy-nav-bar';
import WySiderMenu from '@/components/wy-sider-menu';

const { Header, Sider, Content, Footer } = Layout;

interface BasicLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = styled(Layout)`
  background: #f6f8f9;
`;

const AdminLayoutWrapper = styled(AdminLayout)`
  margin: 36px auto;
`;

const AdminHeader = styled(Header)`
  background: #fff;
  padding: 0;
`;

const AdminSider = styled(Sider)`
  height: calc(100vh - 187px);
  overflow-y: auto;
  box-shadow: 0 2px 11px 0 hsla(0, 0%, 60%, 0.13);
  border-radius: 20px;
  background-color: #fff;
`;

const AdminContent = styled(Content)`
  margin-left: 40px;
  width: 970px;
  box-shadow: 0 2px 11px 0 hsla(0, 0%, 60%, 0.13);
  border-radius: 20px;
  background-color: #fff;
`;

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const { children } = props;
  return (
    <ConfigProvider locale={zhCN}>
      <AdminLayout>
        <AdminHeader>
          <WyNavBar />
        </AdminHeader>
        <AdminLayoutWrapper>
          <AdminSider theme="light" width={170}>
            <WySiderMenu />
          </AdminSider>
          <AdminContent>{children}</AdminContent>
        </AdminLayoutWrapper>
        <Footer>Footer</Footer>
      </AdminLayout>
    </ConfigProvider>
  );
};

export default BasicLayout;
