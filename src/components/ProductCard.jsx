import PropTypes from "prop-types";
import { motion } from "framer-motion";

import Carousel from "./Carousel";
import ProductPopup from "./ProductPopup";

import usePopupBackDrop from "../hooks/usePopupBackDrop";
import classNames from "classnames";

const ProductCard = ({ product, cardWidth, heightOfImg }) => {
  const { BackDrop, openPopup, closePopup } = usePopupBackDrop(false, true);
  const { name, description, imgs } = product;

  return (
    <>
      <motion.div
        initial={{ opacity: 0.15 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={openPopup}
        className={classNames(`flex flex-col snap-start cursor-pointer ${cardWidth}`)}
      >
        <div className="">
          <Carousel
            images={imgs}
            heightOfImg={heightOfImg}
            scroleWithoutButton
            options={{
              buttonColor: "",
              buttonSize: 16,
              buttonArrowColor: "#00000050",
            }}
          />
        </div>
        <div className="px-2">
          <h3 className="font-heading text-xl font-bold text-text">
            {name.length > 20 ? name.substring(0, 20) + " ..." : name}
          </h3>
          <p className="font-body font-medium text-gray-600 leading-[18px] h-14 overflow-y-hidden text-sm">
            {description.length > 85
              ? description.substring(0, 85) + " ..."
              : description}
          </p>
          <p className="text-sm font-semibold text-text font-madeInIndia">
            Made in India
          </p>
        </div>
      </motion.div>

      <BackDrop>
        <ProductPopup closePopup={closePopup} product={product} />
      </BackDrop>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  cardWidth: PropTypes.string,
  heightOfImg: PropTypes.string.isRequired,
};

export default ProductCard;
