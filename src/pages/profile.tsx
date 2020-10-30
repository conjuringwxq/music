import React, { useEffect } from 'react';
import { Space, Row, Col, Skeleton, Tabs, Radio } from 'antd';
import {
  FolderAddOutlined,
  UserOutlined,
  AppstoreOutlined,
  AlignCenterOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { connect, SingerModelState, useParams, useHistory } from 'umi';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Image, Text, RaiseButton } from '@/components/style';
import {
  ProfileAlbum,
  ProfileDetail,
  ProfileMv,
  ProfileSimilar,
} from '@/components/profile';
import { useSetState } from 'ahooks';

export interface ProfileItemProps {
  loading?: boolean;
  data?: any[];
}

interface ProfileProps extends ConnectProps {
  singer: SingerModelState;
  submitting?: boolean;
}

interface StateType {
  activeKey: string;
}

interface Params {
  id: string;
}

interface ProfileResult {
  key: string;
  value: string;
  component: JSX.Element;
}

const { TabPane } = Tabs;

const Profile: React.FC<ProfileProps> = (props) => {
  const {
    singer: { message },
    submitting,
    dispatch,
  } = props;
  const history = useHistory();
  const params = useParams<Params>();

  const [state, setState] = useSetState<StateType>({
    activeKey: 'album',
  });

  const profileResultMap: ProfileResult[] = [
    { key: 'album', value: '专辑', component: <ProfileAlbum /> },
    { key: 'mv', value: 'MV', component: <ProfileMv /> },
    { key: 'detail', value: '歌手详情', component: <ProfileDetail /> },
    { key: 'similar', value: '相似歌手', component: <ProfileSimilar /> },
  ];

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'singer/querySingerSingle',
        id: params.id,
      });
    }
  }, [dispatch, params.id]);

  const tabBarExtraContent = (
    <Radio.Group defaultValue="app" buttonStyle="solid" size="small">
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

  /**
   * @description 切换 tab 方法
   * @param activeKey 激活的 tab 的 key
   */
  const handleTabsChange = (activeKey: string) => {
    setState({ activeKey });
    history.push(`/profile/${params.id}/${activeKey}`);
  };

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
      <Tabs
        activeKey={state.activeKey}
        tabBarExtraContent={tabBarExtraContent}
        onChange={handleTabsChange}
      >
        {profileResultMap.map(({ key, value, component }) => (
          <TabPane tab={value} key={key}>
            {component}
          </TabPane>
        ))}
      </Tabs>
    </Skeleton>
  );
};

export default connect(({ singer, loading }: ConnectState) => ({
  singer,
  submitting: loading.effects['singer/querySingerSingle'],
}))(Profile);
