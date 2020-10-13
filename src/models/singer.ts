import { Effect, Reducer } from 'umi';
import { singerCategory } from '@/services/singer';

export interface SingerModelState {
  artists?: any[];
}

export interface SingerModelType {
  namespace: 'singer';
  state: SingerModelState;
  effects: {
    querySingerCategoryList: Effect;
  };
  reducers: {
    SET_SINGER_CATEGORY_LIST: Reducer<SingerModelState>;
  };
}

const singerModel: SingerModelType = {
  namespace: 'singer',

  state: {
    artists: [],
  },

  effects: {
    *querySingerCategoryList({ area, typeAlias, initial }, { call, put }) {
      const { code, artists = [] } = yield call(singerCategory, {
        area,
        type: typeAlias,
        initial,
      });
      if (code === 200) {
        yield put({ type: 'SET_SINGER_CATEGORY_LIST', artists });
      }
    },
  },

  reducers: {
    SET_SINGER_CATEGORY_LIST(state, action) {
      return {
        ...state,
        ...action,
      };
    },
  },
};

export default singerModel;
