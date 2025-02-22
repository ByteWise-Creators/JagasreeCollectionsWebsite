import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const TypingEffect = ({ text, speed = 100, pauseTime = 1000, className }) => {
  const [displayedText, setDisplayedText] = useState(text.charAt(0));
  const [index, setIndex] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isDeleting && index < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);
    } else if (isDeleting && index > 1) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, prev.length - 1));
        setIndex((prevIndex) => prevIndex - 1);
      }, speed);
    } else if (index === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (index === 1 && isDeleting) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex(1);
      }, pauseTime);
    }

    return () => clearTimeout(timeout);
  }, [index, text, speed, isDeleting, pauseTime]);

  return (
    <motion.div
      className={`inline h-6 relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
      <motion.span
        className="bg-black h-10 w-1 ml-4 absolute -right-2.5 top-3 md:top-[21px]"
        animate={{ opacity: [0, 1] }}
        transition={{ repeat: Infinity, duration: 0.5 }}
      />
    </motion.div>
  );
};

TypingEffect.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  speed: PropTypes.number,
  pauseTime: PropTypes.number,
};

export default TypingEffect;
