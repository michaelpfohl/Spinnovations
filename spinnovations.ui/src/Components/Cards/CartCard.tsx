import { ProductProps } from "../../Helpers/Interfaces/ProductInterfaces";

export const CartCard = ({ product }: ProductProps ): JSX.Element => (
  <tr>
      <th scope="row"><img src={product.imageUrl}></img></th>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td><input id='quantity' type='number' min='1' max={product.quantity_In_Stock} placeholder='1'/></td>
      <td>{product.price}</td>
    </tr>
)


