import React from "react";
import { List } from "antd";
import { CaretRightOutlined, PlayCircleFilled } from "@ant-design/icons";
import { useHistory } from "umi";
import styled from "styled-components";
import moment from "moment";
import { SearchItemProps } from "@/pages/search";
import { Text, Image } from "@/components/style";

const Box = styled.a`
  width: 100%;
  position: relative;
  display: block;

  &:hover {
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

const Duration = styled.span`
  opacity: 1;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 10px;
  z-index: 1;
  cursor: pointer;
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

const App: React.FC<SearchItemProps> = props => {
  const { loading, data } = props;

  const history = useHistory();

  /**
   * @function
   * @description 格式化播放次数
   * @param count
   */
  const renderCount = (count?: number) => {
    if (!count) return 0;
    const playCount = count.toString();
    const len = playCount.length;
    if (len > 4 && len < 9) {
      return `${playCount.substring(0, len - 4)}万`;
    }
    if (len > 8) {
      return `${playCount.substring(0, len - 8)}亿`;
    }
    return playCount;
  };

  return (
    <List
      loading={loading}
      dataSource={data}
      pagination={false}
      grid={{ gutter: 16, column: 4 }}
      renderItem={item => (
        <List.Item>
          <Box onClick={() => history.push(`/detail/mv/${item.id}`)}>
            <Image
              src={require("@/assets/error.png")}
              shape="square"
              size={{ width: "100%", height: "124px" }}
              alt=""
              onLoad={(event: any) => {
                event.target.src = item.cover;
              }}
            />
            <PlayCount color="#fff">
              <CaretRightOutlined className="icon" />
              {renderCount(item.playCount)}
            </PlayCount>
            <Duration>
              <Text color="#fff">{moment(item.duration).format("mm:ss")}</Text>
            </Duration>
            <VideoPlay className="video-play">
              <PlayCircleFilled className="icon" />
            </VideoPlay>
          </Box>
          <Text>{item.name}</Text>
          <br />
          {item.artists?.map((user: any, uIdx: number) => (
            <Text key={uIdx} color="#a9a9a9">
              {user.name}
            </Text>
          ))}
        </List.Item>
      )}
    />
  );
};

export const SearchMv = App;
