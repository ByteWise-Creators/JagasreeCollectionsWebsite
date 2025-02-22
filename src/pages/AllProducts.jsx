import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

import StoreSection from "../components/StoreSection";

const AllProducts = () => {
  const { products } = useContext(GlobalContext);
  
  return (
    <StoreSection
      products={products}
      title="Collections"
      path="All-products"
      id="all"
    />
  );
};
export default AllProducts;
