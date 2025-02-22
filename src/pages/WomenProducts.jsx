import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import StoreSection from "../components/StoreSection";

const WomenProducts = () => {
  const { products } = useContext(GlobalContext);
  const womensProduct = products.filter(
    (product) => product.category === "Womens"
  );
  return (
    <StoreSection
      products={womensProduct}
      title="Womens Collection"
      path="Womens"
      id="women"
    />
  );
};

export default WomenProducts;
