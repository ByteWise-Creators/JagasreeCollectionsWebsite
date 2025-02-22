import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({
  className,
  variant = "primary",
  size = "md",
  children = "Button",
  full = false,
  ...props
}) => {
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    warning: " bg-yellow-500 text-white hover:bg-yellow-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    light: "bg-white text-gray-800 hover:bg-gray-200",
    dark: "bg-gray-800 text-white hover:bg-gray-900",
    neutral: "bg-gray-500 text-white hover:bg-gray-600",
  };

  const sizeStyles = {
    sm: "py-1 px-3 text-sm",
    md: "py-1 px-4 text-base",
    lg: "py-1.5 px-6 text-lg",
  };

  return (
    <button
      type="button"
      className={classNames(
        `font-heading inline-flex items-center justify-center gap-x-1 font-medium rounded-lg border border-transparent transition-all active:scale-[0.97] duration-150 disabled:opacity-50 disabled:pointer-events-none`,
        variantStyles[variant],
        sizeStyles[size],
        full && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    "primary",
    "warning",
    "success",
    "danger",
    "light",
    "dark",
    "neutral",
    "",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  children: PropTypes.node,
  full: PropTypes.bool,
};
