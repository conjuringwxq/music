import React, { useMemo } from 'react';
import { List, Avatar, Row, Col, Card } from 'antd';
import {
  CaretRightOutlined,
  EyeOutlined,
  PlayCircleFilled,
} from '@ant-design/icons';
import styled from 'styled-components';
import { SearchItemProps } from '@/pages/search';

const ListItem = styled(List.Item)``;

const Video = styled.a`
  width: 100%;
  position: relative;
  display: block;

  &:hover {
    .video-big-img {
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

const VideoPoster = styled.img`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

const VideoCount = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  z-index: 1;
  color: #fff;
  font-size: 12px;
`;

const VideoBigImg = styled.span`
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

const VideoTitle = styled.div``;

const Creator = styled.span`
  font-size: 12px;
  color: #c9c9c9;
`;

export const SearchVideo: React.FC<SearchItemProps> = (props) => {
  const { loading, data } = props;

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
      renderItem={(item) => (
        <ListItem>
          <Video>
            <VideoPoster
              src={require('@/assets/error.png')}
              alt=""
              onLoad={(event: any) => {
                event.target.src = item.coverUrl;
              }}
            />
            <VideoCount>
              <CaretRightOutlined className="icon" />
              {renderCount(item.playTime)}
            </VideoCount>
            <VideoBigImg className="video-big-img">
              <EyeOutlined className="icon" />
            </VideoBigImg>
            <VideoPlay className="video-play">
              <PlayCircleFilled className="icon" />
            </VideoPlay>
          </Video>
          <VideoTitle>{item.title}</VideoTitle>
          {item.creator?.map((user: any) => (
            <Creator key={user.userId}>{user.userName}</Creator>
          ))}
        </ListItem>
      )}
    />
  );
};
