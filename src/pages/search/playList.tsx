import React from 'react';
import styled from 'styled-components';
import { SearchItemProps } from './index';

const SearchPlayList: React.FC<SearchItemProps> = (props) => {
  const { loading, data } = props;

  return <>搜索歌单</>;
};

export default SearchPlayList;
