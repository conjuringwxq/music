import request from '@/utils/request';

/**
 * @function
 * @description 查询歌单歌曲列表
 * @param params
 */
export const playListDetailList = (params: any) => {
  return request('/playlist/detail', {
    method: 'get',
    params,
  });
};

/**
 *
 * @function
 * @description 查询歌单评论
 * @param params
 */
export const playListCommentList = (params: any) => {
  return request('/comment/playlist', {
    method: 'get',
    params,
  });
};

/**
 * @function
 * @description 查询歌单收藏者
 * @param params
 */
export const playListCollector = (params: any) => {
  return request('/playlist/subscribers', {
    method: 'get',
    params,
  });
};
