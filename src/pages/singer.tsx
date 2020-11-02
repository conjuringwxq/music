import React, { useState, useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import { connect } from 'umi';
import styled from 'styled-components';
import { ConnectState, ConnectProps } from '@/models/connect';
import { Text, Image } from '@/components/style';
import { SingerModelState } from '@/models/singer';
import { SingerCategoryTab } from '@/components/singer';

interface SingerProps extends ConnectProps {
  singer: SingerModelState;
  submitting?: boolean;
}

const MarginBottom = styled(Row)`
  margin-bottom: 10px;
`;

const Cover = styled(Col)`
  &.cover-item {
    cursor: pointer;
    margin-right: 15px;
    margin-bottom: 15px;

    img {
      width: 150px;
      height: 150px;
      border-radius: 6px;
    }
  }
`;

const Map = {
  language: [
    {
      key: '-1',
      value: '全部',
    },
    {
      key: '7',
      value: '华语',
    },
    {
      key: '96',
      value: '欧美',
    },
    {
      key: '8',
      value: '日本',
    },
    {
      key: '16',
      value: '韩国',
    },
    {
      key: '0',
      value: '其他',
    },
  ],
  category: [
    {
      key: '-1',
      value: '全部',
    },
    {
      key: '1',
      value: '男歌手',
    },
    {
      key: '2',
      value: '女歌手',
    },
    {
      key: '3',
      value: '乐队',
    },
  ],
  filter: [
    {
      key: '-1',
      value: '热门',
    },
    {
      key: 'A',
      value: 'A',
    },
    {
      key: 'B',
      value: 'B',
    },
    {
      key: 'C',
      value: 'C',
    },
    {
      key: 'D',
      value: 'D',
    },
    {
      key: 'E',
      value: 'E',
    },
    {
      key: 'F',
      value: 'F',
    },
    {
      key: 'G',
      value: 'G',
    },
    {
      key: 'H',
      value: 'H',
    },
    {
      key: 'I',
      value: 'I',
    },
    {
      key: 'J',
      value: 'J',
    },
    {
      key: 'K',
      value: 'K',
    },
    {
      key: 'L',
      value: 'L',
    },
    {
      key: 'M',
      value: 'M',
    },
    {
      key: 'N',
      value: 'N',
    },
    {
      key: 'O',
      value: 'O',
    },
    {
      key: 'P',
      value: 'P',
    },
    {
      key: 'Q',
      value: 'Q',
    },
    {
      key: 'R',
      value: 'R',
    },
    {
      key: 'S',
      value: 'S',
    },
    {
      key: 'T',
      value: 'T',
    },
    {
      key: 'U',
      value: 'U',
    },
    {
      key: 'V',
      value: 'V',
    },
    {
      key: 'W',
      value: 'W',
    },
    {
      key: 'X',
      value: 'X',
    },
    {
      key: 'Y',
      value: 'Y',
    },
    {
      key: 'Z',
      value: 'Z',
    },
    {
      key: '0',
      value: '#',
    },
  ],
};

const Singer: React.FC<SingerProps> = (props) => {
  const {
    singer: { categories },
    dispatch,
    submitting,
  } = props;

  const { language: type, category: area, filter: initial } = Map;

  const [language, setLanguage] = useState('-1');
  const [category, setCategory] = useState('-1');
  const [filter, setFilter] = useState('-1');

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'singer/querySingerCategoryList',
        area: language,
        typeAlias: category,
        initial: filter,
      });
    }
  }, [category, dispatch, filter, language]);

  return (
    <>
      <MarginBottom>
        <Col>
          <Text className="main">语种：</Text>
        </Col>
        <Col span={22}>
          <SingerCategoryTab
            data={area}
            value={language}
            onChange={setLanguage}
          />
        </Col>
      </MarginBottom>
      <MarginBottom>
        <Col>
          <Text className="main">分类：</Text>
        </Col>
        <Col span={22}>
          <SingerCategoryTab
            data={type}
            value={category}
            onChange={setCategory}
          />
        </Col>
      </MarginBottom>
      <MarginBottom>
        <Col>
          <Text className="main">筛选：</Text>
        </Col>
        <Col span={22}>
          <SingerCategoryTab
            data={initial}
            value={filter}
            onChange={setFilter}
          />
        </Col>
      </MarginBottom>
      <Spin spinning={submitting}>
        <Row>
          {categories?.map((item: any) => (
            <Col key={item.id}>
              <Cover className="cover-item">
                <Col span={24}>
                  <Image
                    src={require('@/assets/error.png')}
                    alt=""
                    shape="square"
                    onLoad={(event: any) => {
                      event.target.src = item.img1v1Url;
                    }}
                  />
                </Col>
                <Col span={24}>
                  <Text>{item.name}</Text>
                </Col>
              </Cover>
            </Col>
          ))}
        </Row>
      </Spin>
    </>
  );
};

export default connect(({ singer, loading }: ConnectState) => ({
  singer,
  submitting: loading.effects['singer/querySingerCategoryList'],
}))(Singer);
