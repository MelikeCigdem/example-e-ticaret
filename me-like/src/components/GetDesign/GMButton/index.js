import { useState } from "react";
import "@/assests/styles/colors.scss"
import "@/assests/styles/mixin.scss"

const GMButton = ({
  children,
  disabled,
  size,
  border,
  color,
  variant,
  fullWidht,
  style,
  gap,
  fs,
  p,
  fw,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // size props
  // md ,sm

  // variant props
  // outline ,text

  // fullWidht

  // border props for border radius
  let dynamicBorder;
  switch (border) {
    case "none":
      dynamicBorder = null;
      break;
    case "md":
      dynamicBorder = "16px";
      break;
    case "pill":
      dynamicBorder = "50rem";
      break;
    case "rounded":
      dynamicBorder = "50%";
      break;
    default:
      dynamicBorder = "8px";
  }

  // color props
  const dynamicColor =
    color === "primary"
      ? "var(--primary)"
      : color === "secondary"
      ? "var(--secondary)"
      : "var(--primary)";

  const dynamicColorWithOpacity = `${dynamicColor.slice(0, -1)}-text-btn)`;

  const customStyle = {
    display: "flex",
    fontFamily: "var(--bs-body-font-family)",
    color:
      variant === "outline" || variant === "text"
        ? disabled
          ? "var(--disabled-btn)"
          : `${dynamicColor ? dynamicColor : "#f65002"}`
        : "#fff",
    backgroundColor:
      variant === "outline"
        ? "transparent"
        : variant === "text" && isHovered
        ? dynamicColorWithOpacity
        : variant === "text"
        ? "transparent"
        : dynamicColor,

    alignItems: "center",
    justifyContent: "center",
    gap: gap ? gap : "5px",
    transform: `scale(${size === "sm" ? "0.7" : size === "md" ? "0.8" : "1"} )`,
    padding: p
      ? typeof p === "object"
        ? `${p.py}px ${p.px}px`
        : p
      : "10px 14px",
    borderRadius: dynamicBorder,
    fontSize: fs ? fs : "16px",
    width: fullWidht && "100%",
    transition: "0.2s",
    opacity: disabled ? "0.5" : `${isHovered ? "0.9" : "1"}`,
    fontWeight: fw ? fw : "bold",
    border:
      variant === "outline"
        ? disabled
          ? "2px solid var(--disabled-btn)"
          : `2px solid ${dynamicColor ? dynamicColor : "#f65002"}`
        : "none",
  };

  const allStyles = {
    ...customStyle,
    ...style,
  };
  return (
    <button

      disabled={disabled}
      style={{
        ...allStyles,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export default GMButton;
