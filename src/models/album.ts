import { Effect, Reducer } from "umi";
import { albumContent } from "@/services/album";

export interface AlbumModelState {
  songs: any;
}

export interface AlbumModelType {
  namespace: "album";
  state: AlbumModelState;
  effects: {
    getAlbumContent: Effect;
  };
  reducers: {
    SET_ALBUM_CONTENT: Reducer<AlbumModelState>;
  };
}

const albumModel: AlbumModelType = {
  namespace: "album",

  state: {
    songs: {}
  },

  effects: {
    *getAlbumContent({ id }, { call, put }) {
      const { code, songs } = yield call(albumContent, { id });
      if (code === 200) {
        yield put({
          type: "SET_ALBUM_CONTENT",
          id,
          songs
        });
      }
    }
  },

  reducers: {
    SET_ALBUM_CONTENT(state, action) {
      return {
        ...state,
        songs: {
          ...state?.songs,
          [action.id]: action.songs.map((item: any, index: number) => ({
            ...item,
            index,
            key: `${item.id}${item.name}`
          }))
        }
      };
    }
  }
};

export default albumModel;
