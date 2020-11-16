/*
 * @Author: your name
 * @Date: 2020-10-16 17:10:47
 * @LastEditTime: 2020-11-16 10:54:23
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /music/src/services/personalRecommend.ts
 */
import request from "@/utils/request";

export const getBanner = (params = { type: 0 }) => {
  return request("/banner", { method: "get", params });
};

export const getRecommendPlayList = (params = { limit: 10 }) => {
  return request("/personalized", { method: "get", params });
};

export const getRecommendExclusive = (params = { limit: 6 }) => {
  return request("/personalized/privatecontent/list", {
    method: "get",
    params
  });
};

export const getRecommendMv = (params = { limit: 4 }) => {
  return request("/personalized/mv", { method: "get", params });
};
