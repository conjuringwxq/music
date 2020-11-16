/*
 * @Author: your name
 * @Date: 2020-10-16 17:10:47
 * @LastEditTime: 2020-11-16 14:44:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /music/src/services/singer.ts
 */
import request from "@/utils/request";

/**
 * @function
 * @description 歌手分类列表
 * @param params
 */
export const getSingerCategory = (params: any) =>
  request("/artist/list", {
    params
  });

/**
 * @function
 * @description 获取歌手单曲
 * @param params
 */
export const singerSingle = (params: any) =>
  request("/artists", {
    params
  });

/**
 * @function
 * @description 获取歌手Mv
 * @param params
 */
export const singerMv = (params: any) =>
  request("/artist/mv", {
    params
  });

/**
 * @function
 * @description 获取歌手专辑
 * @param params
 */
export const singerAlbum = (params: any) =>
  request("/artist/album", {
    params
  });

/**
 * @function
 * @description 获取歌手描述
 * @param params
 */
export const singerDetail = (params: any) =>
  request("/artist/desc", {
    params
  });

/**
 * @function
 * @description 获取相似歌手
 * @param params
 */
export const singerSimilar = (params: any) =>
  request("/simi/artist", {
    params
  });
