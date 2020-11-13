import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import DPlayer from "dplayer";

const VideoElement = styled.div`
  border-radius: 6px;
  width: 550px;
  height: 310px;
`;

interface Props {
  url: string;
  pic?: string;
}

const App: React.FC<Props> = props => {
  const { url, pic } = props;

  const [dp, setDp] = useState<DPlayer>();

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef) {
      const player = new DPlayer({
        container: videoRef.current,
        lang: "zh-cn",
        autoplay: true,
        video: { url, pic }
      });
      setDp(player);
    }
  }, [pic, url]);

  return <VideoElement ref={videoRef} />;
};

export const VideoPlayer = App;
