import React, { useEffect } from 'react';
import { connect, SingerModelState, useParams } from 'umi';
import { ConnectProps } from '@/models/connect';

interface ProfileProps extends ConnectProps {
  singer: SingerModelState;
  submitting?: boolean;
}

interface Params {
  id: string;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const {
    singer: { message },
    submitting,
    dispatch,
  } = props;
  const params = useParams<Params>();

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'singer/querySingerSingle',
        id: params.id,
      });
    }
  }, [dispatch, params.id]);

  return (
    <pre>
      <code>{JSON.stringify(message, null, 2)}</code>
    </pre>
  );
};

export default connect(({ singer, loading }: ConnectState) => ({
  singer,
  submitting: loading.effects['singer/querySingerSingle'],
}))(Profile);
