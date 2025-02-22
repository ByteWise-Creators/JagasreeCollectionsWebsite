import { useContext, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";

import { GlobalContext } from "../context/GlobalContext";
import FadeInOnScroll from "../animation/FadeInOnScroll";

import "../css/Markdown.css";

const PrivacyPolicy = () => {
  const { markdowns } = useContext(GlobalContext);
  const { hash } = useLocation();

  const { privacyPolicy } = markdowns;

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView();
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
      id="privacypolicy"
      className="max-w-3xl mx-auto p-4 space-y-px sm:space-y-2"
    >
      <FadeInOnScroll className="text-2xl sm:text-3xl font-bold font-heading text-center mb-3 uppercase">
        Privacy policy
      </FadeInOnScroll>
      <div className="text-sm sm:text-base font-body text-text space-y-2 py-5 markdown">
        <ReactMarkdown>{privacyPolicy}</ReactMarkdown>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
