import React, { useEffect } from 'react';
import { connect, DetailModelState, useParams } from 'umi';
import { ConnectState, ConnectProps } from '@/models/connect';
import { VideoPlayer } from '@/components/style';

interface Params {
  id: string;
}

interface DetailMvProps extends ConnectProps {
  detail: DetailModelState;
  submitting?: boolean;
}

const DetailMv: React.FC<DetailMvProps> = (props) => {
  const {
    detail: { mv },
    submitting,
    dispatch,
  } = props;

  const { id } = useParams<Params>();

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'detail/queryMvDetailAsync', id });
    }
  }, [dispatch, id]);

  return (
    <>
      <VideoPlayer
        width={550}
        height={310}
        src={mv.cover}
        poster={mv.cover}
        controls
      />
    </>
  );
};

export default connect(({ detail, loading }: ConnectState) => ({
  detail,
  submitting: loading.effects['detail/queryMvDetailAsync'],
}))(DetailMv);
