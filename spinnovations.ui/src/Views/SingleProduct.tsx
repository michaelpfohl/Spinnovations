import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ProductProps, Product } from '../Helpers/Interfaces/ProductInterfaces';
import userData from '../Helpers/Data/userData';
import { User } from '../Helpers/Interfaces/UserInterfaces';
import productData from '../Helpers/Data/ProductData';
import UpdateProductModal from '../Components/Modals/UpdateProductModal';

type SingleProductState = {
  product: Product;
  user: User;
  greetingColor: number;
}

class SingleProduct extends Component<ProductProps> {

  state : SingleProductState = {
    product: this.props.location.state.product,
    user: null,
    greetingColor: 0,
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
    const { product, user, greetingColor } = this.state;
    const url = `/seller/:${product.creator_Id}/`;
    return (
      <div>
        <div className="d-flex justify-content-center mt-5">
          <div className={`single-product-view col-9 color-border-${greetingColor}`}>
            <h1 className={`mt-4 mb-4 color-text-${greetingColor} underline`}>
              {product.name}
            </h1>
            <div className="d-flex">
              <div className="single-product-image">
                <img src={product.imageUrl} alt="product image"/>
              </div>
              <div className="product-info">
                <p>{product.description}</p>
                <p>Spinnovator: {<Link className={`color-text-${greetingColor}`} to={url}>{user?.display_Name}</Link>}</p>
                <p>Quantity Available: {product.quantity_In_Stock}</p>
                <strong className="pb-2">Price: ${product.price}</strong>
                  <div className="buttons d-block">
                    <Button className="mt-4 mb-4 d-block" onClick={this.addToCart}>Add to Cart</Button>
                    <Link to='/Products'>
                      <Button className="mt-4 mb-4 d-block">Return to Products</Button>
                    </Link>
                    {this.props.user?.id === product?.creator_Id &&
                      <div> 
                        <UpdateProductModal className="mt-4 mb-4 d-block" user={user} product={product} onUpdate={this.onUpdate}/>
                        <Button className="mt-4 mb-4 d-block btn-danger" onClick={this.deleteProduct}>Delete</Button>
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
