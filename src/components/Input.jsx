// src/components/Input.js
import PropTypes from "prop-types";

const Input = ({ type, placeholder, value, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      {...props}
      className="w-full text-text font-body px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none focus:border focus:placeholder:text-yellow-400 focus:border-yellow-400"
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default Input;
