import React from 'react';
import { useMount } from 'ahooks';
import { Card } from 'antd';
import { connect } from 'umi';
import { ConnectState, ConnectProps } from '@/models/connect';
import { PersonalRecommendModelState } from '@/models/personalRecommend';

import MSwiper from '@/components/mSwiper';
import MReAlbum from '@/components/mReAlbum';

interface HomePageProps extends ConnectProps {
  personalRecommend: PersonalRecommendModelState;
  submitting?: boolean;
}

const HomePage: React.FC<HomePageProps> = (props) => {
  const {
    personalRecommend: { banner, playList, exclusive, mv },
    dispatch,
    submitting,
  } = props;

  useMount(() => {
    if (dispatch) {
      dispatch({ type: 'personalRecommend/queryListAsync' });
    }
  });

  return (
    <Card bordered={false} loading={submitting}>
      {banner && <MSwiper data={banner}/>}
      {playList && <MReAlbum title="推荐歌单" itemWidth={150} data={playList}/>}
      {exclusive && <MReAlbum title="独家放送" itemWidth={270} data={exclusive}/>}
      {mv && <MReAlbum title="推荐MV" itemWidth={270} data={mv}/>}
    </Card>
  );
};

export default connect(({ personalRecommend, loading }: ConnectState) => ({
  personalRecommend,
  submitting: loading.effects['personalRecommend/queryListAsync'],
}))(HomePage);
