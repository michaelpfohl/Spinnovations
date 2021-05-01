import React, { Component } from "react";
import { User } from "../../Helpers/Interfaces/UserInterfaces";
import { Product } from "../../Helpers/Interfaces/ProductInterfaces";
import { ProductCategory } from '../../Helpers/Interfaces/ProductCategoryInterfaces';
import productData from "../../Helpers/Data/ProductData";
import productCategoryData from "../../Helpers/Data/ProductCategoryData";

type ProductFormProps = {
  user: User;
  product?: Product;
};

class ProductForm extends Component<ProductFormProps> {
  state = {
    id: this.props.product?.id || null,
    name: this.props.product?.name || "",
    imageUrl: this.props.product?.imageUrl || "",
    description: this.props.product?.description || "",
    category_Id: this.props.product?.categoryId || "",
    price: this.props.product?.price || "",
    creator_Id: this.props.product?.creatorId || "",
    quantity_In_Stock: this.props.product?.quantity_In_Stock || "",
    product_categories: []
  };

  componentDidMount(): void {
      productCategoryData.getProductCategories().then((response) => {
          this.setState({ product_categories: response });
      });
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({ creator_Id: this.props.user.id });
    if (this.state.id === null) {
      productData.addNewProduct(this.state);
    } else {
      // update the product
    }
  };

  render(): JSX.Element {
    const { product_categories } = this.state;
    const categoryNames = (category: ProductCategory): JSX.Element => {
        return (<option key={category.id} value={category.id}>{category.category_Name}</option>)
    }
    const options = product_categories.map(categoryNames);

    return (
      <div>
        <h1 className="mt-5">Add A New Product</h1>
        <div className="d-flex justify-content-center">
          <form onSubmit={this.handleSubmit} className="add-Product-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Product Name"
                className="form-control form-control-lg m-2 modal-input"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="url"
                name="imageUrl"
                value={this.state.imageUrl}
                onChange={this.handleChange}
                placeholder="Image URL"
                className="form-control form-control-lg m-2 modal-input"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="Product Description"
                className="form-control form-control-lg m-2 modal-input"
                required
              />
            </div>
            <div className="form-group">
                <select defaultValue={"default"}className="form-control">
                    <option value="default" disabled>Product Category</option>
                    {options}
                </select>
            </div>
            <div className="form-group">
              <input
                type="number"
                name="category_Id"
                value={this.state.category_Id}
                onChange={this.handleChange}
                placeholder="Category ID"
                className="form-control form-control-lg m-2 modal-input"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
                placeholder="Price"
                className="form-control form-control-lg m-2 modal-input"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="quantity_In_Stock"
                value={this.state.quantity_In_Stock}
                onChange={this.handleChange}
                placeholder="Quantity In Stock"
                className="form-control form-control-lg m-2 modal-input"
                required
              />
            </div>
            <button className="btn btn-success form-button form-button-text mt-1">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ProductForm;
