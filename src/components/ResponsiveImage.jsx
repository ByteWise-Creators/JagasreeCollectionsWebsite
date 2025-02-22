import PropTypes from "prop-types";
import useMediaQuery from "../hooks/useMediaQuery";

const ResponsiveImage = ({ mobileImg, tabImg, desktopImg }) => {
  const isMobile = useMediaQuery("(max-width: 550px)");
  const isTablet = useMediaQuery("(min-width: 551px) and (max-width: 1000px)");

  const imageSrc = isMobile ? mobileImg : isTablet ? tabImg : desktopImg;

  return (
    <div className="w-full overflow-hidden">
      <img
        src={imageSrc}
        loading="lazy"
        alt="Mobile Image"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

ResponsiveImage.propTypes = {
  mobileImg: PropTypes.string.isRequired,
  tabImg: PropTypes.string.isRequired,
  desktopImg: PropTypes.string.isRequired,
};

export default ResponsiveImage;
