import { Divider, Button } from 'antd';
import styled from 'styled-components';

interface TextProps {
  color?: string;
  size?: number;
  bold?: boolean;
}

interface AvatarProps {
  size: number;
  shape: 'square' | 'circle';
}
interface ItalicDividerProps {
  color?: string;
}

interface RaiseButtonProps {
  radius?: string;
  fontSize?: number;
  width?: 'auto' | number;
}

interface PreProps {
  align?: string;
}

export const Text = styled.span`
  font-size: ${({ size = 12 }: TextProps) => `${size}px`};
  color: ${({ color = '#333' }: TextProps) => color};
  font-weight: ${({ bold = false }: TextProps) => (bold ? 'bold' : 'normal')};
`;

export const Avatar = styled.img`
  border-radius: ${({ shape = 'circle' }: AvatarProps) =>
    shape === 'circle' ? '50%' : '6px'};
  width: ${({ size = 40 }: AvatarProps) => `${size}px`};
  height: ${({ size = 40 }: AvatarProps) => `${size}px`};
`;

export const ItalicDivider = styled(Divider)`
  transform: rotate(30deg);
  border-left: 1px solid ${({ color = '#a9a9a9' }: ItalicDividerProps) => color};
`;

export const RaiseButton = styled(Button)`
  border-radius: ${({ radius = '20px' }: RaiseButtonProps) => radius};
  font-size: ${({ fontSize = 14 }: RaiseButtonProps) => `${fontSize}px`};
  width: ${({ width = 'auto' }: RaiseButtonProps) =>
    width === 'auto' ? width : `${width}px`};
`;

export const Pre = styled.pre`
  text-align: ${({ align = 'center' }: PreProps) => align};
`;

export const Code = styled.code`
  font-size: ${({ size = 12 }: TextProps) => `${size}px`};
  color: ${({ color = '#333' }: TextProps) => color};
  font-weight: ${({ bold = false }: TextProps) => (bold ? 'bold' : 'normal')};
`;

export const HyperLink = styled.a`
  font-size: ${({ size = 12 }: TextProps) => `${size}px`};
  color: ${({ color = '#333' }: TextProps) => color};
  font-weight: ${({ bold = false }: TextProps) => (bold ? 'bold' : 'normal')};
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
  }
`;
