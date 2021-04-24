import { ProductCategory, ProductCategoryProps } from '../Helpers/Interfaces/ProductCategoryInterfaces';

export const ProductCategoryBar = ({categories}: ProductCategoryProps): JSX.Element => {
        const categoryCircle = (category: ProductCategory): JSX.Element => {  
            return (
                <div key={category.id}>
                    <p>{category.name}</p>
                </div>
            )
        }
        const circles = categories.map(categoryCircle);
        return(
            <>
                {circles}
            </>
        )
}
