import request from '@/utils/request';

/**
 * @function
 * @description 歌手分类列表
 * @param params
 */
export const singerCategory = (params: any) => {
  return request('/artist/list', {
    method: 'get',
    params,
  });
};

/**
 * @function
 * @description 获取歌手单曲
 * @param params
 */
export const singerSingle = (params: any) => {
  return request('/artists', {
    method: 'get',
    params,
  });
};

/**
 * @function
 * @description 获取歌手Mv
 * @param params
 */
export const singerMv = (params: any) => {
  return request('/artist/mv', {
    method: 'get',
    params,
  });
};

/**
 * @function
 * @description 获取歌手专辑
 * @param params
 */
export const singerAlbum = (params: any) => {
  return request('/artist/album', {
    method: 'get',
    params,
  });
};

/**
 * @function
 * @description 获取歌手描述
 * @param params
 */
export const singerDesc = (params: any) => {
  return request('/artist/desc', {
    method: 'get',
    params,
  });
};

/**
 * @function
 * @description 获取相似歌手
 * @param params
 */
export const singerSimilar = (params: any) => {
  return request('/simi/artist', {
    method: 'get',
    params,
  });
};
