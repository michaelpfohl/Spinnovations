import { ProductProps } from "../../Helpers/Interfaces/ProductInterfaces";
import {
  CardImg,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";

export const ProductCard = ({ product, color, cartAlert }: ProductProps): JSX.Element => (
  <div className="col-lg-3 mb-4" key={product.id}>
    <div className={`product-card color-border-${color} color-text-${color}`}>
      <div className={`product-name color-bottom-border-${color}`}>{product.name}</div>
      <Link
        to={{
          pathname: "/details",
          state: {
            product: product,
          },
        }}
      >
        <CardImg
          className={`product-image color-bottom-border-${color}`}
          top
          width="100%"
          src={product.imageUrl}
          alt="product image"
        />
      </Link>
      <div className="product-details">
        <div className="d-flex justify-content-around align-items-center">
        <CardSubtitle tag="h6">
          Available: {product.quantity_In_Stock}
        </CardSubtitle>
        <i className="fas fa-ellipsis-v"></i>
        <CardSubtitle>{`$${product.price}`}</CardSubtitle>
        <i className="fas fa-ellipsis-v"></i>
        <button className={`cart-button color-cart-${color}`} onClick={() => {
          localStorage.setItem(product.name, JSON.stringify(product))
          cartAlert(product.name)
        }}><i className="fas fa-cart-plus"></i></button>
        </div>
      </div>
    </div>
  </div>
);
