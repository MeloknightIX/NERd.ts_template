import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import getColor from "../../utils/getColor";

type Props = {
  children: ReactNode;
  onClick?: MouseEventHandler;
  icon?: boolean;
  tooltip: string;
  style?: CSSProperties;
  disabled?: boolean;
};

const Button = ({
  children,
  onClick,
  icon,
  tooltip,
  style,
  disabled,
}: Props) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "inherit",
        border: icon ? "none" : `1px solid ${getColor("text")}`,
        padding: icon ? "0" : "0 0.5em",
        color: "inherit",
        fontSize: icon ? "2em" : "inherit",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        ...style,
      }}
      title={tooltip}
      disabled={disabled}
      className={icon ? "material-symbols-outlined" : ""}
    >
      {children}
    </button>
  );
};
export default Button;
