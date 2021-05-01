import React, { Component } from 'react';
import { User } from '../Helpers/Interfaces/UserInterfaces';
import ProductForm from '../Components/Forms/ProductForm';

type AddProductProps = {
    user: User;
}

class AddProduct extends Component<AddProductProps> {

    render(): JSX.Element {
        const { user } = this.props;
        return (
            <>
              <ProductForm user={user}/>
            </>
        )
    }
}

export default AddProduct;
