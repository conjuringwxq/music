import styled from 'styled-components';

interface AvatarProps {
  size: number;
  shape: 'square' | 'circle';
}

export const Avatar = styled.img`
  border-radius: ${({ shape = 'circle' }: AvatarProps) =>
    shape === 'circle' ? '50%' : '6px'};
  width: ${({ size = 40 }: AvatarProps) => `${size}px`};
  height: ${({ size = 40 }: AvatarProps) => `${size}px`};
`;
