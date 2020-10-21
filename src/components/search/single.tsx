import React from 'react';
import styled from 'styled-components';
import { SearchItemProps } from '@/pages/search';

export const SearchSingle: React.FC<SearchItemProps> = (props) => {
  const { loading, data } = props;

  return (
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
};
