import { Effect, Reducer } from 'umi';
import {
  queryBanner,
  queryRecommendPlayList,
  queryRecommendExclusive,
  queryRecommendMv,
} from '@/services/personalRecommend';

export interface PersonalRecommendModelState {
  banner?: any[];
  playList?: any[];
  exclusive?: any[];
  newestMusic?: any[];
  mv?: any[];
  anchorRadio?: any[];
  live?: any[];
}

export interface PersonalRecommendModelType {
  namespace: 'personalRecommend';
  state: PersonalRecommendModelState;
  effects: {
    queryListAsync: Effect;
  };
  reducers: {
    SET_RECOMMEND_LIST: Reducer<PersonalRecommendModelState>;
  };
}

const personalRecommendModel: PersonalRecommendModelType = {
  namespace: 'personalRecommend',

  state: {
    banner: [],
    playList: [],
    exclusive: [],
    newestMusic: [],
    mv: [],
    anchorRadio: [],
    live: [],
  },

  effects: {
    *queryListAsync(_, { call, put }) {
      const { code: bannerCode, banners: banner = [] } = yield call(
        queryBanner,
      );
      if (bannerCode === 200) {
        yield put({ type: 'SET_RECOMMEND_LIST', banner });
      }
      const { code: playListCode, result: playList = [] } = yield call(
        queryRecommendPlayList,
      );
      if (playListCode === 200) {
        yield put({
          type: 'SET_RECOMMEND_LIST',
          playList,
        });
      }
      const { code: exclusiveCode, result: exclusive = [] } = yield call(
        queryRecommendExclusive,
      );
      if (exclusiveCode === 200) {
        yield put({
          type: 'SET_RECOMMEND_LIST',
          exclusive,
        });
      }
      const { code: mvCode, result: mv = [] } = yield call(queryRecommendMv);
      if (mvCode === 200) {
        yield put({
          type: 'SET_RECOMMEND_LIST',
          mv,
        });
      }
    },
  },

  reducers: {
    SET_RECOMMEND_LIST(state, action) {
      return {
        ...state,
        ...action,
      };
    },
  },
};

export default personalRecommendModel;
