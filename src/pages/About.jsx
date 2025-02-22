import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import ReactMarkdown from "react-markdown";
import FadeInOnScroll from "../animation/FadeInOnScroll";

import { deskTopImg } from "../assets";
import "../css/Markdown.css";

const About = () => {
  const { markdowns } = useContext(GlobalContext);
  const { hash } = useLocation();

  const { about } = markdowns;

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

  return (
    <section
      id="about"
      className="overflow-x-hidden pt-[75px] sm:pt-20  min-h-screen"
    >
      <div className="container mx-auto px-4">
        <img
          src={deskTopImg[0]}
          alt="About image"
          className="h-auto object-cover w-full"
        />

        <section
          id="privacypolicy"
          className="max-w-3xl mx-auto p-4 space-y-px sm:space-y-2"
        >
          <FadeInOnScroll className="text-xl sm:text-3xl font-bold font-heading text-center mb-3 uppercase">
            About Jagashree Collections
          </FadeInOnScroll>
          <div className="text-sm sm:text-base font-body text-text space-y-2 py-5 markdown">
            <ReactMarkdown>{about}</ReactMarkdown>
          </div>
        </section>
      </div>
    </section>
  );
};

export default About;
