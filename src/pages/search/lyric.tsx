import { useMount } from 'ahooks';
import React from 'react';
import styled from 'styled-components';
import { SearchItemProps } from './index';

const SearchLyric: React.FC<SearchItemProps> = (props) => {
  const { loading, data } = props;

  return <>搜索歌词</>;
};

export default SearchLyric;
