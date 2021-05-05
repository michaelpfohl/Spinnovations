import { ProductProps } from "../../Helpers/Interfaces/ProductInterfaces";
import {
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }: ProductProps): JSX.Element => (
  <div className="col-lg-3" key={product.id}>
    <div className="product-card">
      <CardTitle className="product-name" tag="h5">{product.name}</CardTitle>
      <Link
        to={{
          pathname: "/details",
          state: {
            product: product,
          },
        }}
      >
        <CardImg
          className="product-image"
          top
          width="100%"
          src={product.imageUrl}
          alt="product image"
        />
      </Link>
      <CardBody>
        <div className="d-flex justify-content-around align-items-center">
        <CardSubtitle tag="h6">
          Available: {product.quantity_In_Stock}
        </CardSubtitle>
        <i className="fas fa-ellipsis-v"></i>
        <CardSubtitle>{`$${product.price}`}</CardSubtitle>
        <i className="fas fa-ellipsis-v"></i>
        <button className="cart-button"><i className="fas fa-cart-plus"></i></button>
        </div>
      </CardBody>
    </div>
  </div>
);
