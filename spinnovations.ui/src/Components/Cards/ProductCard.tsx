import { Product } from '../../Helpers/Interfaces/ProductInterface';

export const ProductCard = ({ id, name, imageUrl, description, price, quantity_In_Stock }: Product): JSX.Element => 
    <div className="product-card" key={id}>
        <img src={imageUrl}/>
        <h1>{name}</h1>
        <p>{description}</p>
        <h3>${price}</h3>
        <h3>Quantity In Stock: {quantity_In_Stock}</h3>
    </div>
