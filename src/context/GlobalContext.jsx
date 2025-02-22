import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("_userAuthToken");
    if (storedUser) return storedUser;
    return null;
  });
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [socials, setSocials] = useState({});
  const [markdowns, setMarkdowns] = useState({
    about: null,
    privacyPolicy: null,
    shoppingPolicy: null,
  });
  const [searchKeywords, setSearchKeywords] = useState([]);
  const [offers, setOffers] = useState([]);

  const fetchSomething = useCallback(async (url, defaultValue) => {
    try {
      const { data } = await axios.get(url);
      return data?.data || defaultValue;
    } catch (error) {
      console.error(`Error in fetching '${url}': `, error);
      return defaultValue;
    }
  }, []);

  useEffect(() => {
    (async function () {
      const [products, policies, about, socialMedias, keywords, offers] =
        await Promise.all([
          fetchSomething("/api/jc/products", []),
          fetchSomething(`/api/jc/policy`, ""),
          fetchSomething(`/api/jc/about`, ""),
          fetchSomething(`/api/jc/socials`, {}),
          fetchSomething(`/api/jc/keywords`, []),
          fetchSomething(`/api/jc/offers`, []),
        ]);
      setProducts(products);
      setMarkdowns({
        about: about,
        privacyPolicy: policies?.policy || "",
        shoppingPolicy: policies?.shopping || "",
      });
      setSocials(socialMedias);
      setSearchKeywords(keywords);
      setOffers(offers);
    })();
  }, [fetchSomething]);

  const contextValue = {
    products,
    searchValue,
    setSearchValue,
    markdowns,
    user,
    setUser,
    socials,
    searchKeywords,
    offers
  };
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
