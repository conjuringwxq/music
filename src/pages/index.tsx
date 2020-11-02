import React from 'react';
import { useMount } from 'ahooks';
import { Spin } from 'antd';
import { connect } from 'umi';
import { ConnectState, ConnectProps } from '@/models/connect';
import { PersonalRecommendModelState } from '@/models/personalRecommend';

import SlideShow from '@/components/slideshow';
import AlbumModule from '@/components/album/module';

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
    <Spin spinning={submitting}>
      <SlideShow data={banner} />
      <AlbumModule
        title="推荐歌单"
        itemWidth={150}
        data={playList}
        path="playList"
      />
      <AlbumModule
        title="独家放送"
        itemWidth={270}
        data={exclusive}
        path="mv"
      />
      <AlbumModule title="推荐MV" itemWidth={270} data={mv} path="mv" />
    </Spin>
  );
};

export default connect(({ personalRecommend, loading }: ConnectState) => ({
  personalRecommend,
  submitting: loading.effects['personalRecommend/queryListAsync'],
}))(HomePage);
