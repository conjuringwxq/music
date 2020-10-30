import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import {
  singerCategory,
  singerSingle,
  singerDetail,
  singerSimilar,
} from '@/services/singer';

export interface SingerModelState {
  categories?: any[];
  message?: any;
  detail?: any;
}

export interface SingerModelType {
  namespace: 'singer';
  state: SingerModelState;
  effects: {
    querySingerCategoryList: Effect;
    querySingerSingle: Effect;
    querySingerAlbum: Effect;
    querySingerMv: Effect;
    querySingerDetail: Effect;
    querySingerSimilar: Effect;
  };
  reducers: {
    SET_SINGER_CATEGORY_LIST: Reducer<SingerModelState>;
    SET_SINGER_SINGLE: Reducer<SingerModelState>;
    SET_SINGER_ALBUM: Reducer<SingerModelState>;
    SET_SINGER_MV: Reducer<SingerModelState>;
    SET_SINGER_DETAIL: Reducer<SingerModelState>;
    SET_SINGER_SIMILAR: Reducer<SingerModelState>;
  };
}

const singerModel: SingerModelType = {
  namespace: 'singer',

  state: {
    categories: [],
    message: {},
    detail: {},
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
    *querySingerAlbum({ id }, { call, put }) {
      const { code, introduction, briefDesc, count, topicData } = yield call(
        singerDetail,
        {
          id,
        },
      );
      if (code === 200) {
        yield put({
          type: 'SET_SINGER_ALBUM',
          detail: { introduction, briefDesc, count, topicData },
        });
      }
    },
    *querySingerMv({ id }, { call, put }) {
      const { code, introduction, briefDesc, count, topicData } = yield call(
        singerDetail,
        {
          id,
        },
      );
      if (code === 200) {
        yield put({
          type: 'SET_SINGER_MV',
          detail: { introduction, briefDesc, count, topicData },
        });
      }
    },
    *querySingerDetail({ id }, { call, put }) {
      const { code, introduction, briefDesc, count, topicData } = yield call(
        singerDetail,
        {
          id,
        },
      );
      if (code === 200) {
        yield put({
          type: 'SET_SINGER_DETAIL',
          detail: { introduction, briefDesc, count, topicData },
        });
      }
    },
    *querySingerSimilar({ id }, { call, put }) {
      const { code } = yield call(singerSimilar, {
        id,
      });
      if (code === 200) {
        yield put({
          type: 'SET_SINGER_SIMILAR',
          similar: [],
        });
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
    SET_SINGER_ALBUM(state, action) {
      return {
        ...state,
        ...action,
      };
    },
    SET_SINGER_MV(state, action) {
      return {
        ...state,
        ...action,
      };
    },
    SET_SINGER_DETAIL(state, action) {
      return {
        ...state,
        ...action,
      };
    },
    SET_SINGER_SIMILAR(state, action) {
      return {
        ...state,
        ...action,
      };
    },
  },
};

export default singerModel;
