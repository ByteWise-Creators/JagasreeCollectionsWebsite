/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

import jcLogo from "../assets/logo/logo-nobg.png";

import { CgClose } from "react-icons/cg";
import { SlMenu, SlUser } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { GoChevronRight } from "react-icons/go";

const storeMenuItems = [
  { path: "/store/all-products#all", label: "All products" },
  { path: "/store/men#men", label: "Mens" },
  { path: "/store/women#women", label: "Womens" },
  { path: "/store/kid#kid", label: "Kids" },
];

const Navbar = ({ openSearch, openAuth }) => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [isScrollDirIsDown, setIsScrollDirIsDown] = useState(false);

  const location = useLocation();
  const lastScrollY = useRef(0);
  const navAnimateControl = useAnimationControls();

  const pathNames = [
    "/",
    "/store",
    "/store/all-products",
    "/store/men",
    "/store/women",
    "/store/kid",
  ];

  const navAnimateVarients = {
    initial: {
      y: -90,
      opacity: 0.3,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 120) {
        setIsScrollDirIsDown(false);
      } else {
        if (currentScrollY > lastScrollY.current) {
          setIsScrollDirIsDown(false);
          navAnimateControl.start("initial");
        } else {
          setIsScrollDirIsDown(true);
          navAnimateControl.start("animate");
        }
      }

      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        variants={navAnimateVarients}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        initial="animate"
        animate={navAnimateControl}
        className={`shadow ${
          isScrollDirIsDown
            ? `sticky bg-white/75 backdrop-blur-sm *:text-text`
            : `absolute bg-gradient-to-b from-black/40 to-transparent ${
                pathNames.includes(location.pathname)
                  ? "*:text-white"
                  : "*:text-text"
              }`
        } top-0 left-0 w-full z-50 sm:shadow`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Mobile menu */}
            <div
              role="button"
              className="block sm:hidden pr-8"
              onClick={() => setNavIsOpen(true)}
            >
              <SlMenu className={`size-6`} />
            </div>

            {/* JC Logo */}
            <a href="/">
              <img
                src={jcLogo}
                alt="Logo"
                className="size-[72px] sm:size-20 object-cover"
              />
            </a>

            {/* Desktop nav links */}
            <div
              className={`hidden sm:flex items-center gap-8 sm:gap-12 font-heading text-2xl tracking-wide `}
            >
              <Link to="/#home">Home</Link>
              <Link to="/about#about">About</Link>
              <NavDropDownMenu label="Store" menuItems={storeMenuItems} />
              <Link to="/contact#contact">Contact</Link>
            </div>

            {/* Search and Login */}
            <div className={`flex items-center gap-4 sm:gap-8`}>
              <button onClick={openSearch}>
                <IoIosSearch className="size-7 sm:size-8" />
              </button>
              <button onClick={openAuth}>
                <SlUser className="size-[22px] sm:size-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
      {/* Mobile nav links */}
      <MobileNav
        navIsOpen={navIsOpen}
        setNavIsOpen={setNavIsOpen}
        menuItems={storeMenuItems}
        openSearch={openSearch}
      />
    </>
  );
};

Navbar.propTypes = {
  openSearch: PropTypes.func,
  openAuth: PropTypes.func,
};

export default Navbar;

const NavDropDownMenu = ({ label, menuItems }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative cursor-pointer py-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{label}</span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-14 -left-3 min-w-36 flex flex-col bg-neutral-50 text-gray-900 text-xl rounded shadow-lg overflow-hidden"
          >
            {menuItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className="px-3 py-1 hover:bg-neutral-200"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

NavDropDownMenu.propTypes = {
  label: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
};

const MobileNav = ({
  navIsOpen,
  setNavIsOpen,
  menuItems,
  openSearch,
  openAuth,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      {navIsOpen && (
        <motion.div
          role="button"
          onClick={() => setNavIsOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 z-50 h-screen w-full bg-black/50 sm:hidden"
        />
      )}
      <AnimatePresence>
        {navIsOpen && (
          <motion.div
            initial={{ opacity: 0.5, x: -700 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.5, x: -700 }}
            transition={{ duration: 0.5 }}
            className="sm:hidden fixed z-50 top-0 left-0 w-4/5 h-full text-text bg-white"
          >
            <button
              onClick={() => setNavIsOpen(false)}
              className="absolute top-0 -right-12"
            >
              <CgClose className="size-12 bg-neutral-950/50 text-white p-2" />
            </button>
            <div className="flex flex-col justify-center text-lg font-body font-medium *:border-b *:py-2.5">
              <h2 className="font-heading text-2xl font-semibold px-5">Menu</h2>
              <Link
                to="/#home"
                onClick={() => setNavIsOpen(false)}
                className="px-5"
              >
                Home
              </Link>
              <div
                role="button"
                className="flex justify-between items-center px-5"
                onClick={() => setIsClicked((pv) => !pv)}
              >
                <span>Store</span>
                <GoChevronRight
                  className={classNames(
                    "transition-all duration-150",
                    isClicked && "transform rotate-90"
                  )}
                />
              </div>
              {isClicked &&
                menuItems.map((item, i) => (
                  <motion.div
                    key={i}
                    onClick={() => setNavIsOpen(false)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 * i,
                      type: "spring",
                      stiffness: 400,
                      damping: 40,
                    }}
                    className="pl-8 font-semibold text-base *:flex"
                  >
                    <Link to={item.path}>{item.label}</Link>
                  </motion.div>
                ))}
              <Link
                to="/about"
                onClick={() => setNavIsOpen(false)}
                className="px-5"
              >
                About
              </Link>
              <Link
                to="/contact#contact"
                onClick={() => setNavIsOpen(false)}
                className="px-5"
              >
                Contact us
              </Link>
              <button
                onClick={() => {
                  setNavIsOpen(false);
                  openSearch();
                }}
                className="flex gap-2 items-center px-5"
              >
                <IoIosSearch size={20} /> Search
              </button>
              <button
                onClick={() => {
                  setNavIsOpen(false);
                  openAuth();
                }}
                className="flex gap-3 items-center px-5"
              >
                <SlUser size={16} /> Login / Register
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

MobileNav.propTypes = {
  navIsOpen: PropTypes.bool.isRequired,
  setNavIsOpen: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
  openSearch: PropTypes.func,
  openAuth: PropTypes.func,
};