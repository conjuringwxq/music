import { Effect, Reducer } from 'umi';
import {
  playListDetailList,
  playListCommentList,
  playListCollector,
} from '@/services/detail';

export interface DetailModelMessage {
  [key: string]: any;
}

export interface DetailModelCommon {
  list: any[];
  total: number;
}

export interface DetailModelState {
  // id: number; // 当前 id
  // coverImgUrl: string; // 封面图
  // name: string; // 名称
  // commentCount: number; // 评论数
  // creator: any[]; // 创建人
  // createTime: number; // 创建时间
  // subscribers: any[]; // 订阅者
  // subscribedCount: number; // 收藏数量
  // shareCount: number; // 分享数量
  // tags: string[]; // 标签
  // trackCount: number; // 歌曲数
  // playCount: number; // 播放总量
  // description: string; // 描述
  message?: DetailModelMessage;
  comment?: DetailModelCommon;
  collector?: DetailModelCommon;
}

export interface PersonalRecommendModelType {
  namespace: 'detail';
  state: DetailModelState;
  effects: {
    queryMessageAsync: Effect;
    queryCommentsAsync: Effect;
    queryCollectorAsync: Effect;
  };
  reducers: {
    SET_DETAIL_MESSAGE: Reducer<DetailModelState>;
    SET_DETAIL_COMMENTS: Reducer<DetailModelState>;
    SET_DETAIL_COLLECTOR: Reducer<DetailModelState>;
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
      console.log(pageNum, pageSize);
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
  },
};

export default detailModel;
