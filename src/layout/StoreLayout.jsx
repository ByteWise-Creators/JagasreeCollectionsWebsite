import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../context/GlobalContext";

import ResponsiveImage from "../components/ResponsiveImage";
import FadeInOnScroll from "../animation/FadeInOnScroll";
import ProductCard from "../components/ProductCard";

import { mensBannerDt, womensBannerDt, kidsBannerDt } from "../assets";
import { mensBannerTab, womensBannerTab, kidsBannerTab } from "../assets";
import {
  mensBannerMobile,
  womensBannerMobile,
  kidsBannerMobile,
} from "../assets";

const StoreLayout = () => {
  const { openAuth } = useOutletContext();
  const { searchValue, products } = useContext(GlobalContext);

  const { search, pathname, hash } = useLocation();
  const navigate = useNavigate();
  const [searchResultProducts, setSearchResultProducts] = useState([]);

  const coverImage = {
    "/store/all-products": [
      womensBannerDt,
      womensBannerTab,
      womensBannerMobile,
    ],
    "/store": [womensBannerDt, womensBannerTab, womensBannerMobile],
    "/store/men": [mensBannerDt, mensBannerTab, mensBannerMobile],
    "/store/women": [womensBannerDt, womensBannerTab, womensBannerMobile],
    "/store/kid": [kidsBannerDt, kidsBannerTab, kidsBannerMobile],
  };

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(
          null,
          "",
          location.pathname + location.search
        );
      }
    }
  }, [hash]);

  useEffect(() => {
    if (pathname === "/store" && search.length < 9 && searchValue === "")
      navigate("/");
  }, [navigate, pathname, search.length, searchValue]);

  useEffect(() => {
    const searchedProducts = products.filter((product) => {
      const keywords = product.keywords.toLowerCase();
      const normalizedSearchValue = searchValue.toLowerCase().trim();
      return keywords.includes(normalizedSearchValue);
    });
    if (searchValue) setSearchResultProducts(searchedProducts);
  }, [searchValue, products]);

  return (
    <section>
      <ResponsiveImage
        mobileImg={coverImage[pathname][2]}
        tabImg={coverImage[pathname][1]}
        desktopImg={coverImage[pathname][0]}
      />
      {pathname === "/store" && searchResultProducts && (
        <section className="min-h-[300px]">
          {/* Heading */}
          <FadeInOnScroll className="text-3xl sm:text-4xl font-semibold  text-text font-heading text-center pt-5">
            Search result of {searchValue} are:
          </FadeInOnScroll>

          <section className="grid gap-2 md:gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-1 lg:px-5 py-10">
            {searchResultProducts.map((product, i) => (
              <FadeInOnScroll y={45} key={i}>
                <ProductCard
                  heightOfImg="h-[280px] md:h-[320px]"
                  product={product}
                />
              </FadeInOnScroll>
            ))}
          </section>
        </section>
      )}
      {/* Other pages of store */}
      <Outlet context={{ openAuth }} />
    </section>
  );
};

export default StoreLayout;
