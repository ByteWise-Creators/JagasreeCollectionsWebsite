import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PropTypes from "prop-types";

const FadeInOnScroll = ({ animeteKey, delay, y = 30, children, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.4, once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      key={animeteKey}
      initial={{ opacity: 0.1, y: -y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.1, y: y }}
      transition={{ duration: 0.5, delay: delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

FadeInOnScroll.propTypes = {
  animeteKey: PropTypes.any,
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  y: PropTypes.number,
};

export default FadeInOnScroll;
