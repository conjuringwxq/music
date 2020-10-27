import React from 'react';
import { Row, Space } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import { Text } from '@/components/style';

interface AlbumTitleProps {
  title: string | React.ReactNode;
  pathname?: string;
}

const AlbumTitle: React.FC<AlbumTitleProps> = (props) => {
  const { title, pathname } = props;

  return (
    <>
      <br />
      <Row align="middle" gutter={[0, 16]}>
        <Text size={18} bold>
          <Link to={{ pathname }}>
            <Space>
              {title}
              <RightOutlined />
            </Space>
          </Link>
        </Text>
      </Row>
    </>
  );
};

export default AlbumTitle;
