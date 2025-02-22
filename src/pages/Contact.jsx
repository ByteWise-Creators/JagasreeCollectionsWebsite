import { useContext, useEffect } from "react";
import FadeInOnScroll from "../animation/FadeInOnScroll";
import { useLocation } from "react-router-dom";
import {
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
} from "react-icons/io5";
import { GlobalContext } from "../context/GlobalContext";

const Contact = () => {
  const { socials } = useContext(GlobalContext);
  const { hash } = useLocation();

  const { whatsapp, email } = socials;

  const contactInfo = [
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

    {
      icon: <IoCallOutline className="inline mr-2.5" />,
      value: `+91 ${whatsapp || "95855 06071"}`,
      onClick: () =>
        (window.location.href = `tel:+91 ${whatsapp || "95855 06071"}`),
    },
    {
      icon: <IoMailOutline className="inline mr-2.5" />,
      value: `${email || "jagasreecollections@gmail.com"}`,
      onClick: () =>
        (window.location.href = `mailto:${
          email || "jagasreecollections@gmail.com"
        }}`),
    },
  ];

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
      id="contact"
      className="overflow-x-hidden pt-[75px] sm:pt-20 pb-5 min-h-screen"
    >
      <div className="container mx-auto px-4">
        <FadeInOnScroll className="text-xl sm:text-3xl font-bold font-heading text-center my-3 md:my-5 uppercase">
          Store location
        </FadeInOnScroll>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="basis-full md:basis-1/2">
            <iframe
              className="w-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.4475291728118!2d78.13732527418495!3d11.662662542223956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1f261976227%3A0xfaf239bcf1c006f0!2sJagasree%20collections!5e0!3m2!1sen!2sin!4v1736610030106!5m2!1sen!2sin"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="basis-full md:basis-1/2">
            <div className="flex flex-col gap-3 md:gap-6">
              {contactInfo.map((info, i) => (
                <FadeInOnScroll
                  key={i}
                  className="flex items-center font-body text-gray-500 font-semibold text-sm md:text-lg gap-2 md:gap-4 bg-gray-50 p-3 md:p-4 rounded-md hover-elavate cursor-pointer"
                  onClick={info.onClick}
                >
                  <span className="text-2xl md:text-3xl">{info.icon}</span>
                  <div>
                    <p>{info.label}</p>
                    <p>{info.value}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
