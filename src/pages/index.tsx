import React, { useState, useEffect } from "react";
import { useMount, useRequest } from "ahooks";
import { Spin } from "antd";
import { getBanner, getRecommendPlayList, getRecommendExclusive, getRecommendMv } from "@/services/personalRecommend";
import { SlideShow } from "@/components/slideshow";
import { AlbumModule } from "@/components/album";

export default () => {
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState([]);
  const [playList, setPlayList] = useState([]);
  const [exclusive, setExclusive] = useState([]);
  const [mv, setMv] = useState([]);

  const getBannerRequest = useRequest(() => getBanner({ type: 0 }), { manual: true });
  const getRecommendPlayListRequest = useRequest(() => getRecommendPlayList({ limit: 10 }), { manual: true });
  const getRecommendExclusiveRequest = useRequest(() => getRecommendExclusive({ limit: 6 }), { manual: true });
  const getRecommendMvRequest = useRequest(() => getRecommendMv({ limit: 4 }), { manual: true });

  useMount(() => {
    getBannerRequest.run();
    getRecommendPlayListRequest.run();
    getRecommendExclusiveRequest.run();
    getRecommendMvRequest.run();
  });

  useEffect(() => {
    setLoading(getBannerRequest.loading && getRecommendPlayListRequest.loading && getRecommendExclusiveRequest.loading && getRecommendMvRequest.loading);
  }, [getBannerRequest.loading, getRecommendExclusiveRequest.loading, getRecommendMvRequest.loading, getRecommendPlayListRequest.loading]);

  useEffect(() => {
    if (getBannerRequest.data) {
      setBanner(getBannerRequest.data.banners);
    }
    if (getRecommendPlayListRequest.data) {
      setPlayList(getRecommendPlayListRequest.data.result);
    }
    if (getRecommendExclusiveRequest.data) {
      setExclusive(getRecommendExclusiveRequest.data.result);
    }
    if (getRecommendMvRequest.data) {
      setMv(getRecommendMvRequest.data.result);
    }
  }, [getBannerRequest.data, getRecommendExclusiveRequest.data, getRecommendMvRequest.data, getRecommendPlayListRequest.data]);

  return (
    <Spin spinning={loading}>
      <SlideShow data={banner} />
      <AlbumModule title="推荐歌单" partWidth={150} data={playList} path="playList" />
      <AlbumModule title="独家放送" partWidth={270} data={exclusive} path="mv" />
      <AlbumModule title="推荐MV" partWidth={270} data={mv} path="mv" />
    </Spin>
  );
};
