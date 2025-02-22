import PropTypes from "prop-types";
import FadeInOnScroll from "../animation/FadeInOnScroll";
import { Link } from "react-router-dom";

const CollectionImg = ({ image, title, to, i }) => {
  return (
    <FadeInOnScroll
      className="border-2 shadow-lg rounded-md overflow-hidden flex flex-col gap-1 px-1.5 pb-1.5"
      delay={0.15 * i}
      animeteKey={title}
    >
      <Link to={to}>
        <img src={image} className="size-72 object-cover w-full" alt="" />
        <h2 className="text-xl text-text font-heading text-center">{title}</h2>
      </Link>
    </FadeInOnScroll>
  );
};

CollectionImg.propTypes = {
  image: PropTypes.string,
  to: PropTypes.string,
  title: PropTypes.string,
  i: PropTypes.number,
};

export default CollectionImg;
