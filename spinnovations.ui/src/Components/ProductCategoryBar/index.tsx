import {
  ProductCategory,
  ProductCategoryProps,
} from "../../Helpers/Interfaces/ProductCategoryInterfaces";

export const ProductCategoryBar = ({
  categories,
}: ProductCategoryProps): JSX.Element => {
  const categoryCircle = (category: ProductCategory): JSX.Element => {
    return (
      <div key={category.id} id={category.id} className="product-category-circle">
        <p className="product-category-circle-text">{category.category_Name}</p>
      </div>
    );
  };
  const circles = categories.map(categoryCircle);
  return (
    <div className="product-category-bar d-flex justify-content-center">
      <div className="col-10">
        <div className="d-flex justify-content-around">{circles}</div>
      </div>
    </div>
  );
};
