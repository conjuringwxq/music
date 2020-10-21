import React from 'react';
import styled from 'styled-components';
import { SearchItemProps } from './index';

const SearchUser: React.FC<SearchItemProps> = (props) => {
  const { loading, data } = props;

  return <>搜索用户</>;
};

export default SearchUser;
