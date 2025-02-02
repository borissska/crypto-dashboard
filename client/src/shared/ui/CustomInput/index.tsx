import React, { FC } from "react";
import cn from 'classnames';
import styles from "./CustomInput.module.scss";
import { IInputProps } from "./CustomInput.props";

const CustomInput: FC<IInputProps> = ({ inputSize='m', isFull_Width='', ...props }): JSX.Element => {
  return (
    <input
      className={cn(styles.input_style, styles[inputSize], styles[isFull_Width])}
      {...props}
    />
  );
};

export default CustomInput;
