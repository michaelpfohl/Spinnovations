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
}

class SingleProduct extends Component<ProductProps> {

  state : SingleProductState = {
    product: this.props.location.state.product,
    user: null,
  }

  componentDidMount = () : void => {
    userData.getUserById(this.state.product.creator_Id).then((response: User) => {
      this.setState({
          user: response
      })
    });
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
    const { product, user } = this.state;
    const url = `/seller/:${product.creator_Id}/`;
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-10 mx-auto text-center my-5">
            <h1>{product.name}</h1>
          </div>
        </div>
        <div className="row">
          <div className="single-product-image col-10 mx-auto col-md my-3">
            <img src={product.imageUrl} alt="product image"/>
          </div>
          <div className="col-10 max-auto col-md my-3 text-left">
            <p>{product.description}</p>
            <p>Spinnovator: {<Link to={url}>{user?.display_Name}</Link>}</p>
            <p>Quantity Available: {product.quantity_In_Stock}</p>
            <strong className="pb-2">Price: ${product.price}</strong>
            <div className="buttons d-block">
              <Button className="d-block" onClick={this.addToCart}>Add to Cart</Button>
              <Link to='/Products'>
                <Button>Return to Products</Button>
              </Link>
              {this.props.user?.id === product?.creator_Id &&
                <div> 
                  <UpdateProductModal user={user} product={product} onUpdate={this.onUpdate}/>
                  <Button className="btn-danger" onClick={this.deleteProduct}>Delete</Button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProduct;
