import React, { useEffect } from 'react';
import { connect, DetailModelState, useParams } from 'umi';
import { ConnectState, ConnectProps } from '@/models/connect';

interface Params {
  id: string;
}

interface DetailVideoProps extends ConnectProps {
  detail: DetailModelState;
  submitting?: boolean;
}

const DetailVideo: React.FC<DetailVideoProps> = (props) => {
  return <>视频详情</>;
};

export default DetailVideo;
