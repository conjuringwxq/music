import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { Text } from '@/components/style';

const Box = styled.div`
  position: relative;

  textarea {
    border-radius: 6px;
  }
`;

const Count = styled(Text)`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

interface TextAreaProps {
  rows?: number;
  placeholder?: string;
  allowClear?: boolean;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  count: number | string;
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const { rows, placeholder, value, onChange, allowClear, count } = props;

  return (
    <Box>
      <Input.TextArea
        rows={rows || 3}
        value={value}
        placeholder={placeholder || ''}
        onChange={(event) => onChange(event.target.value)}
        allowClear={allowClear || true}
      />
      <Count color="#a9a9a9">{count}</Count>
    </Box>
  );
};

export default TextArea;
