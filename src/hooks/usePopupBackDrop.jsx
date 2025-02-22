import PropTypes from "prop-types";
import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";

import BackDrop from "../components/BackDrop.jsx";

const usePopupBackDrop = (showCloseBtn, closeWithBackDrop) => {
  const [isPopupOpen, setPopupIsOpen] = useState(false);

  const openPopup = useCallback(() => {
    setPopupIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closePopup = useCallback(() => {
    setPopupIsOpen(false);
    document.body.style.overflow =
      document.body.style.overflow === "hidden" ? "auto" : "";
  }, []);

  const BackDropWrapper = ({ children }) => (
    <AnimatePresence>
      {isPopupOpen && (
        <BackDrop
          showCloseBtn={showCloseBtn}
          closeWithBackDrop={closeWithBackDrop}
          closePopup={closePopup}
        >
          {children}
        </BackDrop>
      )}
    </AnimatePresence>
  );

  BackDropWrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return { BackDrop: BackDropWrapper, openPopup, closePopup };
};

export default usePopupBackDrop;
