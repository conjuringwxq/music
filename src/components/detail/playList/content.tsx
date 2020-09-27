import React from 'react';
import { DetailModelMessage } from '@/models/detail';

interface Props {
  data: DetailModelMessage;
}

const DetailPlaylistContent: React.FC<Props> = (props) => {
  const { data } = props;

  return <>内容</>;
};

export default DetailPlaylistContent;
