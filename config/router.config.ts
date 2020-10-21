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
        path: '/playList',
        name: '歌单',
        component: './playList',
      },
      {
        path: '/radio',
        name: '主播电台',
        component: './radio',
      },
      {
        path: '/ranking',
        name: '排行榜',
        component: './ranking',
      },
      {
        path: '/singer',
        name: '歌手',
        component: './singer',
      },
      {
        path: '/newest',
        name: '最新音乐',
        component: './newest',
      },
      {
        path: '/detail/:id',
        name: '专辑详情',
        component: './detail',
      },
      {
        path: '/fm',
        name: '私人fm',
        component: './fm',
      },
      {
        path: '/video',
        name: '视频',
        component: './video',
      },
      {
        path: '/friend',
        name: '碰头',
        component: './friend',
      },
      {
        path: '/iTunes',
        name: 'iTunes音乐',
        component: './iTunes',
      },
      {
        path: '/download',
        name: '下载管理',
        component: './download',
      },
      {
        path: '/cloud',
        name: '我的音乐云盘',
        component: './cloud',
      },
      {
        path: '/collect',
        name: '我的收藏',
        component: './collect',
      },
      {
        path: '/love',
        name: '我喜欢的音乐',
        component: './love',
      },
      {
        path: '/hot',
        name: '热搜',
        component: './hot',
      },
      {
        path: '/search/:keywords',
        name: '搜索结果页',
        component: './search',
        routes: [
          {
            extra: true,
            path: '/search/:keywords',
            redirect: '/search/:keywords/1',
          },
          {
            extra: true,
            path: '/search/:keywords/1',
            name: '搜索单曲',
            component: './search/single',
          },
          {
            extra: true,
            path: '/search/:keywords/100',
            name: '搜索歌手',
            component: './search/singer',
          },
          {
            extra: true,
            path: '/search/:keywords/10',
            name: '搜索专辑',
            component: './search/album',
          },
          {
            extra: true,
            path: '/search/:keywords/1014',
            name: '搜索视频',
            component: './search/video',
          },
          {
            extra: true,
            path: '/search/:keywords/1000',
            name: '搜索歌单',
            component: './search/playList',
          },
          {
            extra: true,
            path: '/search/:keywords/1006',
            name: '搜索歌词',
            component: './search/lyric',
          },
          {
            extra: true,
            path: '/search/:keywords/1009',
            name: '搜索主播电台',
            component: './search/radio',
          },
          {
            extra: true,
            path: '/search/:keywords/1002',
            name: '搜索用户',
            component: './search/user',
          },
          {
            extra: true,
            path: '/search/:keywords/1004',
            name: '搜索MV',
            component: './search/mv',
          },
          {
            extra: true,
            path: '/search/:keywords/1018',
            name: '搜索综合',
            component: './search/synthesize',
          },
        ],
      },
    ],
  },
];

export default routes;
