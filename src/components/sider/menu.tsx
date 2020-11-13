import React from "react";
import { Link } from "umi";
import styled from "styled-components";
import { Menu } from "antd";
import { MailOutlined, YoutubeOutlined, UsergroupAddOutlined, AudioOutlined, DownloadOutlined, CloudOutlined, StarOutlined, LikeOutlined, FileSearchOutlined } from "@ant-design/icons";

const MenuCard = styled(Menu)`
  padding-top: 8px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 2px 11px 0 hsla(0, 0%, 60%, 0.13) !important;
`;

const App: React.FC = () => {
  return (
    <MenuCard defaultSelectedKeys={["findMusic"]} mode="inline">
      <Menu.ItemGroup key="menuList" title="菜单列表">
        <Menu.Item key="findMusic">
          <Link to="/">
            <MailOutlined />
            <span>发现音乐</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="fm">
          <Link to="/fm">
            <MailOutlined />
            <span>私人FM</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="video">
          <Link to="/video">
            <YoutubeOutlined />
            <span>视频</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="friend">
          <Link to="/friend">
            <UsergroupAddOutlined />
            <span>朋友</span>
          </Link>
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup key="myMusic" title="我的音乐">
        <Menu.Item key="iTunes">
          <Link to="/iTunes">
            <AudioOutlined />
            <span>iTunes音乐</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="download">
          <Link to="/download">
            <DownloadOutlined />
            <span>下载管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="cloud">
          <Link to="/cloud">
            <CloudOutlined />
            <span>我的音乐云盘</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="collect">
          <Link to="/collect">
            <StarOutlined />
            <span>我的收藏</span>
          </Link>
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup key="createPlayList" title="创建的歌单">
        <Menu.Item key="love">
          <Link to="/love">
            <LikeOutlined />
            <span>我喜欢的音乐</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="hot">
          <Link to="/hot">
            <FileSearchOutlined />
            <span>热搜</span>
          </Link>
        </Menu.Item>
      </Menu.ItemGroup>
    </MenuCard>
  );
};

export const SiderMenu = App;
