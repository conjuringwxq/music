import { Dispatch } from 'umi';
import { GlobalModelState } from './global';
import { PersonalRecommendModelState } from './personalRecommend';
import { DetailModelState } from './detail';

export interface Loading {
  global: boolean;
  effects: {
    [key: string]: boolean | undefined;
  };
  models: {
    global?: boolean;
    personalRecommend?: boolean;
    detailModel?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  personalRecommend: PersonalRecommendModelState;
  detail: DetailModelState;
}

export interface ConnectProps {
  dispatch?: Dispatch;
}
