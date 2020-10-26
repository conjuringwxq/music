import React, { memo, useRef, useCallback } from 'react';
import { Divider } from 'antd';
import styled from 'styled-components';
import { Text } from '@/components/style';

interface SingerCategoryTabProps {
  data: any[];
  value: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
}

const TabButton = styled.span`
  padding: 3px 8px;
  display: inline-block;
  width: 60px;
  background-color: ${(props: { active: boolean }) =>
    props.active ? 'rgba(53, 112, 191, .1)' : 'transparent'};
  text-align: center;
  border-radius: 20px;
`;

const DividerVertical = styled(Divider)`
  margin: auto 15px;
`;

const SingerCategoryTab: React.FC<SingerCategoryTabProps> = (props) => {
  const { data, value, onChange } = props;

  const choiceRef = useRef(null);

  const checkChoice = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>, key: string, index: number) => {
      e.persist();
      const currentTarget = (choiceRef.current as any).children;
      currentTarget.forEach((item: any, idx: number) => {
        if (idx === index) {
          item.children[0].style.color = '#3570bf';
          item.children[0].style.backgroundColor = 'rgba(53, 112, 191, .1)';
        } else {
          item.children[0].style.color = '#333';
          item.children[0].style.backgroundColor = 'transparent';
        }
      });
      if (onChange) {
        onChange(key);
      }
    },
    [onChange],
  );

  return (
    <div ref={choiceRef}>
      {data.map((item, index) => (
        <span key={item.key}>
          <TabButton
            key={item.key}
            active={index === 0 && value === '-1'}
            onClick={(e: React.MouseEvent<HTMLSpanElement>) =>
              checkChoice(e, item.key, index)
            }
          >
            <Text color={index === 0 && value === '-1' ? '#3570bf' : '#333'}>
              {item.value}
            </Text>
          </TabButton>
          {index !== data.length - 1 && <DividerVertical type="vertical" />}
        </span>
      ))}
    </div>
  );
};

export default memo(SingerCategoryTab);
