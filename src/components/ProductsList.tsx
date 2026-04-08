import ProductItem from "./ProductItem";
import ProductsHeader from "./ProductsHeader";
import type { IProductsListProps } from "../types/types";

const ProductsList = ({
  products,
  sortField,
  sortOrder,
  onSort,
}: IProductsListProps) => {
  return (
    <div>
      <ProductsHeader
        sortField={sortField || null}
        sortOrder={sortOrder || null}
        onSort={onSort || (() => {})}
      />

      <div>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
