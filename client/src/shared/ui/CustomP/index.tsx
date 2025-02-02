import React from "react";
import styles from "./CustomP.module.scss";
import { IPProps } from "./CustomP.props";
import cn from "classnames";

const CustomP: React.FC<IPProps> = ({ pSize = "m", children }) => {
  return (
    <p className={cn(styles.p_style, styles[pSize])}>
      {children}
    </p>
  );
};

export default CustomP;
