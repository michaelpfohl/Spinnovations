declare module 'ProductCategoryTypes' {
    interface ProductCategory {
        name: string;
    }

    interface ProductCategoryProps {
        productCategory: ProductCategory;
    }
}

export { ProductCategory, ProductCategoryProps }
