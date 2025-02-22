import { useCallback, useRef } from "react";
import PropTypes from "prop-types";

import ProductCard from "../components/ProductCard";

import FadeInOnScroll from "../animation/FadeInOnScroll";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const RecomendationSection = ({ title, innerWidth, products = [] }) => {
  const containerRef = useRef(null);

  const scrollBy = useCallback((ref, direction, scrollLenght) => {
    if (ref)
      ref.scrollBy({
        left: direction === "left" ? -scrollLenght : scrollLenght,
        behavior: "smooth",
      });
  }, []);

  return (
    <FadeInOnScroll className="py-2 relative px-2 sm:px-10 group">
      {title && (
        <h2 className="text-xl sm:text-2xl font-semibold font-heading text-text uppercase pb-3">
          {title}
        </h2>
      )}
      <div
        ref={containerRef}
        className="flex gap-3 snap-x snap-mandatory overflow-x-scroll scrollbar-none"
      >
        {products.map((product, i) => (
          <ProductCard
            key={i}
            product={product}
            cardWidth="min-w-[165px] sm:min-w-[250px] sm:max-w-[250px]"
            heightOfImg="h-[280px] sm:h-[300px]"
          />
        ))}
      </div>
      <button
        className="absolute top-[45%] left-1 bg-primary-50 hover:bg-purple-200 px-px py-2 rounded opacity-25 group-hover:opacity-80"
        onClick={() =>
          scrollBy(containerRef.current, "left", innerWidth > 650 ? 650 : 300)
        }
      >
        <FaAngleLeft className="size-5" />
      </button>
      <button
        className="absolute top-[45%] right-1 bg-primary-50 hover:bg-purple-200 px-px py-2 rounded opacity-25 group-hover:opacity-80"
        onClick={() =>
          scrollBy(containerRef.current, "right", innerWidth > 650 ? 650 : 300)
        }
      >
        <FaAngleRight className="size-5" />
      </button>
    </FadeInOnScroll>
  );
};

RecomendationSection.propTypes = {
  title: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  innerWidth: PropTypes.number.isRequired,
};

export default RecomendationSection;
