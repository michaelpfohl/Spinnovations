import { Component } from 'react';
import productData from '../Helpers/Data/ProductData';
import { Product } from '../Helpers/Interfaces/ProductInterfaces';
import { User } from '../Helpers/Interfaces/UserInterfaces';
import { SellerProps } from '../Helpers/Interfaces/SellerInterfaces';
import userData from '../Helpers/Data/userData';
import { ProductCard } from '../Components/Cards/ProductCard';

type SingleSellerState = {
  products: Product[];
  creatorId: number;
  user: User;
}

class SingleSeller extends Component<SellerProps, SingleSellerState> {

  state : SingleSellerState = {
    products: [],
    creatorId: this.props.match.params.id,
    user: null,
  }

  componentDidMount(): void {
    productData.getProductsByUserId(this.state.creatorId).then((response: Product[]) => {
        this.setState({
            products: response,
        })
    });

    userData.getUserById(this.state.creatorId).then((response: User) => {
        this.setState({
            user: response,
        })
    });
  }

  render(): JSX.Element {
    const { products, user } = this.state
    const productCard = (product: Product): JSX.Element => {
        return (<ProductCard product={product}/>)
    }

    const cards = products?.map(productCard);

    return (
        <div>
            <h1>{user?.display_Name}'s Spinnovations</h1>
            <div className="container d-flex flex-wrap justify-content-around">
                {cards}
            </div>
        </div>
    );
  }
}

export default SingleSeller;
