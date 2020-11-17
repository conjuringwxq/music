import React, { useState, useEffect } from "react";
import { Row, Col, Spin } from "antd";
import { useRequest } from "ahooks";
import styled from "styled-components";
import { Text, Image } from "@/components/style";
import { SingerCategoryTab } from "@/components/singer";

import { getSingerCategory } from "@/services/singer";

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

const Label = styled(Text)`
  line-height: 28px;
`;

const LANGUAGE_MAP = {
  全部: "-1",
  华语: "7",
  欧美: "96",
  日本: "8",
  韩国: "16",
  其他: "0"
};

const CATEGORY_MAP = {
  全部: "-1",
  男歌手: "1",
  女歌手: "2",
  乐队: "3"
};

const FILTRATE_MAP = {
  热门: "-1",
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
  G: "G",
  H: "H",
  I: "I",
  J: "J",
  K: "K",
  L: "L",
  M: "M",
  N: "N",
  O: "O",
  P: "P",
  Q: "Q",
  R: "R",
  S: "S",
  T: "T",
  U: "U",
  V: "V",
  W: "W",
  X: "X",
  Y: "Y",
  Z: "Z",
  "#": "0"
};

const objectToArrayWithKeyAndValue = (obj: { [key: string]: string }) => Object.entries(obj).map(([label, value]) => ({ label, value }));

const AREA = objectToArrayWithKeyAndValue(LANGUAGE_MAP);
const TYPE = objectToArrayWithKeyAndValue(CATEGORY_MAP);
const INITIAL = objectToArrayWithKeyAndValue(FILTRATE_MAP);

export default () => {
  const [dataSource, setDataSource] = useState([]);
  const [area, setArea] = useState(AREA[0].value);
  const [type, setType] = useState(TYPE[0].value);
  const [initial, setInitial] = useState(INITIAL[0].value);

  const { data, loading } = useRequest(() => getSingerCategory({ area, type, initial }), {
    refreshDeps: [area, type, initial]
  });

  useEffect(() => {
    if (data) {
      setDataSource(data.artists);
    }
  }, [data]);

  return (
    <>
      <MarginBottom>
        <Col>
          <Label>语种：</Label>
        </Col>
        <Col span={22}>
          <SingerCategoryTab data={AREA} active={area} onChange={setArea} />
        </Col>
      </MarginBottom>
      <MarginBottom>
        <Col>
          <Label>分类：</Label>
        </Col>
        <Col span={22}>
          <SingerCategoryTab data={TYPE} active={type} onChange={setType} />
        </Col>
      </MarginBottom>
      <MarginBottom>
        <Col>
          <Label>筛选：</Label>
        </Col>
        <Col span={22}>
          <SingerCategoryTab data={INITIAL} active={initial} onChange={setInitial} />
        </Col>
      </MarginBottom>
      <Spin spinning={loading}>
        <Row>
          {dataSource.map((item: any) => (
            <Col key={item.id}>
              <Cover className="cover-item">
                <Col span={24}>
                  <Image
                    src={require("@/assets/error.png")}
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
