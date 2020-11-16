/*
 * @Author: your name
 * @Date: 2020-10-16 17:10:47
 * @LastEditTime: 2020-11-16 14:28:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /music/src/services/personalRecommend.ts
 */
import request from "@/utils/request";

export const getBanner = (params: any) => request("/banner", { params });

export const getRecommendPlayList = (params: any) => request("/personalized", { params });

export const getRecommendExclusive = (params: any) =>
  request("/personalized/privatecontent/list", {
    params
  });

export const getRecommendMv = (params: any) => request("/personalized/mv", { params });
