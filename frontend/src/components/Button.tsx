import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "secondary",
}): React.JSX.Element => {
  const buttonClass =
    variant === "primary" ? "download-summary" : "sidebar-button";
  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
