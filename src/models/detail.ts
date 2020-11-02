import { Effect, Reducer } from 'umi';
import {
  playListDetailList,
  playListCommentList,
  playListCollector,
  mvDetail,
} from '@/services/detail';

export interface DetailModelMessage {
  [key: string]: any;
}

export interface DetailModelCommon {
  list: any[];
  total: number;
}

export interface DetailModelState {
  message?: DetailModelMessage;
  comment?: DetailModelCommon;
  collector?: DetailModelCommon;
  mv?: any;
}

export interface PersonalRecommendModelType {
  namespace: 'detail';
  state: DetailModelState;
  effects: {
    queryMessageAsync: Effect;
    queryCommentsAsync: Effect;
    queryCollectorAsync: Effect;
    queryMvDetailAsync: Effect;
  };
  reducers: {
    SET_DETAIL_MESSAGE: Reducer<DetailModelState>;
    SET_DETAIL_COMMENTS: Reducer<DetailModelState>;
    SET_DETAIL_COLLECTOR: Reducer<DetailModelState>;
    SET_MV_DETAIL: Reducer<DetailModelState>;
  };
}

const detailModel: PersonalRecommendModelType = {
  namespace: 'detail',

  state: {
    message: {
      tracks: [],
    },
    comment: {
      list: [],
      total: 0,
    },
    collector: {
      list: [],
      total: 0,
    },
    mv: {},
  },

  effects: {
    *queryMessageAsync({ id }, { call, put }) {
      const { code, playlist } = yield call(playListDetailList, {
        id,
      });
      if (code === 200) {
        yield put({ type: 'SET_DETAIL_MESSAGE', message: playlist });
      }
    },
    *queryCommentsAsync({ id, pageNum, pageSize }, { call, put }) {
      const { code, comments, total } = yield call(playListCommentList, {
        id,
        limit: pageSize,
        offset: (pageNum - 1) * pageSize,
      });
      if (code === 200) {
        yield put({
          type: 'SET_DETAIL_COMMENTS',
          comment: { list: comments, total },
        });
      }
    },
    *queryCollectorAsync({ id, pageNum, pageSize }, { call, put }) {
      const { code, subscribers, total } = yield call(playListCollector, {
        id,
        limit: pageSize,
        offset: (pageNum - 1) * pageSize,
      });
      if (code === 200) {
        yield put({
          type: 'SET_DETAIL_COLLECTOR',
          collector: { list: subscribers, total },
        });
      }
    },
    *queryMvDetailAsync({ id }, { call, put }) {
      const { code, data = {} } = yield call(mvDetail, { mvid: id });
      if (code === 200) {
        yield put({
          type: 'SET_MV_DETAIL',
          mv: data,
        });
      }
    },
  },

  reducers: {
    SET_DETAIL_MESSAGE(state, action) {
      return {
        ...state,
        message: action.message,
      };
    },
    SET_DETAIL_COMMENTS(state, action) {
      return {
        ...state,
        comment: action.comment,
      };
    },
    SET_DETAIL_COLLECTOR(state, action) {
      return {
        ...state,
        collector: action.collector,
      };
    },
    SET_MV_DETAIL(state, action) {
      return {
        ...state,
        ...action,
      };
    },
  },
};

export default detailModel;
