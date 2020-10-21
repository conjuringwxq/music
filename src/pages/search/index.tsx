import React from 'react';
import styled from 'styled-components';
import { connect, SearchModelState, useParams } from 'umi';
import { ConnectProps, ConnectState } from '@/models/connect';
import SearchSingle from './single';
import SearchSinger from './singer';
import SearchAlbum from './album';
import SearchVideo from './video';
import SearchPlayList from './playList';
import SearchLyric from './lyric';
import SearchRadio from './radio';
import SearchUser from './user';
import SearchMv from './mv';
import SearchSynthesize from './synthesize';

interface SearchIndexProps extends ConnectProps {
  search: SearchModelState;
  submitting?: boolean;
}

interface Params {
  keywords: string;
  type: string;
}

export interface SearchItemProps {
  loading?: boolean;
  data: any;
}

const SearchIndex: React.FC<SearchIndexProps> = (props) => {
  const {
    search: { result },
    submitting,
  } = props;

  const params = useParams<Params>();

  if (params.type === '1') {
    return <SearchSingle loading={submitting} data={result} />;
  }
  if (params.type === '10') {
    return <SearchAlbum loading={submitting} data={result} />;
  }
  if (params.type === '100') {
    return <SearchSinger loading={submitting} data={result} />;
  }
  if (params.type === '1000') {
    return <SearchPlayList loading={submitting} data={result} />;
  }
  if (params.type === '1002') {
    return <SearchUser loading={submitting} data={result} />;
  }
  if (params.type === '1004') {
    return <SearchMv loading={submitting} data={result} />;
  }
  if (params.type === '1006') {
    return <SearchLyric loading={submitting} data={result} />;
  }
  if (params.type === '1009') {
    return <SearchRadio loading={submitting} data={result} />;
  }
  if (params.type === '1014') {
    return <SearchVideo loading={submitting} data={result} />;
  }
  if (params.type === '1018') {
    return <SearchSynthesize loading={submitting} data={result} />;
  }

  return <></>;
};

export default connect(({ search, loading }: ConnectState) => ({
  search,
  submitting: loading.effects['search/querySearchByType'],
}))(SearchIndex);
