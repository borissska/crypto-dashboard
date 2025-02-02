import { InputHTMLAttributes, RefObject } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: RefObject<HTMLInputElement>;
  inputSize?: 's' | 'm' | 'l';
  isFull_Width?: 'full_width';
}