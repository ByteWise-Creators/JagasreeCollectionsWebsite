import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FadeInOnScroll from "../animation/FadeInOnScroll";

import errorImg from "../assets/others/error-not-found.png";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="h-[80vh] w-full flex flex-col gap-2 justify-center items-center">
        <FadeInOnScroll className="text-center pt-5">
          <img src={errorImg} className="object-cover h-32 sm:h-44" alt="404" />
        </FadeInOnScroll>
        <FadeInOnScroll className="text-lg font-semibold font-body text-center text-gray-500">
          I think your on wrong path
          <span onClick={() => navigate("/")} className="block cursor-pointer">
            Go back to <span className="underline">home?</span>
          </span>
        </FadeInOnScroll>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;
