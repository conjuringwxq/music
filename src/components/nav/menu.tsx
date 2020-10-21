import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'umi';

const Box = styled.div`
  margin-left: 40px;
`;

const NavMenu: React.FC = () => (
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
);

export default NavMenu;
