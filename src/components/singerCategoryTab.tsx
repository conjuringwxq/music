import React, { memo, useRef, useCallback } from 'react';
import { Divider } from 'antd';
import styled from 'styled-components';

interface CategoryTabProps {
  data: any[];
  circle?: boolean;
  value: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
}

const Text = styled.span`
  font-size: 12px;

  &.main {
    color: #333;
    margin-right: 15px;
  }

  &.item {
    display: inline-block;
    text-align: center;
    width: 60px;
    border-radius: 20px;
    padding: 3px 8px;

    &.circle {
      margin-bottom: 10px;
    }
  }
`;

const DividerVertical = styled(Divider)`
  margin: auto 15px;
`;

const CategoryTab: React.FC<CategoryTabProps> = (props) => {
  const { data, circle, value, onChange } = props;

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
        <Text key={item.key}>
          <Text
            className={`item ${circle ? 'circle' : ''}`}
            style={{
              color: index === 0 && value === '-1' ? '#3570bf' : '#333',
              backgroundColor:
                index === 0 && value === '-1'
                  ? 'rgba(53, 112, 191, .1)'
                  : 'transparent',
            }}
            onClick={(e: React.MouseEvent<HTMLSpanElement>) =>
              checkChoice(e, item.key, index)
            }
          >
            {item.value}
          </Text>
          {index !== data.length - 1 && <DividerVertical type="vertical" />}
        </Text>
      ))}
    </div>
  );
};

export default memo(CategoryTab);
