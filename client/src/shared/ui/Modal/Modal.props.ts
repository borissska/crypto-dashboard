import { HTMLAttributes } from "react";

export interface IModalProps extends HTMLAttributes<HTMLDivElement> {
    navTo: () => void;
}