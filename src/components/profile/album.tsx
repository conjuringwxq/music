import React, { useMemo } from 'react';
import { Row, Col, List } from 'antd';
import { PlayCircleFilled } from '@ant-design/icons';
import styled from 'styled-components';
import moment from 'moment';
import { ProfileItemProps, ViewFormat } from '@/pages/profile';
import { Text, Image, ItalicDivider, CdMask } from '@/components/style';

const Box = styled.a`
  width: 150px;
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

const ListItem = styled(List.Item)`
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: #f2f2f3;
  }
`;

const ListItemContent = styled(Row)`
  width: 100%;
`;

export const ProfileAlbum: React.FC<ProfileItemProps> = (props) => {
  const { data, loading, viewFormat } = props;

  const renderView = useMemo(() => {
    switch (viewFormat) {
      case ViewFormat.App:
        return (
          <List
            loading={loading}
            dataSource={data}
            pagination={false}
            grid={{ gutter: 16, column: 5 }}
            renderItem={(item: any) => (
              <List.Item>
                <CdMask position={[-902, -835]}>
                  <Box>
                    <Image
                      src={require('@/assets/error.png')}
                      shape="square"
                      size={150}
                      alt=""
                      onLoad={(event: any) => {
                        event.target.src = item.picUrl;
                      }}
                    />
                    <VideoPlay className="video-play">
                      <PlayCircleFilled className="icon" />
                    </VideoPlay>
                  </Box>
                </CdMask>
                <Text>
                  {item.name}
                  {item.transNames?.map((val: any, idx: number) => (
                    <Text color="#a9a9a9" key={idx}>
                      （{val}
                      {idx !== item.transNames.length - 1 && (
                        <ItalicDivider type="vertical" />
                      )}
                      ）
                    </Text>
                  ))}
                </Text>
                <br />
                <Text color="#a9a9a9">
                  {moment(item.publishTime).format('YYYY-MM-DD')}
                </Text>
              </List.Item>
            )}
          />
        );
      case ViewFormat.List:
        return (
          <List
            loading={loading}
            dataSource={data}
            pagination={false}
            renderItem={(item: any) => (
              <ListItem>
                <ListItemContent align="middle">
                  <Col span={14}>
                    <List.Item.Meta
                      avatar={
                        <Image
                          src={require('@/assets/error.png')}
                          shape="square"
                          size={60}
                          onLoad={(event: any) => {
                            event.target.src = item.picUrl;
                          }}
                        />
                      }
                      title={
                        <Text>
                          {item.name}
                          {item.transNames?.map((val: any, idx: number) => (
                            <Text color="#a9a9a9" key={idx}>
                              （{val}
                              {idx !== item.transNames.length - 1 && (
                                <ItalicDivider type="vertical" />
                              )}
                              ）
                            </Text>
                          ))}
                        </Text>
                      }
                    />
                  </Col>
                  <Col span={4}>
                    <Text color="#a9a9a9">{item.size}首</Text>
                  </Col>
                  <Col span={6}>
                    <Text color="#a9a9a9">
                      发行时间: {moment(item.publishTime).format('YYYY-MM-DD')}
                    </Text>
                  </Col>
                </ListItemContent>
              </ListItem>
            )}
          />
        );
      case ViewFormat.Table:
        return 'Table';
      default:
        return <></>;
    }
  }, [viewFormat]);

  return <>{renderView}</>;
};
