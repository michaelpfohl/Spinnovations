declare module 'ProductCategoryTypes' {
    interface ProductCategory {
        name: string;
    }

    interface ProductCategoryProps {
        productCategory: ProductCategory;
        filter: () => void;
        all: () => void;
    }
}

export { ProductCategory, ProductCategoryProps }
