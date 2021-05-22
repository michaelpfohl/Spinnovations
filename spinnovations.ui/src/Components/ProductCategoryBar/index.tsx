import {
  ProductCategory,
  ProductCategoryProps,
} from "../../Helpers/Interfaces/ProductCategoryInterfaces";

export const ProductCategoryBar = ({categories, filter, all}: ProductCategoryProps): JSX.Element => {
  const categoryCircle = (category: ProductCategory): JSX.Element => {
    const assignColors = (): void => {
      let counter = 0;
      categories.forEach((category : ProductCategory) => {
        counter++;
        if (counter >= 8) counter = 1;
        category.color = counter
      })
    }
    assignColors();
    return (
      <button key={category.id} id={category.id} className={`product-category-circle bg-scheme-${category.color}`} 
      onClick={filter}>
        <p className="product-category-circle-text" id={category.id}>{category.category_Name}</p>
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
