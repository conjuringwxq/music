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

/**
 * @function
 * @description 获取mv详情
 * @param params
 */
export const mvDetail = (params: any) => {
  return request('/mv/detail', {
    method: 'get',
    params,
  });
};

/**
 * @function
 * @description 获取 mv 点赞转发评论数数据
 * @param params
 */
export const mvDetailInfo = (params: any) => {
  return request('/mv/detail/info', {
    method: 'get',
    params,
  });
};

/**
 * @function
 * @description 获取 mv 地址
 * @param params
 */
export const mvUrl = (params: any) => {
  return request('/mv/url', {
    method: 'get',
    params,
  });
};
