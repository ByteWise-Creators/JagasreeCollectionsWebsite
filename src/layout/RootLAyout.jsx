import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

import SearchField from "../components/SearchField";
import Auth from "../pages/Auth";

import usePopupBackDrop from "../hooks/usePopupBackDrop";

import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

const RootLAyout = () => {
  const { offers } = useContext(GlobalContext);
  const {
    BackDrop: SearchBackDrop,
    openPopup: openSearch,
    closePopup: closeSearch,
  } = usePopupBackDrop();

  const {
    BackDrop: AuthBackDrop,
    openPopup: openAuth,
    closePopup: closeAuth,
  } = usePopupBackDrop(null, true);

  const { BackDrop: OffersBackDrop, openPopup: openOffers } = usePopupBackDrop(
    null,
    true
  );

  useEffect(() => {
    let timeOut;
    if (offers.length > 0)
      timeOut = setTimeout(() => {
        openOffers();
      }, 4000);
    return () => clearTimeout(timeOut);
  }, []);

  return (
    <main>
      <Navbar openSearch={openSearch} openAuth={openAuth} />
      <Outlet context={{ openAuth }} />
      <Footer />

      {/* auth */}
      <AuthBackDrop>
        <Auth closeFunction={closeAuth} />
      </AuthBackDrop>

      {/* search */}
      <SearchBackDrop>
        <SearchField closeFunction={closeSearch} />
      </SearchBackDrop>

      {offers.length > 0 && (
        <OffersBackDrop>
          <Carousel
            images={offers}
            heightOfImg="h-[380px]"
            options={{
              buttonColor: "#ffffff70",
              buttonSize: 18,
              buttonArrowColor: "#00000090",
            }}
          />
        </OffersBackDrop>
      )}
    </main>
  );
};

export default RootLAyout;
