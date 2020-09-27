import React from 'react';
import styled from 'styled-components';
import { Row } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'umi';

interface TitleProps {
  title: string | React.ReactNode;
  pathname?: string;
}

const TitleBox = styled.div`
  margin: 12px 0;
`;

const TitleName = styled.b`
  margin-right: 8px;
  font-size: 18px;
`;

const WyTitle: React.FC<TitleProps> = (props) => {
  const { title, pathname } = props;
  return (
    <Link to={{ pathname }}>
      <Row align="middle">
        <TitleBox>
          <TitleName>{title}</TitleName>
          <RightOutlined/>
        </TitleBox>
      </Row>
    </Link>
  );
};

export default WyTitle;
