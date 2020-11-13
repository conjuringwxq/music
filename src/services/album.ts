import request from "@/utils/request";

/**
 * @function
 * @description 根据 id 获取专辑内容
 * @param params
 */
export const albumContent = (params: any) => {
  return request("/album", {
    method: "get",
    params
  });
};
