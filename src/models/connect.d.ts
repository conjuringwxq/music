import { Dispatch } from "umi";
import { GlobalModelState } from "./global";
import { PersonalRecommendModelState } from "./personalRecommend";
import { DetailModelState } from "./detail";
import { SingerModelState } from "./singer";
import { SearchModelState } from "./search";
import { AlbumModelState } from "./album";

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
    search?: boolean;
    album?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  personalRecommend: PersonalRecommendModelState;
  detail: DetailModelState;
  singer: SingerModelState;
  search: SearchModelState;
  album: AlbumModelState;
}

export interface ConnectProps {
  dispatch?: Dispatch;
}
