import request from "@/utils/request";

/**
 * @function
 * @description 搜索结果列表
 * @param params
 */
export const searchResult = (params: any) => {
  return request("/search", {
    method: "get",
    params
  });
};
