import PropTypes from "prop-types";
import { BiSearchAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const SearchField = ({ closeFunction }) => {
  const {
    setSearchValue,
    searchKeywords: suggestions,
  } = useContext(GlobalContext);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchValue(keyword);
    if (keyword) {
      navigate(`/store?search=${keyword}`);
      closeFunction();
    }
  };

  const handleSuggetionClick = (suggestion) => {
    setSearchValue(suggestion);
    navigate(`/store?search=${suggestion}`);
    closeFunction();
  };

  useEffect(() => setKeyword(""), []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed z-50 top-0 left-0 h-screen w-full bg-gradient-to-b from-black/30 to-black/15"
      >
        <IoCloseOutline
          className="absolute cursor-pointer top-3 right-3 text-neutral-300 size-12 sm:size-14 p-1 animate-fromRight"
          onClick={closeFunction}
        />
      </motion.div>

      <form
        onSubmit={handleSubmit}
        className="absolute z-50 top-[20%] left-[50%] -translate-x-[50%] border-b-2 border-neutral-200 w-3/4 lg:max-w-[400px] animate-opacity"
      >
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="unset font-body text-2xl sm:text-3xl px-3 pb-2 sm:pb-3 text-neutral-200 w-4/5 sm:w-5/6 animate-fromTop"
          placeholder="Search here..."
          autoFocus
        />
        <button
          type="submit"
          className="absolute top-0 right-1 rounded-full p-1 animate-fromTop"
        >
          <BiSearchAlt className="text-neutral-200 size-7 sm:size-8" />
        </button>
        {/* Recomendations */}
        <div className="absolute top-14 sm:top-16 -right-4 flex gap-1 flex-col w-full font-heading text-xl sm:text-2xl text-neutral-300 font-semibold">
          {keyword &&
            suggestions
              .filter((suggestion) =>
                suggestion.toLowerCase().includes(keyword.toLowerCase())
              )
              .map((suggestion, i) => {
                const regex = new RegExp(`(${keyword})`, "gi");
                const parts = suggestion.split(regex);

                return (
                  <motion.div
                    key={`${keyword}-${i}`}
                    onClick={() => handleSuggetionClick(suggestion)}
                    animate={{ y: [-5, 0], opacity: [0, 1] }}
                    transition={{
                      duration: 0.08,
                      ease: "easeInOut",
                      delay: 0.03 * i,
                    }}
                    className="cursor-pointer hover:text-white tracking-wide"
                  >
                    {parts.map((part, i) =>
                      part.toLowerCase() === keyword.toLowerCase() ? (
                        <span key={i} className="font-bold text-white">
                          {part}
                        </span>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </motion.div>
                );
              })}
        </div>
      </form>
    </>
  );
};

SearchField.propTypes = {
  closeFunction: PropTypes.func.isRequired,
};

export default SearchField;
