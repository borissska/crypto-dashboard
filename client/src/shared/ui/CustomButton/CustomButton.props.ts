import { ButtonHTMLAttributes } from "react";


export interface ICustomButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonSize?: 's' | 'm' | 'l' | 'xl';
}