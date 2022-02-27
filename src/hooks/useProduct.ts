import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/Store";
import { getProducts } from "../modules/Products";

function useProduct() {
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);

  const products = useSelector(
    (state: RootState) => state.products.productsList
  );

  const handleLimit = () => {
    window.innerWidth >= 1440 && setLimit(8);
    window.innerWidth < 1440 && setLimit(6);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return { limit, page, setPage, products, handleLimit };
}

export default useProduct;
