import React, { useEffect } from 'react';
import { Space, Row, Col, Skeleton, Tabs, Radio } from 'antd';
import {
  FolderAddOutlined,
  UserOutlined,
  AppstoreOutlined,
  AlignCenterOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
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

const { TabPane } = Tabs;

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

  const tabBarExtraContent = (
    <Radio.Group defaultValue="a" buttonStyle="solid" size="small">
      <Radio.Button value="app">
        <AppstoreOutlined />
      </Radio.Button>
      <Radio.Button value="list">
        <AlignCenterOutlined />
      </Radio.Button>
      <Radio.Button value="table">
        <UnorderedListOutlined />
      </Radio.Button>
    </Radio.Group>
  );

  return (
    <Skeleton loading={submitting} avatar active>
      <Space>
        <Row gutter={[24, 0]}>
          <Image
            src={require('@/assets/error.png')}
            shape="square"
            size={200}
            onLoad={(event: any) => {
              event.target.src = message.picUrl;
            }}
          />
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
                  <Text color="#a9a9a9">{message.musicSize}</Text>
                  <Text>专辑数:</Text>
                  <Text color="#a9a9a9">{message.albumSize}</Text>
                  <Text>MV数:</Text>
                  <Text color="#a9a9a9">{message.mvSize}</Text>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Space>
      <Tabs defaultActiveKey="1" tabBarExtraContent={tabBarExtraContent}>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </Skeleton>
  );
};

export default connect(({ singer, loading }: ConnectState) => ({
  singer,
  submitting: loading.effects['singer/querySingerSingle'],
}))(Profile);
