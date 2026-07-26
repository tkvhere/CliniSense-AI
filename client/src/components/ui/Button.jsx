import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",

  secondary:
    "border border-blue-600 text-blue-600 hover:bg-blue-50",

  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-100",

  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3 text-lg",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.04 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      transition={{ duration: 0.2 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        font-semibold
        transition-all
        duration-300
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default Button;