import React, { useMemo } from "react";
import styled from "styled-components";
import moment from "moment";
import { CaretRightOutlined, EyeOutlined, PlayCircleFilled } from "@ant-design/icons";
import { useHistory } from "umi";
import { AlbumTitle } from "@/components/album";
import { Text, Image } from "@/components/style";

interface Props {
  title: string;
  partWidth: number;
  path: string;
  data?: any[];
}

interface AlbumItemProps {
  item: any;
  path: string;
  width: number;
}

const Box = styled.div`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const ItemBox = styled.section`
  position: relative;
  margin-right: 30px;
  margin-bottom: 10px;
  width: ${(props: { width: number }) => `${props.width}px`};
`;

const Item = styled.a`
  width: 100%;
  position: relative;
  display: block;

  &:hover {
    .big-image {
      > .icon {
        opacity: 1;
      }
    }

    .video-play {
      opacity: 1;
      background: rgba(30, 30, 34, 0.38);

      > .icon {
        transform: scale(0.9);
        opacity: 1;
      }
    }
  }
`;

const PlayCount = styled(Text)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  z-index: 1;
`;

const BigImage = styled.span`
  opacity: 1;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 20px;
  z-index: 1;
  cursor: pointer;

  > .icon {
    opacity: 0;
    color: #fff;
    font-size: 24px;
  }
`;

const VideoPlay = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 6px;
  opacity: 0;

  > .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 46px;
    margin: -23px 0 0 -23px;
    opacity: 0;
    background: #215fff;
    color: #fff;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
    transform: scale(0);
  }
`;

const Title = styled(Text)`
  margin: 5px auto 0;
  word-break: break-all;
`;

const Duration = styled.span`
  opacity: 1;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  z-index: 1;
  cursor: pointer;
`;

const AlbumItem: React.FC<AlbumItemProps> = ({ item, path, width }) => {
  const history = useHistory();

  // 格式化次数
  const formatCount = useMemo(() => {
    if (!item.playCount) return 0;
    const playCount = item.playCount.toString();
    const len = playCount.length;
    if (len > 4 && len < 9) {
      return `${playCount.substring(0, len - 4)}万`;
    }
    if (len > 8) {
      return `${playCount.substring(0, len - 8)}亿`;
    }
    return playCount;
  }, [item.playCount]);

  return (
    <ItemBox width={width}>
      <Item onClick={() => history.push(`/detail/${path}/${item.id}`)}>
        <Image
          src={require("@/assets/error.png")}
          shape="square"
          fit="contain"
          size={{ width: "100%", height: "auto" }}
          alt=""
          onLoad={(event: any) => {
            event.target.src = item.picUrl;
          }}
        />
        <PlayCount color="#fff">
          {formatCount !== 0 && (
            <>
              <CaretRightOutlined className="icon" />
              {formatCount}
            </>
          )}
        </PlayCount>
        <BigImage className="big-image">
          <EyeOutlined className="icon" />
        </BigImage>
        {item.duration && (
          <Duration>
            <Text color="#fff">{moment(item.duration).format("mm:ss")}</Text>
          </Duration>
        )}
        <VideoPlay className="video-play">
          <PlayCircleFilled className="icon" />
        </VideoPlay>
      </Item>
      <Title color="#797a87">{item.name}</Title>
    </ItemBox>
  );
};

export const App: React.FC<Props> = props => {
  const { title, partWidth, data = [], path } = props;

  return (
    <>
      <AlbumTitle title={title} />
      <Box>
        {data?.map(item => (
          <AlbumItem key={item.id} item={item} width={partWidth} path={path} />
        ))}
      </Box>
    </>
  );
};

export const AlbumModule = App;
