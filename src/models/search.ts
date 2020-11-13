import { Effect, Reducer } from "umi";
import { searchResult } from "@/services/search";

export interface SearchModelState {
  result: any;
}

export interface SearchModelType {
  namespace: "search";
  state: SearchModelState;
  effects: {
    querySearchByType: Effect;
  };
  reducers: {
    SET_SEARCH_BY_TYPE: Reducer<SearchModelState>;
  };
}

const searchModel: SearchModelType = {
  namespace: "search",

  state: {
    result: {}
  },

  effects: {
    *querySearchByType({ keywords, activeKey, pageNum = 1, pageSize = 100 }, { call, put }) {
      const { code, result = {} } = yield call(searchResult, {
        keywords,
        type: activeKey,
        limit: pageSize,
        offset: (pageNum - 1) * pageSize
      });
      if (code === 200) {
        yield put({ type: "SET_SEARCH_BY_TYPE", result });
      }
    }
  },

  reducers: {
    SET_SEARCH_BY_TYPE(state, action) {
      return {
        ...state,
        result: action.result
      };
    }
  }
};

export default searchModel;
