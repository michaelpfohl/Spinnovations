import { ProductProps } from '../../Helpers/Interfaces/ProductInterfaces';

export const ProductCard = ({ product }: ProductProps): JSX.Element => 
    <div className="product-card" key={product.id}>
        <img src={product.imageUrl}/>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
        <h3>Quantity In Stock: {product.quantity_In_Stock}</h3>
    </div>
