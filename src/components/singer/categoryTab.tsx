import React, { memo, useRef, useCallback } from "react";
import { Divider } from "antd";
import styled from "styled-components";
import { Text } from "@/components/style";

interface SingerCategoryTabProps {
  data: any[];
  active: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const TabButton = styled.span`
  padding: 3px 8px;
  display: inline-block;
  width: 60px;
  background-color: ${(props: { active: boolean }) => (props.active ? "rgba(53, 112, 191, .1)" : "transparent")};
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
`;

const DividerVertical = styled(Divider)`
  margin: auto 15px;
`;

const App: React.FC<SingerCategoryTabProps> = props => {
  const { data, active, onChange } = props;

  return (
    <>
      {data.map((item, index) => (
        <span key={item.value}>
          <TabButton key={item.value} active={active === item.value} onClick={() => onChange(item.value)}>
            <Text color={active === item.value ? "#3570bf" : "#333"}>{item.label}</Text>
          </TabButton>
          {index !== data.length - 1 && <DividerVertical type="vertical" />}
        </span>
      ))}
    </>
  );
};

export const SingerCategoryTab = memo(App);
