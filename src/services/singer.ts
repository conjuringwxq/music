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
