import request from '@/utils/request';

export const queryBanner = (params = { type: 0 }) => {
  return request('/banner', { method: 'get', params });
};

export const queryRecommendPlayList = (params = { limit: 10 }) => {
  return request('/personalized', { method: 'get', params });
};

export const queryRecommendExclusive = (params = { limit: 6 }) => {
  return request('/personalized/privatecontent/list', {
    method: 'get',
    params,
  });
};

export const queryRecommendMv = (params = { limit: 4 }) => {
  return request('/personalized/mv', { method: 'get', params });
};
