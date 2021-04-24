import { ProductProps } from '../../Helpers/Interfaces/ProductInterfaces';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

export const ProductCard = ({ product }: ProductProps): JSX.Element => 
    <div className="col-lg-3">
    <Card className="product-card" key={product.id}>
      <CardImg top width="100%" src={product.imageUrl} alt="product image" />
      <CardBody>
        <CardTitle tag="h5">{product.name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">Quantity in Stock: {product.quantity_In_Stock}</CardSubtitle>
        <CardText clasName="product-description">{`${product.description.substring(0,100)}...`}</CardText>
        <CardSubtitle>{`$${product.price}`}</CardSubtitle>
        <Button>Add To Cart</Button>
      </CardBody>
    </Card>
  </div>
