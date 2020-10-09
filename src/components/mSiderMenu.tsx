import React from 'react';
import styled from 'styled-components';
import { Menu } from 'antd';
import {
  MailOutlined,
  YoutubeOutlined,
  UsergroupAddOutlined,
  AudioOutlined,
  DownloadOutlined,
  CloudOutlined,
  StarOutlined,
  LikeOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';

const MenuCard = styled(Menu)`
  padding-top: 8px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 2px 11px 0 hsla(0, 0%, 60%, 0.13) !important;
`;

const MSiderMenu: React.FC = () => {
  return (
    <MenuCard defaultSelectedKeys={['findMusic']} mode="inline">
      <Menu.ItemGroup key="menuList" title="菜单列表">
        <Menu.Item key="findMusic">
          <MailOutlined/>
          <span>发现音乐</span>
        </Menu.Item>
        <Menu.Item key="personalFm">
          <MailOutlined/>
          <span>私人FM</span>
        </Menu.Item>
        <Menu.Item key="videos">
          <YoutubeOutlined/>
          <span>视频</span>
        </Menu.Item>
        <Menu.Item key="friends">
          <UsergroupAddOutlined/>
          <span>朋友</span>
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup key="myMusic" title="我的音乐">
        <Menu.Item key="iTunesMusic">
          <AudioOutlined/>
          <span>iTunes音乐</span>
        </Menu.Item>
        <Menu.Item key="downloadManage">
          <DownloadOutlined/>
          <span>下载管理</span>
        </Menu.Item>
        <Menu.Item key="myMysicCloud">
          <CloudOutlined/>
          <span>我的音乐云盘</span>
        </Menu.Item>
        <Menu.Item key="myCollection">
          <StarOutlined/>
          <span>我的收藏</span>
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup key="createPlayList" title="创建的歌单">
        <Menu.Item key="myLoveMusic">
          <LikeOutlined/>
          <span>我喜欢的音乐</span>
        </Menu.Item>
        <Menu.Item key="searchHot">
          <FileSearchOutlined/>
          <span>热搜</span>
        </Menu.Item>
      </Menu.ItemGroup>
    </MenuCard>
  );
};

export default MSiderMenu;
