import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import StoreSection from "../components/StoreSection";

const MenProducts = () => {
  const { products } = useContext(GlobalContext);
  const mensProduct = products.filter((product) => product.category === "Mens");
  
  return (
    <StoreSection
      products={mensProduct}
      title="Mens Collection"
      path="Mens"
      id="men"
    />
  );
};

export default MenProducts;
