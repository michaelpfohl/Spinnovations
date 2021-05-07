import { ProductProps } from '../../Helpers/Interfaces/ProductInterfaces';

export const CartCard = ({ product, deleteFromCart }: ProductProps): JSX.Element => (
  <div className="container py-1">
    <div className="row">
      <div className="col-10 mx-auto text-center my-5">
        <h1>{product.name}</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-10 mx-auto col-md my-3">
        <img src={product.imageUrl} alt="product image" />
      </div>
      <div className="col-10 max-auto col-md my-2 text-left">
        <p>{product.description}</p>
        <strong>Price: ${product.price}</strong>
        <p>Quantity Ordered: 1</p>
      </div>
    </div>
    <div className="row">
      <div className="col max-auto"></div>
    </div>
    <div>
      <button
        onClick={() => {
          deleteFromCart(product.name);
        }}
      >
        Remove From Cart
      </button>
    </div>
  </div>
);
