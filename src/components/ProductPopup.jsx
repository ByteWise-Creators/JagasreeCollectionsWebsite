import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";

import Carousel from "./Carousel";
import Button from "./Button";
import DropDown from "./DropDown";

import { IoIosClose } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { HiMiniMinusSmall, HiMiniPlusSmall } from "react-icons/hi2";

import { useOutletContext } from "react-router-dom";

const ProductPopup = ({ product, closePopup = () => {} }) => {
  const { openAuth } = useOutletContext();

  const [count, setCount] = useState(1);

  const {
    imgs,
    name,
    description,
    type,
    category,
    code,
    bulletPoints,
    size: sizes,
  } = product;

  const sizeArr = sizes.split(",");
  const [size, setSize] = useState(sizeArr[0]);

  const descriptionArr = description.split(",");

  const toObject = (bulletPoints) => {
    return Object.fromEntries(
      bulletPoints
        .split(",")
        .map((entry) => entry.split(":").map((item) => item.trim()))
    );
  };

  const whatsAppEnquery = useCallback(() => {
    const user = localStorage.getItem("_userAuthToken");
    if (user) {
      const whatsAppNo = "9585506071";
      const url = `https://wa.me/${whatsAppNo}?text=${encodeURIComponent(
        `Product Image: ${imgs[0]}\nProduct Name: ${name}\nProduct Code: ${code}\nCategory: ${category}\nType: ${type}\nCount: ${count}`
      )}`;
      window.open(url, "_blank");
    } else openAuth();
  }, [category, code, count, imgs, name, openAuth, type]);

  return (
    <motion.div
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 25, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="p-3 md:p-0 flex flex-col md:flex-row mx-auto rounded relative max-h-[78vh] w-full md:w-[800px] md:md:h-[480px] overflow-x-auto bg-white scrollbar-none cursor-auto"
    >
      <button
        onClick={closePopup}
        className="absolute right-0 z-10 top-0 bg-black"
      >
        <IoIosClose className="text-white size-8" />
      </button>
      <div className="basis-1/2">
        <Carousel
          images={imgs}
          heightOfImg="h-[380px] md:h-[480px]"
          options={{
            buttonColor: "",
            buttonSize: 16,
            buttonArrowColor: "#00000050",
          }}
        />
      </div>

      {/* Content */}
      <div className="md:px-5 flex flex-col gap-3 mt-1 basis-1/2 md:overflow-y-auto scrollbar-none py-2">
        <motion.h2
          initial={{ y: -10, opacity: 0.1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-2xl md:text-[27px] justify-self-start pt-2 md:pt-0 leading-5 font-semibold font-heading text-text"
        >
          {name}
        </motion.h2>
        
        <ListOfContent title="Description" list={descriptionArr} />
        <Table
          title="Product Detial"
          obj={{
            "Cloth Type": type,
            "Collection type": category,
            "Manufactured in": "India",
            ...toObject(bulletPoints),
          }}
        />
        <div className="flex gap-5">
          <Counter count={count} setCount={setCount} />
          <DropDown
            defaultValue={size}
            dropdownValues={sizeArr}
            handleDropdownvalueChange={setSize}
            // w="w-1/4"
          />
        </div>
        <div className="space-y-1.5 mb-16 md:pb-2">
          <h4 className="text-sm font-body text-gray-500 tracking-tight">
            Have any query on this product or place order?
          </h4>
          <Button
            onClick={() => whatsAppEnquery(product)}
            variant="success"
            full
            size="lg"
          >
            <FaWhatsapp className="size-5" />
            <span className="text-lg font-body font-bold">Enquire now</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

ProductPopup.propTypes = {
  product: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default ProductPopup;

/* ============================================================================================================ */

const ListOfContent = ({ title, list = [] }) => (
  <div className="text-sm font-body text-gray-700">
    <h3 className="text-base text-gray-900 font-semibold">{title} :</h3>
    <ol className="space-y-1.5">
      {list.map(
        (item, i) =>
          item.trim() !== "" && (
            <motion.li
              key={i}
              initial={{ y: -5, opacity: 0.1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: (i + 1) * 0.15 }}
              className="leading-[18px]"
            >
              {i + 1} {")"} {item}.
            </motion.li>
          )
      )}
    </ol>
  </div>
);

ListOfContent.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
};

/* ============================================================================================================ */

const Table = ({ title, obj }) => (
  <table className="font-body text-sm text-gray-600 text-left grid">
    <thead>
      <tr>
        <th colSpan="2" className="text-base text-gray-900 font-semibold">
          {title} :
        </th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(obj).map(([key, value], i) => (
        <motion.tr
          key={key}
          initial={{ y: -5, opacity: 0.1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, delay: (i + 1) * 0.15 }}
        >
          <td className="font-semibold pr-5">{key}:</td>
          <td>{value}</td>
        </motion.tr>
      ))}
    </tbody>
  </table>
);

Table.propTypes = {
  title: PropTypes.string.isRequired,
  obj: PropTypes.object.isRequired,
};

/* ============================================================================================================ */

const Counter = ({ count, setCount }) => (
  <div className="border-2 px-1 py-0.5 rounded-full border-gray-500 max-w-fit flex items-center gap-1 *:text-gray-500">
    <HiMiniMinusSmall
      onClick={() => setCount((pv) => (pv > 1 ? pv - 1 : pv))}
      className="size-7 cursor-pointer"
    />
    <span className="font-bold font-heading text-xl">{count}</span>
    <HiMiniPlusSmall
      onClick={() => setCount((pv) => pv + 1)}
      className="size-7 cursor-pointer"
    />
  </div>
);

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
};
