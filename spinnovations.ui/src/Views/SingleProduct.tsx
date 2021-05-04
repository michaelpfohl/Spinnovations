import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ProductProps, Product } from '../Helpers/Interfaces/ProductInterfaces';
import userData from '../Helpers/Data/userData';
import { User } from '../Helpers/Interfaces/UserInterfaces';

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
          <div className="col-10 mx-auto col-md my-3">
            <img src={product.imageUrl} alt="product image"/>
          </div>
          <div className="col-10 max-auto col-md my-3 text-left">
            <p>{product.description}</p>
            <p>Spinnovator: {<Link to={url}>{user?.display_Name}</Link>}</p>
            <p>Quantity Available: {product.quantity_In_Stock}</p>
            <strong>Price: ${product.price}</strong>
          </div>
        </div>
        <div className="row">
          <div className="col max-auto">
            <Button>Add to Cart</Button>
            <Link to='/Products'>
              <Button>Return to Products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProduct;
