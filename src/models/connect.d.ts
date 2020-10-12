import { Dispatch } from 'umi';
import { GlobalModelState } from './global';
import { PersonalRecommendModelState } from './personalRecommend';
import { DetailModelState } from './detail';
import { SingerModelState } from './singer';

export interface Loading {
  global: boolean;
  effects: {
    [key: string]: boolean | undefined;
  };
  models: {
    global?: boolean;
    personalRecommend?: boolean;
    detail?: boolean;
    singer?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  personalRecommend: PersonalRecommendModelState;
  detail: DetailModelState;
  singer: SingerModelState;
}

export interface ConnectProps {
  dispatch?: Dispatch;
}
