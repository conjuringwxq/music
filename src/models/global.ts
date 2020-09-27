export interface UserInfo {}

export interface GlobalModelState {
  userInfo: UserInfo;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {};
  reducers: {};
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    userInfo: {},
  },

  effects: {},

  reducers: {},
};

export default GlobalModel;