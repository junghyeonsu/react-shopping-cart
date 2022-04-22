import React, { useEffect } from "react";
import ProductListItem from "../components/ProductListItem";
import Layout from "../components/Layout";
import { useActions } from "../hooks/useActions";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { Product } from "../types/dto";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductList = () => {
  const { getProducts } = useActions();
  const { products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Layout>
      <section>
        {products ? (
          <InfiniteScroll
            dataLength={products.length}
            next={getProducts}
            hasMore
            loader={
              <>
                <br />
                <div>loading...</div>
              </>
            }
          >
            <div className="product-container">
              {products?.map((product: Product, index: number) => (
                <ProductListItem
                  key={`${product.id}-${index}`}
                  product={product}
                />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          "Loading..."
        )}
      </section>
    </Layout>
  );
};

export default ProductList;
