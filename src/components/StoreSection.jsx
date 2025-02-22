import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import FadeInOnScroll from "../animation/FadeInOnScroll";
import ProductCard from "./ProductCard";
import classNames from "classnames";

import noResult from "../assets/others/no-result-found.png";

const StoreSection = ({ products = [], title, path, id }) => {
  const [filteredProduct, setFilteredProduct] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const filterProducts = useCallback(
    (type) => {
      if (type === "all") return products;
      return products.filter((product) => product.type === type);
    },
    [products]
  );

  useEffect(() => {
    const newFilteredProducts = filterProducts(filteredProduct);
    setFilteredProducts(newFilteredProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProduct, products]);

  const activeClass = useCallback(
    (filter) =>
      classNames(
        `relative before-underline ${
          filteredProduct === filter ? "before:w-full" : "before:w-0"
        }`
      ),
    [filteredProduct]
  );

  return (
    <section id={id} className="max-w-[1440px] mx-auto">
      <FadeInOnScroll className="text-3xl sm:text-4xl font-bold font-heading text-center pt-5 uppercase">
        {title}
      </FadeInOnScroll>
      <FadeInOnScroll className="text-sm font-semibold font-body text-center text-gray-500">
        Home &gt; Store &gt; {path}
      </FadeInOnScroll>

      <FadeInOnScroll className="flex items-center justify-center pt-8 gap-8 text-lg sm:text-2xl text-gray-500 font-heading font-semibold *:cursor-pointer">
        <span
          onClick={() => setFilteredProduct("all")}
          className={activeClass("all")}
        >
          All-Catogries
        </span>
        <span
          onClick={() => setFilteredProduct("Ethnic")}
          className={activeClass("Ethnic")}
        >
          Ethnic
        </span>
        <span
          onClick={() => setFilteredProduct("Fashion")}
          className={activeClass("Fashion")}
        >
          Fashion
        </span>
      </FadeInOnScroll>

      {/* prodcts */}
      {filteredProducts.length > 0 ? (
        <section className="grid gap-2 md:gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-1 lg:px-5 py-10">
          {filteredProducts.map((product, i) => (
            <FadeInOnScroll y={45} key={i} animeteKey={filteredProduct}>
              <ProductCard
                heightOfImg="h-[280px] md:h-[320px]"
                product={product}
              />
            </FadeInOnScroll>
          ))}
        </section>
      ) : (
        <FadeInOnScroll className="w-full flex flex-col justify-center items-center py-16">
          <img
            src={noResult}
            className="object-cover h-28 md:h-36"
            alt="Not found"
          />
          <FadeInOnScroll className="text-lg font-semibold font-body text-center text-gray-500 pb-16">
            No Items found
          </FadeInOnScroll>
        </FadeInOnScroll>
      )}
    </section>
  );
};

StoreSection.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default StoreSection;
