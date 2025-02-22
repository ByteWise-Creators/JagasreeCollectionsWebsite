import { Link } from "react-router-dom";
import { instaImg, amazonImg, flipkartImg, meeshoImg } from "../assets";

import {
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
} from "react-icons/io5";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Footer = () => {
  const { socials } = useContext(GlobalContext);
  const { instagram, amazon, flipkart, meesho, email, whatsapp } = socials;

  const contactInfo = [
    {
      icon: <IoMailOutline className="inline mr-2.5" />,
      value: email,
      onClick: () =>
        (window.location.href = `mailto:${email}`),
    },
    {
      icon: <IoCallOutline className="inline mr-2.5" />,
      value: `+91 ${whatsapp}`,
      onClick: () => (window.location.href = `tel:+91${whatsapp}`),
    },
    {
      icon: <IoLocationOutline className="inline mr-2.5" />,
      value:
        "Jagasree collections, 29/16 manickam street, Swaminathapuram, salem-636009",
      onClick: () =>
        window.open(
          "https://www.google.com/maps/search/?api=1&query=Jagasree+collections,+29/16+manickam+street,+Swaminathapuram,+salem-636009",
          "_blank"
        ),
    },
  ];

  const discover = [
    { path: "/#home", title: "Home" },
    { path: "/#recommended", title: "Recommended for you" },
    { path: "/store/all-products#all", title: "Collections" },
    { path: "/about#about", title: "About" },
  ];

  const shopByCategories = [
    { path: "/store/men#men", title: "Men's" },
    { path: "/store/women#women", title: "Women's" },
    { path: "/store/kid#kid", title: "Kids" },
  ];

  const policiesAndSupport = [
    { path: "/policy/privacy-policy#privacypolicy", title: "Privacy Policy" },
    {
      path: "/policy/shopping-policy#shoppingpolicy",
      title: "Shopping Policy",
    },
    { path: "/#faqs", title: "FAQs" },
    { path: "/contact#contact", title: "Contact" },
  ];

  const links = [
    { icon: instaImg, link: instagram },
    { icon: amazonImg, link: amazon },
    { icon: flipkartImg, link: flipkart },
    { icon: meeshoImg, link: meesho },
  ];

  return (
    <footer className="w-full py-4 px-5 bg-gray-900 text-gray-50">
      <div className="container mx-auto">
        <div className="lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-5">
          {/* Contact Info */}
          <section className="lg:col-span-2 max-w-80">
            <h3 className="text-xl font-semibold font-heading mb-2.5">
              Contact Info
            </h3>
            <ul className="flex font-body flex-col gap-1.5">
              {contactInfo.map(({ icon, onClick, value }, i) => (
                <li key={i} onClick={onClick} className="cursor-pointer">
                  <span>{icon}</span>
                  <address className="text-sm inline">{value}</address>
                </li>
              ))}
            </ul>
          </section>

          {/* Discover */}
          <section>
            <h3 className="text-xl font-semibold font-heading mb-2.5">
              Discover
            </h3>
            <ul className="flex font-body flex-col gap-1 md:gap-2">
              {discover.map((link, i) => (
                <li key={i} className="text-sm">
                  <Link to={link.path} className="hover:underline">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Shop by Category */}
          <section>
            <h3 className="text-xl font-semibold font-heading mb-2.5">
              Shop by Category
            </h3>
            <ul className="flex font-body flex-col gap-1 md:gap-2">
              {shopByCategories.map((link, i) => (
                <li key={i} className="text-sm">
                  <Link to={link.path} className="hover:underline">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Policies & Support */}
          <section>
            <h3 className="text-xl font-semibold font-heading mb-2.5">
              Policies & Support
            </h3>
            <ul className="flex font-body flex-col gap-1 md:gap-2">
              {policiesAndSupport.map((link, i) => (
                <li key={i} className="text-sm mb-1">
                  <Link to={link.path} className="hover:underline">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Social Media Icons */}
          <div className="col-span-full flex items-center gap-x-3 sm:gap-x-6 justify-center mt-2">
            <span className="text-lg sm:text-xl font-semibold font-heading">
              Also joind us on :
            </span>
            {links.map(({ icon, link }, i) => (
              <a
                key={i}
                href={`https://${link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={icon}
                  alt={`Link to ${link}`}
                  className="size-8 sm:size-9 transform grayscale hover:grayscale-0 hover:scale-110 border-[0.3px] rounded-full overflow-hidden p-1"
                />
              </a>
            ))}
          </div>

          {/* copyrights */}
          <div className="col-span-full text-center py-4 pb-12 md:pb-0 border-t-[0.5px] border-gray-700">
            <p className="text-sm md:text-base font-body text-gray-200">
              © Copyright {new Date().getFullYear()}. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
