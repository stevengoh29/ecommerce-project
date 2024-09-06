import React, { HTMLAttributes } from "react";
import classNames from "classnames";
import { Url } from "url";

type ButtonVariant = "primary" | "danger" | "warning" | "outlined"

type Props = React.ComponentProps<"button"> & {
    className?: any;
    label: string;
    disabled?: boolean;
    variant?: ButtonVariant
    buttontype?: any;
    href?: Url;
};

const Button = (props: Props) => {
    const baseStyles = "text-sm font-semibold uppercase rounded px-5 py-2 duration-300";

    const variants = {
        primary: "text-white bg-blue-500 hover:shadow-blue-400 hover:shadow-md active:bg-blue-700",
        danger: "text-white bg-red-500 hover:shadow-red-400 hover:shadow-md active:bg-red-700",
        warning: "text-white bg-yellow-500 hover:shadow-yellow-400 hover:shadow-md active:bg-yellow-700",
        outlined: "text-text-primary text-center border border-blue-300 hover:bg-blue-500 active:bg-blue-700"
    };

    const outlinedStyles = "px-5 py-2 rounded text-sm uppercase font-semibold outline-none focus:outline-none ease-linear transition-all duration-150 hover:text-white";

    const { label, variant = 'primary', className, disabled, buttontype, href, ...rest } = props;

    const selectedVariant = variants[variant as ButtonVariant]
    
    const combinedClassName = classNames(
        variant === "outlined" ? `${outlinedStyles} ${selectedVariant}` : `${baseStyles} ${selectedVariant}`,
        disabled ? "opacity-40" : "",
        disabled && variant === "outlined"
            ? "hover:bg-white hover:text-black active:bg-white"
            : "",
        className
    );

    return (
        <button
            {...rest}
            type={buttontype || "button"}
            className={combinedClassName}
        >
            {label}
        </button>
    );
}

export default Button;