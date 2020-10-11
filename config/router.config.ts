const routes = [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/personalRecommend',
      },
      {
        path: '/setting',
        name: '设置',
        component: './setting',
      },
      {
        path: '/personalRecommend',
        name: '个性推荐',
        component: './index',
      },
      {
        path: '/detail/:id',
        name: '专辑详情',
        component: './detail',
      }
    ],
  },
];

export default routes;
