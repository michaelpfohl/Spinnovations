import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ProductProps, Product } from '../Helpers/Interfaces/ProductInterfaces';
import userData from '../Helpers/Data/userData';
import { User } from '../Helpers/Interfaces/UserInterfaces';
import productData from '../Helpers/Data/ProductData';
import UpdateProductModal from '../Components/Modals/UpdateProductModal';

type SingleProductState = {
  product: Product;
  user: User;
  greetingColor: number;
  added: boolean;
}

class SingleProduct extends Component<ProductProps> {

  state : SingleProductState = {
    product: this.props.location.state.product,
    user: null,
    greetingColor: 0,
    added: false,
  }

  componentDidMount = () : void => {
    userData.getUserById(this.state.product.creator_Id).then((response: User) => {
      this.setState({
          user: response
      })
    });
    this.setState({ greetingColor: Math.floor(Math.random() * 7) + 1 });
  }

  addToCart = (): void => {
    const { product } = this.state;
    localStorage.setItem(product.name, JSON.stringify(product));
    this.setState({ added: true });
    setTimeout(() => this.setState({added: false}), 3000)
  }

  deleteProduct = (): void => {
    productData.deleteProduct(this.state.product.id).then(() => {
      this.props.history.push('/Products')
    });
  }

  onUpdate = (): void => {
    productData.getProduct(this.state.product.id).then((response) => {
      this.setState({product: response})
    })
  }

  render(): JSX.Element {
    const { product, user, greetingColor, added } = this.state;
    const url = `/seller/:${product.creator_Id}/`;
    return (
      <div>
        {added && (
          <div
            className="alert alert-success alert-dismissible fade show mb-5"
            role="alert"
          >
            <strong>{product.name} added to cart!</strong> Visit the cart page to check out!
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => this.setState({ added: false })}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <div className="d-flex justify-content-center mt-5 mb-5">
          <div className={`single-product-view col-8 color-border-${greetingColor}`}>
            <h1 className={`mt-4 mb-4 color-text-${greetingColor} underline`}>
              {product.name}
            </h1>
            <div className="d-flex">
              <div className="single-product-image">
                <img className={`color-half-border-${greetingColor}`} src={product.imageUrl} alt="product"/>
              </div>
              <div className="product-info">
                <p>{product.description}</p>
                <p>Spinnovator: {<Link className={`color-text-${greetingColor}`} to={url}>{user?.display_Name}</Link>}</p>
                <p>Quantity Available: {product.quantity_In_Stock}</p>
                <strong className="d-flex mb-4">Price: ${product.price}</strong>
                  <div className="buttons">
                    <button className="style-button mb-4 d-block bg-scheme-green" onClick={this.addToCart}>Add to Cart</button>
                    <Link to='/Products'>
                      <button className="style-button mb-4 bg-scheme-blue-green">Return to Products</button>
                    </Link>
                    {this.props.user?.id === product?.creator_Id &&
                      <div> 
                        <UpdateProductModal className="mt-4 mb-4 d-block" user={user} product={product} onUpdate={this.onUpdate}/>
                        <button className="style-button mb-4 bg-scheme-red" onClick={this.deleteProduct}>Delete</button>
                      </div>
                    }
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProduct;
