const routes = [
  {
    path: "/",
    component: "../layouts/BasicLayout",
    routes: [
      {
        path: "/",
        redirect: "/personalRecommend"
      },
      {
        path: "/setting",
        name: "设置",
        component: "./setting"
      },
      {
        path: "/personalRecommend",
        name: "个性推荐",
        component: "./index"
      },
      {
        path: "/playList",
        name: "歌单",
        component: "./playList"
      },
      {
        path: "/radio",
        name: "主播电台",
        component: "./radio"
      },
      {
        path: "/ranking",
        name: "排行榜",
        component: "./ranking"
      },
      {
        path: "/singer",
        name: "歌手",
        component: "./singer"
      },
      {
        path: "/newest",
        name: "最新音乐",
        component: "./newest"
      },
      {
        path: "/fm",
        name: "私人fm",
        component: "./fm"
      },
      {
        path: "/video",
        name: "视频",
        component: "./video"
      },
      {
        path: "/friend",
        name: "碰头",
        component: "./friend"
      },
      {
        path: "/iTunes",
        name: "iTunes音乐",
        component: "./iTunes"
      },
      {
        path: "/download",
        name: "下载管理",
        component: "./download"
      },
      {
        path: "/cloud",
        name: "我的音乐云盘",
        component: "./cloud"
      },
      {
        path: "/collect",
        name: "我的收藏",
        component: "./collect"
      },
      {
        path: "/love",
        name: "我喜欢的音乐",
        component: "./love"
      },
      {
        path: "/hot",
        name: "热搜",
        component: "./hot"
      },
      {
        path: "/search/:keywords/:type",
        name: "搜索结果页",
        component: "./search"
      },
      {
        path: "/profile/:id/:type",
        name: "用户中心",
        component: "./profile"
      },
      {
        path: "/personal",
        name: "个人主页",
        component: "./personal"
      },
      {
        path: "/detail",
        name: "详情",
        routes: [
          {
            path: "/detail/playlist/:id",
            name: "歌单详情",
            component: "./detail/playList"
          },
          {
            path: "/detail/mv/:id",
            name: "mv详情",
            component: "./detail/mv"
          },
          {
            path: "/detail/video/:id",
            name: "视频详情",
            component: "./detail/video"
          }
        ]
      }
    ]
  }
];

export default routes;
