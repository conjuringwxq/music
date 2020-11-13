import React, { useEffect } from "react";
import { Row, Col, List } from "antd";
import { useSetState } from "ahooks";
import { ProfileItemProps } from "@/pages/profile";
import { Text, Pre, Code } from "@/components/style";

interface StateType {
  dataSource: any[];
}

const App: React.FC<ProfileItemProps> = props => {
  const {
    loading,
    data: { message, detail }
  } = props;

  const [state, setState] = useSetState<StateType>({
    dataSource: []
  });

  useEffect(() => {
    const { briefDesc, introduction } = detail;
    const dataSource = [{ ti: `${message.name}简介`, txt: briefDesc }].concat(introduction || []);
    setState({ dataSource });
  }, [detail, message.name, setState]);

  return (
    <>
      <List
        loading={loading}
        dataSource={state.dataSource}
        pagination={false}
        renderItem={item => (
          <List.Item>
            <Row>
              <Col span={24}>
                <Text size={16} bold>
                  {item.ti}
                </Text>
              </Col>
              <Col span={24}>
                <Pre align="left">
                  <Code color="#a9a9a9">{item.txt}</Code>
                </Pre>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </>
  );
};

export const ProfileDetail = App;
