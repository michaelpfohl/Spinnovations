import React, { Component } from "react";
import { User } from "../Helpers/Interfaces/UserInterfaces";
import ProductForm from "../Components/Forms/ProductForm";

type AddProductProps = {
  user: User;
};
class AddProduct extends Component<AddProductProps> {
  state = {
    greetingColor: 0,
  };

  componentDidMount(): void {
    this.setState({ greetingColor: Math.floor(Math.random() * 7) + 1 });
  }

  render(): JSX.Element {
    const { user } = this.props;
    const { greetingColor } = this.state;
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className={`color-border-${greetingColor} product-form-container`}>
          <ProductForm user={user} color={greetingColor}/>
        </div>
      </div>
    );
  }
}

export default AddProduct;
