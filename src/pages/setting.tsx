import React, { useMemo } from "react";
import { Row, Col, Checkbox, Space, Radio, Input, Slider } from "antd";
import { AppleFilled, AndroidFilled, WindowsFilled } from "@ant-design/icons";
import styled from "styled-components";
import { useSetState } from "ahooks";
import { RaiseButton, Text, HyperLink } from "@/components/style";

interface ChildrenProps {
  title: string;
  children: React.ReactNode;
}

interface StateType {
  grooveAnimate: boolean;
  groovePlayList: number;
  groovePlaySong: boolean;
  groovePrivateLetter: number;
  noticeCollect: boolean;
  noticeReceive: boolean;
  noticeNewFans: boolean;
  dynamicFri: boolean;
  ranking: number;
  globalKeys: boolean;
  systemKeys: boolean;
  auditionToneQuality: number;
  downloadToneQuality: number;
  cache: number;
  formatName: number;
  fileCategory: number;
  lyricType: number;
  launchLyric: boolean;
}

interface CacheMap {
  [key: string]: string;
}

const TextField = styled(Input)`
  width: 200px;
  border-radius: 6px;
`;

const MarginBottom = styled.div`
  margin-bottom: 20px;
`;

const SettingBox = styled.div`
  border-bottom: ${(props: { bordered?: boolean }) => (props.bordered === false ? 0 : "1px solid #eee")};
  padding-bottom: 24px;
`;

const SettingTitle = styled.h3`
  margin: 16px 0;
`;

const RadioItem = styled(Radio)`
  display: block;
  height: 30px;
  line-height: 30px;
`;

const SettingModule: React.FC<ChildrenProps> = props => {
  const { title, children } = props;

  return (
    <>
      <SettingTitle>{title}</SettingTitle>
      {children}
    </>
  );
};

const cacheMap: CacheMap = {
  1: "512M",
  2: "1G",
  3: "1.5G",
  4: "2G",
  5: "2.5G",
  6: "3G",
  7: "3.5G",
  8: "4G",
  9: "4.5G",
  10: "5G",
  11: "5.5G",
  12: "6G",
  13: "6.5G",
  14: "7G",
  15: "7.5G",
  16: "8G",
  17: "8.5G",
  18: "9G",
  19: "9.5G",
  20: "10G"
};

const Setting: React.FC = () => {
  const [state, setState] = useSetState<StateType>({
    grooveAnimate: true,
    groovePlayList: 1,
    groovePlaySong: true,
    groovePrivateLetter: 1,
    noticeCollect: false,
    noticeReceive: false,
    noticeNewFans: false,
    dynamicFri: false,
    ranking: 1,
    globalKeys: true,
    systemKeys: true,
    auditionToneQuality: 2,
    downloadToneQuality: 2,
    cache: 2,
    formatName: 2,
    fileCategory: 1,
    lyricType: 2,
    launchLyric: false
  });

  const CacheText = useMemo(() => {
    const key = state.cache.toString();
    return cacheMap[key];
  }, [state.cache]);

  const formatter = (value?: number) => {
    const key = value?.toString();
    return key ? `${cacheMap[key]}` : "";
  };

  return (
    <>
      <SettingBox>
        <Row gutter={[8, 8]}>
          <Col span={24}>登陆网易云音乐，手机电脑多端同步，320k高音质无限下载</Col>
          <Col span={24}>
            <RaiseButton size="small" type="primary" fontSize={12} width={100}>
              立即登陆
            </RaiseButton>
          </Col>
        </Row>
      </SettingBox>
      <SettingBox>
        <SettingModule title="常规">
          <MarginBottom>
            <Text>动画：</Text>
          </MarginBottom>
          <MarginBottom>
            <Checkbox checked={state.grooveAnimate} onChange={e => setState({ grooveAnimate: e.target.checked })}>
              <Text>禁用动画效果</Text>
              <Text color="#a9a9a9">（减少部分资源占用）</Text>
            </Checkbox>
          </MarginBottom>
          <MarginBottom>
            <Space>
              <Text>播放列表：</Text>
              <Text color="#a9a9a9">单曲、节目</Text>
            </Space>
          </MarginBottom>
          <MarginBottom>
            <Radio.Group onChange={e => setState({ groovePlayList: e.target.value })} value={state.groovePlayList}>
              <RadioItem value={1}>
                <Text>双击播放单曲时，用当前单曲所在的歌曲列表替换播放列表</Text>
                <Text color="#a9a9a9">（节目同理）</Text>
              </RadioItem>
              <RadioItem value={2}>
                <Text>双击播放单曲时，仅把当前单曲添加到播放列表</Text>
                <Text color="#a9a9a9">（节目同理）</Text>
              </RadioItem>
            </Radio.Group>
          </MarginBottom>
          <MarginBottom>
            <Text>播放歌曲时：</Text>
          </MarginBottom>
          <MarginBottom>
            <Checkbox checked={state.groovePlaySong} onChange={e => setState({ groovePlaySong: e.target.checked })}>
              <Text>启用系统歌曲播放通知栏</Text>
            </Checkbox>
          </MarginBottom>
        </SettingModule>
      </SettingBox>
      <SettingBox>
        <SettingModule title="消息与隐私">
          <MarginBottom>
            <Text>私信：</Text>
            <Text color="#a9a9a9">接收私信提醒</Text>
          </MarginBottom>
          <MarginBottom>
            <Radio.Group onChange={e => setState({ groovePrivateLetter: e.target.value })} value={state.groovePrivateLetter}>
              <RadioItem value={1}>
                <Text>所有人</Text>
              </RadioItem>
              <RadioItem value={2}>
                <Text>我关注的人</Text>
              </RadioItem>
            </Radio.Group>
          </MarginBottom>
          <MarginBottom>
            <Text>通知：</Text>
          </MarginBottom>
          <MarginBottom>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Checkbox checked={state.noticeCollect} onChange={e => setState({ noticeCollect: e.target.checked })}>
                  <Text>歌单被收藏</Text>
                </Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox checked={state.noticeReceive} onChange={e => setState({ noticeReceive: e.target.checked })}>
                  <Text>收到赞</Text>
                </Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox checked={state.noticeNewFans} onChange={e => setState({ noticeNewFans: e.target.checked })}>
                  <Text>新粉丝</Text>
                </Checkbox>
              </Col>
            </Row>
          </MarginBottom>
          <MarginBottom>
            <Text>推荐动态：</Text>
          </MarginBottom>
          <MarginBottom>
            <Checkbox checked={state.dynamicFri} onChange={e => setState({ dynamicFri: e.target.checked })}>
              <Text>“朋友”页显示推荐动态</Text>
              <Text color="#a9a9a9">（关闭后，朋友页将不会出现新的推荐动态）</Text>
            </Checkbox>
          </MarginBottom>
          <MarginBottom>
            <Text>我的听歌排行：</Text>
          </MarginBottom>
          <MarginBottom>
            <Radio.Group onChange={e => setState({ ranking: e.target.value })} value={state.ranking}>
              <RadioItem value={1}>
                <Text>所有人可见</Text>
              </RadioItem>
              <RadioItem value={2}>
                <Text>我关注的人可见</Text>
              </RadioItem>
              <RadioItem value={3}>
                <Text>仅自己可见</Text>
              </RadioItem>
            </Radio.Group>
          </MarginBottom>
          <MarginBottom>
            <Text>黑名单设置：</Text>
          </MarginBottom>
          <MarginBottom>
            <Text>我的黑名单：</Text>
            <RaiseButton size="small" fontSize={12} width={100}>
              查看
            </RaiseButton>
          </MarginBottom>
        </SettingModule>
      </SettingBox>
      <SettingBox>
        <SettingModule title="快捷键">
          <MarginBottom>
            <Row gutter={[8, 8]}>
              <Col span={7}>
                <Text color="#a9a9a9">功能说明</Text>
              </Col>
              <Col span={10}>
                <Text color="#a9a9a9">快捷键</Text>
              </Col>
              <Col span={7}>
                <Text color="#a9a9a9">全局快捷键</Text>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={7}>
                <Text>播放/暂停</Text>
              </Col>
              <Col span={10}>
                <TextField />
              </Col>
              <Col span={7}>
                <TextField />
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={7}>
                <Text>上一首</Text>
              </Col>
              <Col span={10}>
                <TextField />
              </Col>
              <Col span={7}>
                <TextField />
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={7}>
                <Text>下一首</Text>
              </Col>
              <Col span={10}>
                <TextField />
              </Col>
              <Col span={7}>
                <TextField />
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={7}>
                <Text>音量加</Text>
              </Col>
              <Col span={10}>
                <TextField />
              </Col>
              <Col span={7}>
                <TextField />
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={7}>
                <Text>音量减</Text>
              </Col>
              <Col span={10}>
                <TextField />
              </Col>
              <Col span={7}>
                <TextField />
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={7}>
                <Text>喜欢歌曲</Text>
              </Col>
              <Col span={10}>
                <TextField />
              </Col>
              <Col span={7}>
                <TextField />
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={7}>
                <Text>打开/关闭歌词</Text>
              </Col>
              <Col span={10}>
                <TextField />
              </Col>
              <Col span={7}>
                <TextField />
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={7}>
                <Text>mini/完整模式</Text>
              </Col>
              <Col span={10}>
                <TextField />
              </Col>
              <Col span={7}>
                <TextField />
              </Col>
            </Row>
          </MarginBottom>
          <MarginBottom>
            <Checkbox checked={state.globalKeys} onChange={e => setState({ globalKeys: e.target.checked })}>
              <Text>启用全局快捷键</Text>
              <Text color="#a9a9a9">（云音乐在后台时也能响应）</Text>
              <RaiseButton size="small" fontSize={12} width={100}>
                恢复默认
              </RaiseButton>
            </Checkbox>
          </MarginBottom>
          <MarginBottom>
            <Checkbox checked={state.systemKeys} onChange={e => setState({ systemKeys: e.target.checked })}>
              <Text>使用系统媒体快捷键</Text>
            </Checkbox>
          </MarginBottom>
        </SettingModule>
      </SettingBox>
      <SettingBox>
        <SettingModule title="下载设置">
          <MarginBottom>
            <Text>音质选择：</Text>
          </MarginBottom>
          <MarginBottom>
            <Space size={32}>
              <Text>试听</Text>
              <Radio.Group onChange={e => setState({ auditionToneQuality: e.target.value })} value={state.auditionToneQuality}>
                <Radio value={1}>
                  <Text>普通</Text>
                </Radio>
                <Radio value={2}>
                  <Text>较高</Text>
                </Radio>
                <Radio value={3}>
                  <Text>极高</Text>
                </Radio>
                <Radio value={4}>
                  <Text>无损音质</Text>
                </Radio>
              </Radio.Group>
            </Space>
          </MarginBottom>
          <MarginBottom>
            <Space size={32}>
              <Text>下载</Text>
              <Radio.Group onChange={e => setState({ downloadToneQuality: e.target.value })} value={state.downloadToneQuality}>
                <Radio value={1}>
                  <Text>普通</Text>
                </Radio>
                <Radio value={2}>
                  <Text>较高</Text>
                </Radio>
                <Radio value={3}>
                  <Text>极高</Text>
                </Radio>
                <Radio value={4}>
                  <Text>无损音质</Text>
                </Radio>
              </Radio.Group>
            </Space>
          </MarginBottom>
          <MarginBottom>
            <Text>缓存设置：</Text>
          </MarginBottom>
          <MarginBottom>
            <Row align="middle" gutter={[8, 8]}>
              <Col>
                <Text>缓存最大占用</Text>
              </Col>
              <Col span={8}>
                <Row align="middle" gutter={[8, 0]}>
                  <Col span={20}>
                    <Slider min={1} max={20} value={state.cache} tipFormatter={formatter} onChange={(value: number) => setState({ cache: value })} />
                  </Col>
                  <Col span={4}>
                    <Text>{CacheText}</Text>
                  </Col>
                </Row>
              </Col>
              <Col>
                <RaiseButton size="small" fontSize={12} width={100}>
                  清除缓存
                </RaiseButton>
              </Col>
            </Row>
          </MarginBottom>
          <MarginBottom>
            <Text>音乐命名格式：</Text>
          </MarginBottom>
          <MarginBottom>
            <Radio.Group onChange={e => setState({ formatName: e.target.value })} value={state.formatName}>
              <RadioItem value={1}>
                <Text>歌曲名</Text>
              </RadioItem>
              <RadioItem value={2}>
                <Text>歌手 - 歌曲名</Text>
              </RadioItem>
              <RadioItem value={3}>
                <Text>歌曲名 - 歌手</Text>
              </RadioItem>
            </Radio.Group>
          </MarginBottom>
          <MarginBottom>
            <Radio.Group onChange={e => setState({ fileCategory: e.target.value })} value={state.fileCategory}>
              <RadioItem value={1}>
                <Text>不分文件夹</Text>
              </RadioItem>
              <RadioItem value={2}>
                <Text>按歌手分文件夹</Text>
              </RadioItem>
              <RadioItem value={3}>
                <Text>按歌手 \ 专辑分文件夹</Text>
              </RadioItem>
            </Radio.Group>
          </MarginBottom>
        </SettingModule>
      </SettingBox>
      <SettingBox>
        <SettingModule title="歌词">
          <MarginBottom>
            <Text>类型：</Text>
          </MarginBottom>
          <MarginBottom>
            <Radio.Group onChange={e => setState({ lyricType: e.target.value })} value={state.lyricType}>
              <RadioItem value={1}>
                <Text>桌面歌词</Text>
              </RadioItem>
              <RadioItem value={2}>
                <Text>菜单栏歌词</Text>
              </RadioItem>
            </Radio.Group>
          </MarginBottom>
          <MarginBottom>
            <Text>启用：</Text>
          </MarginBottom>
          <MarginBottom>
            <Checkbox checked={state.launchLyric} onChange={e => setState({ launchLyric: e.target.checked })}>
              <Text>启用歌词</Text>
            </Checkbox>
          </MarginBottom>
        </SettingModule>
      </SettingBox>
      <SettingBox bordered={false}>
        <SettingModule title="关于网易云音乐">
          <MarginBottom>
            <Space>
              <Text>当前版本2.3.2（Build: 832）</Text>
              <RaiseButton size="small" fontSize={12} width={100}>
                检查更新
              </RaiseButton>
              <RaiseButton size="small" fontSize={12} width={100}>
                意见反馈
              </RaiseButton>
            </Space>
          </MarginBottom>
          <MarginBottom>
            <Space>
              <Text>下载移动客户端</Text>
              <RaiseButton size="small" type="primary" icon={<AppleFilled />} fontSize={12} width={100}>
                iPhone版
              </RaiseButton>
              <RaiseButton size="small" type="primary" icon={<AppleFilled />} fontSize={12} width={100}>
                iPad版
              </RaiseButton>
              <RaiseButton size="small" type="primary" icon={<AndroidFilled />} fontSize={12} width={100}>
                Android版
              </RaiseButton>
              <RaiseButton size="small" type="primary" icon={<WindowsFilled />} fontSize={12} width={100}>
                WP版
              </RaiseButton>
            </Space>
          </MarginBottom>
          <MarginBottom>
            <Space>
              <HyperLink href="https://music.163.com/" target="_blank">
                《网易云音乐官网》
              </HyperLink>
              <HyperLink href="http://music.163.com/static/guideline.html" target="_blank">
                《网易云音乐社区管理细则》
              </HyperLink>
              <HyperLink href="https://st.music.163.com/official-terms/service" target="_blank">
                《服务条款》
              </HyperLink>
              <HyperLink href="https://st.music.163.com/official-terms/privacy" target="_blank">
                《隐私政策》
              </HyperLink>
              <HyperLink href="https://st.music.163.com/official-terms/children" target="_blank">
                《儿童隐私政策》
              </HyperLink>
            </Space>
          </MarginBottom>
        </SettingModule>
      </SettingBox>
    </>
  );
};

export default Setting;
