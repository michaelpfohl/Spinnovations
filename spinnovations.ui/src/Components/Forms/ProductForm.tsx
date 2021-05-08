import React, { Component } from "react";
import { User } from "../../Helpers/Interfaces/UserInterfaces";
import { Product } from "../../Helpers/Interfaces/ProductInterfaces";
import { ProductCategory } from "../../Helpers/Interfaces/ProductCategoryInterfaces";
import productData from "../../Helpers/Data/ProductData";
import productCategoryData from "../../Helpers/Data/ProductCategoryData";

type ProductFormProps = {
  user: User;
  product?: Product;
  onUpdate?: () => void;
  color?: number,
};

class ProductForm extends Component<ProductFormProps> {
  state = {
    id: this.props.product?.id || null,
    name: this.props.product?.name || "",
    imageUrl: this.props.product?.imageUrl || "",
    description: this.props.product?.description || "",
    category_Id: this.props.product?.category_Id || "",
    price: this.props.product?.price || "",
    creator_Id: this.props.product?.creatorId || "",
    quantity_In_Stock: this.props.product?.quantity_In_Stock || "",
    product_categories: [],
    added: false,
  };

  componentDidMount(): void {
    productCategoryData.getProductCategories().then((response) => {
      this.setState({ product_categories: response });
    });
    this.setState({ creator_Id: this.props.user?.id });
  }

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const product = {
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
      category_Id: Number(this.state.category_Id),
      price: Number(this.state.price),
      creator_Id: Number(this.state.creator_Id),
      quantity_In_Stock: Number(this.state.quantity_In_Stock),
    };
    if (this.state.id === null) {
      productData.addNewProduct(product);
      this.setState({
        added: true,
      });
      setTimeout(() => this.setState({added: false}), 3000);
    } else {
      const product = {
        id: this.state.id,
        name: this.state.name,
        imageUrl: this.state.imageUrl,
        description: this.state.description,
        category_Id: Number(this.state.category_Id),
        price: Number(this.state.price),
        creator_Id: Number(this.state.creator_Id),
        quantity_In_Stock: Number(this.state.quantity_In_Stock),
      };
      productData.updateProduct(product).then(()=> {
        if (this.props.onUpdate){
          this.props.onUpdate();
        }
      })
    }
  };

  render(): JSX.Element {
    const { product_categories, added } = this.state;
    const { color } = this.props;
    const categoryNames = (category: ProductCategory): JSX.Element => {
      return (
        <option key={category.id} value={category.id}>
          {category.category_Name}
        </option>
      );
    };
    const options = product_categories.map(categoryNames);

    return (

      <div>
        {added && 
        <div>
          <div className="product-added-container mb-5 mt-5">
            <h1>Product Added!</h1>
          </div>
        </div>
        }
        <div className="d-flex justify-content-center">
          <div className="product-form-content p-3">
            <h1 className={`product-form-header color-text-${color}`}>Add A New Product</h1>
            <div className="d-flex justify-content-center add-product-input-container">
              <form onSubmit={this.handleSubmit} className="add-Product-form">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Product Name"
                    className={`form-control-lg m-2 modal-input color-half-border-${color}`}
                    required
                  />
                </div>
                <div className="">
                  <input
                    type="url"
                    name="imageUrl"
                    value={this.state.imageUrl}
                    onChange={this.handleChange}
                    placeholder="Image URL"
                    className={`form-control-lg m-2 modal-input color-half-border-${color}`}
                    required
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    placeholder="Product Description"
                    className={`form-control-lg m-2 modal-input color-half-border-${color}`}
                    required
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    name="price"
                    value={this.state.price}
                    onChange={this.handleChange}
                    placeholder="Price"
                    className={`form-control-lg m-2 modal-input color-half-border-${color}`}
                    required
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    name="quantity_In_Stock"
                    value={this.state.quantity_In_Stock}
                    onChange={this.handleChange}
                    placeholder="Quantity In Stock"
                    className={`form-control-lg m-2 modal-input color-half-border-${color}`}
                    required
                  />
                </div>
                <select
                  className={`form-group form-control-lg m-2 color-half-border-${color}`}
                  onChange={this.handleChange}
                  name="category_Id"
                  value={this.state.category_Id}
                >
                  {options}
                </select>
                <button className="submit-new-product-button form-button form-button-text mt-1 mb-1">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductForm;
