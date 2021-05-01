import { ProductProps } from '../../Helpers/Interfaces/ProductInterfaces';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
  } from 'reactstrap';
import { Link } from 'react-router-dom';

const goToSingleProduct = (productId : number) => {
  console.log("image clicked", productId);
}

export const ProductCard = ({ product }: ProductProps): JSX.Element => 
  <div className="col-lg-3" key={product.id}>
    <Card className="product-card">
      <Link to="/details">
        <CardImg className="product-image" top width="100%" src={product.imageUrl} alt="product image" onClick={() => goToSingleProduct(product.id)}/>
      </Link>
      <CardBody>
        <CardTitle tag="h5">{product.name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">Quantity in Stock: {product.quantity_In_Stock}</CardSubtitle>
        <CardText className="product-description">{`${product.description.substring(0,100)}...`}</CardText>
        <CardSubtitle>{`$${product.price}`}</CardSubtitle>
        <Button>Add To Cart</Button>
      </CardBody>
    </Card>
  </div>
