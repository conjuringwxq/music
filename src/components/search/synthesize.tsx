import React from "react";
import styled from "styled-components";
import { SearchItemProps } from "@/pages/search";

const App: React.FC<SearchItemProps> = props => {
  const { loading, data } = props;

  return <>搜索综合</>;
};

export const SearchSynthesize = App;
