import PropTypes from "prop-types";
import classNames from "classnames";
import { motion } from "framer-motion";

import { IoCloseOutline } from "react-icons/io5";

const BackDrop = ({
  showCloseBtn,
  closeWithBackDrop,
  children,
  closePopup = () => {},
}) => (
  <motion.div
    className={classNames(
      "popup fixed z-[99] top-0 left-0 h-full w-full bg-black/70 flex justify-center items-center",
      closeWithBackDrop && "cursor-pointer"
    )}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={closeWithBackDrop ? closePopup : null}
  >
    <div className="px-3" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>

    <motion.div
      initial={{ x: 100, opacity: 0.3 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0.3 }}
      onClick={closePopup}
      className={classNames(
        "absolute top-6 right-6 md:top-1/2 md:right-[20%] z-[100] rounded-full theam-grad-1 p-1 cursor-pointer",
        showCloseBtn ? "" : "hidden"
      )}
    >
      <IoCloseOutline className="size-10 sm:size-12 text-white" />
    </motion.div>
  </motion.div>
);

BackDrop.propTypes = {
  children: PropTypes.node,
  closePopup: PropTypes.func,
  showCloseBtn: PropTypes.bool,
  closeWithBackDrop: PropTypes.bool,
};

export default BackDrop;
