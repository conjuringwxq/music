import { Effect, Reducer } from 'umi';
import { singerCategory, singerSingle } from '@/services/singer';

export interface SingerModelState {
  categories?: any[];
  message?: any;
}

export interface SingerModelType {
  namespace: 'singer';
  state: SingerModelState;
  effects: {
    querySingerCategoryList: Effect;
    querySingerSingle: Effect;
  };
  reducers: {
    SET_SINGER_CATEGORY_LIST: Reducer<SingerModelState>;
    SET_SINGER_SINGLE: Reducer<SingerModelState>;
  };
}

const singerModel: SingerModelType = {
  namespace: 'singer',

  state: {
    categories: [],
    message: {},
  },

  effects: {
    *querySingerCategoryList({ area, typeAlias, initial }, { call, put }) {
      const { code, artists = [] } = yield call(singerCategory, {
        area,
        type: typeAlias,
        initial,
      });
      if (code === 200) {
        yield put({ type: 'SET_SINGER_CATEGORY_LIST', categories: artists });
      }
    },
    *querySingerSingle({ id }, { call, put }) {
      const { code, artist } = yield call(singerSingle, { id });
      if (code === 200) {
        yield put({ type: 'SET_SINGER_SINGLE', message: artist });
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
    SET_SINGER_SINGLE(state, action) {
      return {
        ...state,
        ...action,
      };
    },
  },
};

export default singerModel;
