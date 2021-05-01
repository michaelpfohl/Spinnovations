import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ProductProps, Product } from '../Helpers/Interfaces/ProductInterfaces';

type SingleProductState = {
  product: Product;
}

class SingleProduct extends Component<ProductProps> {

  state : SingleProductState = {
    product: this.props.location.state.product,
  }

  render(): JSX.Element {
    const { product } = this.state;
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
