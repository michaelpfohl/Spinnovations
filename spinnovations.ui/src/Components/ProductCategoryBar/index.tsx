import {
  ProductCategory,
  ProductCategoryProps,
} from "../../Helpers/Interfaces/ProductCategoryInterfaces";

export const ProductCategoryBar = ({categories, filter, all}: ProductCategoryProps): JSX.Element => {
  const categoryCircle = (category: ProductCategory): JSX.Element => {
    const getRandomColor = () =>  Math.floor(Math.random() * 7) + 1;
    return (
      <button key={category.id} id={category.id} className={`product-category-circle bg-scheme-${getRandomColor()}`} 
      onClick={filter}>
        <p className="product-category-circle-text" id={category.id} onClick={filter}>{category.category_Name}</p>
      </button>
    );
  };
  const circles = categories.map(categoryCircle);
  return (
    <div className="product-category-bar d-flex justify-content-center">
      <div className="col-10">
        <div className="d-flex justify-content-around">
          <button key="all-products" id="all-products" className="product-category-circle" 
          onClick={all}>
            <p className="product-category-circle-text" id="all-products" onClick={all}>All Products</p>
          </button>
          {circles}
        </div>
      </div>
    </div>
  );
};
