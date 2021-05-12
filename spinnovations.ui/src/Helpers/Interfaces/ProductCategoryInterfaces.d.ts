declare module 'ProductCategoryTypes' {
    interface ProductCategory {
        name: string;
    }

    type CategoryTotals = {
        name: string;
        total: number;
    }
    interface ProductCategoryProps {
        productCategory: ProductCategory;
        filter: () => void;
        all: () => void;
    }
}

export { ProductCategory, ProductCategoryProps, CategoryTotals }
