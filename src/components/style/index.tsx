import { Divider, Button } from "antd";
import styled from "styled-components";

interface TextProps {
  color?: string;
  size?: number;
  bold?: boolean;
}

type Size = {
  width: string;
  height: string;
};

interface ImageProps {
  size?: number | Size;
  shape?: "square" | "circle";
  fit?: "cover" | "contain";
  border?: boolean;
}
interface ItalicDividerProps {
  color?: string;
}

interface RaiseButtonProps {
  radius?: string;
  fontSize?: number;
  width?: "auto" | number;
}

interface PreProps {
  align?: string;
}

interface CdMaskProps {
  position?: number;
}

export const Text = styled.span`
  font-size: ${({ size = 12 }: TextProps) => `${size}px`};
  color: ${({ color = "#333" }: TextProps) => color};
  font-weight: ${({ bold = false }: TextProps) => (bold ? "bold" : "normal")};
`;

export const Image = styled.img`
  border-radius: ${({ shape = "circle" }: ImageProps) => (shape === "circle" ? "50%" : "6px")};
  width: ${({ size = 40 }: ImageProps) => (typeof size === "number" ? `${size}px` : size.width)};
  height: ${({ size = 40 }: ImageProps) => (typeof size === "number" ? `${size}px` : size.height)};
  object-fit: ${({ fit = "cover" }: ImageProps) => fit};
  border: ${({ border = true }: ImageProps) => (border ? "1px solid #ddd" : "none")};
`;

export const ItalicDivider = styled(Divider)`
  transform: rotate(30deg);
  border-left: 1px solid ${({ color = "#a9a9a9" }: ItalicDividerProps) => color};
`;

export const RaiseButton = styled(Button)`
  border-radius: ${({ radius = "20px" }: RaiseButtonProps) => radius};
  font-size: ${({ fontSize = 14 }: RaiseButtonProps) => `${fontSize}px`};
  width: ${({ width = "auto" }: RaiseButtonProps) => (width === "auto" ? width : `${width}px`)};
`;

export const Pre = styled.pre`
  text-align: ${({ align = "center" }: PreProps) => align};
  white-space: pre-wrap;
`;

export const Code = styled.code`
  font-size: ${({ size = 12 }: TextProps) => `${size}px`};
  color: ${({ color = "#333" }: TextProps) => color};
  font-weight: ${({ bold = false }: TextProps) => (bold ? "bold" : "normal")};
`;

export const HyperLink = styled.a`
  font-size: ${({ size = 12 }: TextProps) => `${size}px`};
  color: ${({ color = "#333" }: TextProps) => color};
  font-weight: ${({ bold = false }: TextProps) => (bold ? "bold" : "normal")};
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
  }
`;

export const CdMask = styled.div`
  background-image: url(${require("@/assets/cd.png")});
  background-position-y: center;
  background-repeat: no-repeat;
  background-position: ${({ position = 150 }: CdMaskProps) => `${position}px`};
`;
