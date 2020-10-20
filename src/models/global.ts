import { Effect, Reducer } from 'umi';

export interface UserInfo {}

export interface Settings {
  visiblePlayMenuList: boolean;
}

export interface GlobalModelState {
  userInfo?: UserInfo;
  settings: Settings;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    handleVisiblePlayMenuList: Effect;
  };
  reducers: {
    SET_VISIBLE: Reducer<GlobalModelState>;
  };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    userInfo: {},
    settings: {
      visiblePlayMenuList: false,
    },
  },

  effects: {
    *handleVisiblePlayMenuList({ visiblePlayMenuList }, { put }) {
      yield put({ type: 'SET_VISIBLE', visiblePlayMenuList });
    },
  },

  reducers: {
    SET_VISIBLE(state, action) {
      return {
        ...state,
        settings: {
          ...state?.settings,
          visiblePlayMenuList: action.visiblePlayMenuList,
        },
      };
    },
  },
};

export default GlobalModel;
