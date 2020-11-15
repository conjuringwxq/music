/*
 * @Author: your name
 * @Date: 2020-10-16 17:10:47
 * @LastEditTime: 2020-11-15 15:24:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /music/src/services/detail.ts
 */
import request from "@/utils/request";

/**
 * @function
 * @description 查询歌单歌曲列表
 * @param params
 */
export const playListDetailList = (params: any) => {
  return request("/playlist/detail", {
    method: "get",
    params
  });
};

/**
 *
 * @function
 * @description 查询歌单评论
 * @param params
 */
export const playListCommentList = (params: any) => {
  return request("/comment/playlist", {
    method: "get",
    params
  });
};

/**
 * @function
 * @description 查询歌单收藏者
 * @param params
 */
export const playListCollector = (params: any) => {
  return request("/playlist/subscribers", {
    method: "get",
    params
  });
};

/**
 * @function
 * @description 获取mv详情
 * @param params
 */
export const mvDetail = (params: any) => {
  return request("/mv/detail", {
    method: "get",
    params
  });
};

/**
 * @function
 * @description 获取 mv 点赞转发评论数数据
 * @param params
 */
export const mvDetailInfo = (params: any) => {
  return request("/mv/detail/info", {
    method: "get",
    params
  });
};

/**
 * @function
 * @description 获取 mv 地址
 * @param params
 */
export const mvUrl = (params: any) => {
  return request("/mv/url", {
    method: "get",
    params
  });
};

/**
 * @function
 * @description 获取视频详情
 * @param params
 */
export const videoDetail = (params: any) => {
  return request("/video/detail", {
    method: "get",
    params
  });
};

/**
 * @function
 * @description 获取视频点赞转发评论数数据
 * @param params
 */
export const videoDetailInfo = (params: any) => {
  return request("/video/detail/info", {
    method: "get",
    params
  });
};

/**
 * @function
 * @description 获取视频地址
 * @param params
 */
export const videoUrl = (params: any) => {
  return request("/video/url", {
    method: "get",
    params
  });
};

/**
 * @function
 * @description 获取相关视频
 * @param params
 */
export const videoRelated = (params: any) => {
  return request("/related/allvideo", {
    method: "get",
    params
  });
};
