import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

export interface IPProps extends HTMLAttributes<HTMLParagraphElement> {
  pSize?: 's' | 'm' | 'l';
  children?: ReactNode | string;
}