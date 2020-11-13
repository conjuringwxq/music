import { Effect, Reducer } from "umi";

export interface UserInfo {}

export interface Settings {
  visiblePlayMenuList?: boolean;
  tabKey?: "playList" | "history";
}

export interface GlobalModelState {
  userInfo?: UserInfo;
  settings: Settings;
}

export interface GlobalModelType {
  namespace: "global";
  state: GlobalModelState;
  effects: {
    handleVisiblePlayMenuList: Effect;
    handleChangeTabKey: Effect;
  };
  reducers: {
    SET_VISIBLE: Reducer<GlobalModelState>;
    SET_TABKEY: Reducer<GlobalModelState>;
  };
}

const GlobalModel: GlobalModelType = {
  namespace: "global",

  state: {
    userInfo: {},
    settings: {
      visiblePlayMenuList: false,
      tabKey: "playList"
    }
  },

  effects: {
    *handleVisiblePlayMenuList({ visiblePlayMenuList }, { put }) {
      yield put({ type: "SET_VISIBLE", visiblePlayMenuList });
    },
    *handleChangeTabKey({ tabKey }, { put }) {
      yield put({ type: "SET_TABKEY", tabKey });
    }
  },

  reducers: {
    SET_VISIBLE(state, action) {
      return {
        ...state,
        settings: {
          ...state?.settings,
          visiblePlayMenuList: action.visiblePlayMenuList
        }
      };
    },
    SET_TABKEY(state, action) {
      return {
        ...state,
        settings: {
          ...state?.settings,
          tabKey: action.tabKey
        }
      };
    }
  }
};

export default GlobalModel;
