import React from 'react';
import styled from 'styled-components';
import {
  CaretRightOutlined,
  EyeOutlined,
  PlayCircleFilled,
} from '@ant-design/icons';
import { useHistory } from 'umi';
import MTitle from '@/components/mTitle';

interface MReAlbumProps {
  title: string;
  itemWidth: number;
  data: any[];
}

const Album = styled.div``;

const AlbumContainer = styled.div`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const AlbumItem = styled.section`
  position: relative;
  margin-right: 30px;
  margin-bottom: 10px;
  width: ${(props: { width: number }) => `${props.width}px`};
`;

const AlbumItemPic = styled.a`
  width: 100%;
  position: relative;
  display: block;

  > img {
    background: #ccc;
    width: 100%;
    object-fit: contain;
    border: 1px solid #ddd;
    border-radius: 6px;
  }

  &:hover {
    .album-big-pic {
      > .icon {
        opacity: 1;
      }
    }

    .album-play {
      opacity: 1;
      background: rgba(30, 30, 34, 0.38);

      > .icon {
        transform: scale(0.9);
        opacity: 1;
      }
    }
  }
`;

const AlbumItemCount = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  z-index: 1;
  color: #fff;
  font-size: 12px;
`;

const AlbumItemBigPic = styled.span`
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

const AlbumItemPlay = styled.span`
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

const AlbumItemTitle = styled.p`
  margin: 5px auto 0;
  font-size: 12px;
  color: #797a87;
  word-break: break-all;
`;

/**
 * @function
 * @description 格式化次数
 * @param {string} count
 */
const formatCount = (count: string) => {
  const newCount = count.toString();

  if (newCount.length > 4 && newCount.length < 9) {
    return `${newCount.substring(0, newCount.length - 4)}万`;
  }

  if (newCount.length > 8) {
    return `${newCount.substring(0, newCount.length - 8)}亿`;
  }

  return newCount;
};

/**
 * @description 推荐专辑组件
 * @param {MReAlbumProps} props
 */
const MReAlbum: React.FC<MReAlbumProps> = (props) => {
  const { title, itemWidth, data = [] } = props;
  const history = useHistory();

  return (
    <Album>
      <MTitle title={title}/>
      <AlbumContainer>
        {data.map((item) => (
          <AlbumItem key={item.id} width={itemWidth}>
            <AlbumItemPic onClick={() => history.push(`/detail/${item.id}`)}>
              <img
                src={require('@/assets/error.png')}
                alt=""
                onLoad={(event: any) => {
                  event.target.src = item.picUrl;
                }}
              />
              {item.playCount && (
                <AlbumItemCount>
                  <CaretRightOutlined className="icon"/>
                  {formatCount(item.playCount)}
                </AlbumItemCount>
              )}
              <AlbumItemBigPic className="album-big-pic">
                <EyeOutlined className="icon"/>
              </AlbumItemBigPic>
              <AlbumItemPlay className="album-play">
                <PlayCircleFilled className="icon"/>
              </AlbumItemPlay>
            </AlbumItemPic>
            <AlbumItemTitle>{item.name}</AlbumItemTitle>
          </AlbumItem>
        ))}
      </AlbumContainer>
    </Album>
  );
};

export default MReAlbum;
