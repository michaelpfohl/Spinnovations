import {
  ProductCategory,
  ProductCategoryProps,
} from "../../Helpers/Interfaces/ProductCategoryInterfaces";

export const ProductCategoryBar = ({categories, filter}: ProductCategoryProps): JSX.Element => {
  const categoryCircle = (category: ProductCategory): JSX.Element => {
    return (
      <button key={category.id} id={category.id} className="product-category-circle" 
      onClick={filter}>
        <p className="product-category-circle-text"id={category.id} onClick={filter}>{category.category_Name}</p>
      </button>
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
