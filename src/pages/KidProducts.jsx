import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import StoreSection from "../components/StoreSection";

const KidProducts = () => {
  const { products } = useContext(GlobalContext);
  const kidsProduct = products.filter((product) => product.category === "Kids");
  return (
    <StoreSection
      products={kidsProduct}
      title="Kids Collection"
      path="Kids"
      id="kid"
    />
  );
};

export default KidProducts;
