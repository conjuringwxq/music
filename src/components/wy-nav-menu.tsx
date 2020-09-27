import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'umi';

const NavMenu = styled.div`
  margin-left: 40px;
`;

const WyNavMenu: React.FC = () => (
  <NavMenu>
    <Button type="link">
      <Link to="/personalRecommend">个性推荐</Link>
    </Button>
    <Button type="link">
      <Link to="/">歌单</Link>
    </Button>
    <Button type="link">
      <Link to="/">主播电台</Link>
    </Button>
    <Button type="link">
      <Link to="/">排行榜</Link>
    </Button>
    <Button type="link">
      <Link to="/">歌手</Link>
    </Button>
    <Button type="link">
      <Link to="/">最新音乐</Link>
    </Button>
  </NavMenu>
);

export default WyNavMenu;
