declare module 'ProductCategoryTypes' {
    interface ProductCategory {
        name: string;
    }

    interface ProductCategoryProps {
        productCategory: ProductCategory;
        filter: any;
    }
}

export { ProductCategory, ProductCategoryProps }
