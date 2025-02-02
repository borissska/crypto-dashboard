import React from "react";
import styles from "./CustomButton.module.scss";
import { ICustomButton } from "./CustomButton.props";
import cn from "classnames";

const CustomButton: React.FC<ICustomButton> = ({ buttonSize='m', children, ...props }) => {

  return <button className={cn(styles.button_style, styles[buttonSize])} {...props}>
    {children}
  </button>;
};

export default CustomButton;
