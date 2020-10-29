import React, { useEffect } from 'react';
import { Space, Row, Col } from 'antd';
import { FolderAddOutlined, UserOutlined } from '@ant-design/icons';
import { connect, SingerModelState, useParams } from 'umi';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Image, Text, RaiseButton } from '@/components/style';

interface ProfileProps extends ConnectProps {
  singer: SingerModelState;
  submitting?: boolean;
}

interface Params {
  id: string;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const {
    singer: { message },
    submitting,
    dispatch,
  } = props;
  const params = useParams<Params>();

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'singer/querySingerSingle',
        id: params.id,
      });
    }
  }, [dispatch, params.id]);

  return (
    <>
      <Space>
        <Row gutter={[24, 0]}>
          <Image shape="square" size={200} src={message.picUrl} />
          <Col flex={1}>
            <Row gutter={[0, 14]}>
              <Col span={24}>
                <Text size={28} bold>
                  {message.name}
                </Text>
              </Col>
              <Col span={24}>
                <Space>
                  <RaiseButton icon={<FolderAddOutlined />}>收藏</RaiseButton>
                  <RaiseButton icon={<UserOutlined />}>个人主页</RaiseButton>
                </Space>
              </Col>
              <Col span={24}>
                <Space>
                  <Text>单曲数:</Text>
                  <Text color="#c9c9c9">{message.musicSize}</Text>
                  <Text>专辑数:</Text>
                  <Text color="#c9c9c9">{message.albumSize}</Text>
                  <Text>MV数:</Text>
                  <Text color="#c9c9c9">{message.mvSize}</Text>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Space>
    </>
  );
};

export default connect(({ singer, loading }: ConnectState) => ({
  singer,
  submitting: loading.effects['singer/querySingerSingle'],
}))(Profile);
