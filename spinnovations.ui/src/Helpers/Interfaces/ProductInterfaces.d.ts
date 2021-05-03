declare module 'ProductTypes' {
    interface Product {
        id: number;
        name: string;
        imageUrl: string;
        description: string;
        category_Id: number;
        price: number;
        creator_Id: number;
        quantity_In_Stock: number;
    }
    interface ProductProps {
        product: Product,
        location: RouteComponentProps["location"];
    }
}

export { Product, ProductProps }
