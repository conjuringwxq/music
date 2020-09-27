import React from 'react';
import { useMount } from 'ahooks';
import { Card } from 'antd';
import { connect } from 'umi';
import { ConnectState, ConnectProps } from '@/models/connect';
import { PersonalRecommendModelState } from '@/models/personalRecommend';

import WySwiper from '@/components/wy-swiper';
import WyReAlbum from '@/components/wy-re-album';

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
      {banner && <WySwiper data={banner}/>}
      {playList && (
        <WyReAlbum title="推荐歌单" itemWidth={150} data={playList}/>
      )}
      {exclusive && (
        <WyReAlbum title="独家放送" itemWidth={270} data={exclusive}/>
      )}
      {mv && <WyReAlbum title="推荐MV" itemWidth={270} data={mv}/>}
    </Card>
  );
};

export default connect(({ personalRecommend, loading }: ConnectState) => ({
  personalRecommend,
  submitting: loading.effects['personalRecommend/queryListAsync'],
}))(HomePage);
