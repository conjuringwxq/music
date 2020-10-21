import React from 'react';
import styled from 'styled-components';
import { SearchItemProps } from './index';

const SearchSinger: React.FC<SearchItemProps> = (props) => {
  const { loading, data } = props;

  return <>搜索歌手</>;
};

export default SearchSinger;
