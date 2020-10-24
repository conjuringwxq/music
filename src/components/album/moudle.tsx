import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
  CaretRightOutlined,
  EyeOutlined,
  PlayCircleFilled,
} from '@ant-design/icons';
import { useHistory } from 'umi';
import AlbumTitle from '@/components/album/title';

interface AlbumModuleProps {
  title: string;
  itemWidth: number;
  data?: any[];
}

interface ItemProps {
  item: any;
  width: number;
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

const Item: React.FC<ItemProps> = ({ item, width }) => {
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
    <AlbumItem width={width}>
      <AlbumItemPic onClick={() => history.push(`/detail/${item.id}`)}>
        <img
          src={require('@/assets/error.png')}
          alt=""
          onLoad={(event: any) => {
            event.target.src = item.picUrl;
          }}
        />
        <AlbumItemCount>
          {formatCount !== 0 && (
            <>
              <CaretRightOutlined className="icon" />
              {formatCount}
            </>
          )}
        </AlbumItemCount>
        <AlbumItemBigPic className="album-big-pic">
          <EyeOutlined className="icon" />
        </AlbumItemBigPic>
        <AlbumItemPlay className="album-play">
          <PlayCircleFilled className="icon" />
        </AlbumItemPlay>
      </AlbumItemPic>
      <AlbumItemTitle>{item.name}</AlbumItemTitle>
    </AlbumItem>
  );
};

/**
 * @description 推荐专辑组件
 * @param {AlbumModuleProps} props
 */
const AlbumModule: React.FC<AlbumModuleProps> = (props) => {
  const { title, itemWidth, data = [] } = props;

  return (
    <Album>
      <AlbumTitle title={title} />
      <AlbumContainer>
        {data?.map((item) => (
          <Item key={item.id} item={item} width={itemWidth} />
        ))}
      </AlbumContainer>
    </Album>
  );
};

export default AlbumModule;
