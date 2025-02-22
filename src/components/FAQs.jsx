import { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

import FadeInOnScroll from "../animation/FadeInOnScroll";

import { IoChevronDown } from "react-icons/io5";

const FAQs = ({ faqs = [], title = "FAQs" }) => {
  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => setActiveId((pv) => (id === pv ? null : id));

  return (
    <FadeInOnScroll className="max-w-4xl mx-auto p-4 space-y-px sm:space-y-2">
      <h2 className="text-xl text-neutral-400 font-body font-semibold text-center py-2">
        {title}
      </h2>
      {faqs.map(({ id, question, answer }) => (
        <div key={id} className="border-b border-gray-200 px-2">
          <button
            onClick={() => toggleFAQ(id)}
            className="w-full text-left flex justify-between items-center py-3 focus:outline-none"
          >
            <span className="text-lg sm:text-xl font-heading font-medium leading-5 pr-1">
              {question}
            </span>
            <IoChevronDown
              className={classNames(
                "transition-all duration-300 transform",
                activeId === id && "rotate-180"
              )}
            />
          </button>

          <AnimatePresence>
            {activeId === id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-text/90 font-body text-sm sm:text-base pb-2">
                  {answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </FadeInOnScroll>
  );
};

FAQs.propTypes = {
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string,
};

export default FAQs;
