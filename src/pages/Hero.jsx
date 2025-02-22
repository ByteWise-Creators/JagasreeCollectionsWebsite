import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

import { GlobalContext } from "../context/GlobalContext";

import FAQs from "../components/FAQs";
import Carousel from "../components/Carousel";
import RecomendationSection from "../components/RecomendationSection.jsx";
import FadeInOnScroll from "../animation/FadeInOnScroll.jsx";
import CollectionImg from "../components/CollectionImg.jsx";

import { faqs } from "../contents/faqs.js";
import { collectionImgArr } from "../assets";
import { mobileImg, deskTopImg, tabImg } from "../assets";

const Hero = () => {
  const { products } = useContext(GlobalContext);
  const [currInnerWidth, setCurrInnerWidth] = useState(innerWidth);

  const { hash } = useLocation();

  const breakPoints = [481, 801];

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

  const filterProducts = useCallback(
    (type) => products.filter((product) => product.type === type),
    [products]
  );

  const ethinics = useMemo(() => filterProducts("Ethnic"), [filterProducts]);
  const fashion = useMemo(() => filterProducts("Fashion"), [filterProducts]);

  useEffect(() => {
    const handleResize = () => setCurrInnerWidth(innerWidth);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* Home - hero */}
      <section id="home" className="">
        <Carousel
          images={
            currInnerWidth < breakPoints[0]
              ? mobileImg
              : currInnerWidth < breakPoints[1]
              ? tabImg
              : deskTopImg
          }
          heightOfImg="h-[85vh] sm:h-screen"
          options={{
            buttonColor: "",
            buttonArrowColor: "#fefefe",
            buttonSize: 24,
          }}
        />
      </section>

      {/* explorer */}
      <section className="py-10">
        <FadeInOnScroll className="text-2xl sm:text-3xl font-bold font-heading text-center mb-3 uppercase">
          Explore our categories
        </FadeInOnScroll>
        <ul className="flex flex-col md:flex-row justify-evenly items-center gap-5 mt-8">
          {collectionImgArr.map(([image, title, to], i) => (
            <CollectionImg key={i} image={image} title={title} to={to} i={i} />
          ))}
        </ul>
      </section>

      {/* Random Products */}
      <section
        id="recommended"
        className="py-10 bg-gradient-to-b from-orange-50/50 to-orange-50/5 max-w-[1440px] mx-auto"
      >
        <FadeInOnScroll className="text-2xl sm:text-3xl font-bold font-heading text-center mb-3 uppercase">
          Recomended for you
        </FadeInOnScroll>
        {ethinics.length > 0 && (
          <RecomendationSection
            title="Ethinics"
            innerWidth={currInnerWidth}
            products={ethinics}
          />
        )}
        <hr className="mx-4" />
        {fashion.length > 0 && (
          <RecomendationSection
            title="Fashon"
            innerWidth={currInnerWidth}
            products={fashion}
          />
        )}
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-10">
        <FadeInOnScroll className="text-2xl sm:text-3xl font-bold font-heading text-center mb-3 uppercase">
          Frequently Asked Questions
        </FadeInOnScroll>
        <FAQs faqs={faqs[0].items} title={faqs[0].category} />
        <FAQs faqs={faqs[1].items} title={faqs[1].category} />
        <FAQs faqs={faqs[2].items} title={faqs[2].category} />
        <FAQs faqs={faqs[3].items} title={faqs[3].category} />
        <FAQs faqs={faqs[4].items} title={faqs[4].category} />
        <FAQs faqs={faqs[5].items} title={faqs[5].category} />
        <FAQs faqs={faqs[6].items} title={faqs[6].category} />
      </section>
    </main>
  );
};

const MemoizedHero = memo(Hero);
export default MemoizedHero;
