import { Component } from "react";
import productData from "../Helpers/Data/ProductData";
import { Product } from "../Helpers/Interfaces/ProductInterfaces";
import { User } from "../Helpers/Interfaces/UserInterfaces";
import { SellerProps } from "../Helpers/Interfaces/SellerInterfaces";
import userData from "../Helpers/Data/userData";
import { ProductCard } from "../Components/Cards/ProductCard";

type SingleSellerState = {
  products: Product[];
  creatorId: number;
  user: User;
  added: boolean,
  productName: string,
};

class SingleSeller extends Component<SellerProps, SingleSellerState> {
  state: SingleSellerState = {
    products: [],
    creatorId: Number(this.props.match.params.id.substring(1)),
    user: null,
    added: false,
    productName: "",
  };

  componentDidMount(): void {
    productData
      .getProductsByUserId(this.state.creatorId)
      .then((response: Product[]) => {
        this.setState({
          products: response,
        });
      });

    userData.getUserById(this.state.creatorId).then((response: User) => {
      this.setState({
        user: response,
      });
    });
  }

  cartAlert = (productName: string): void => {
    this.setState({ added: true, productName: productName });
    setTimeout(() => this.setState({ added: false }), 3000);
  };

  render(): JSX.Element {
    const { products, user, added, productName } = this.state;
    const productCard = (product: Product, color: number): JSX.Element => {
      return <ProductCard product={product} key={product.id} color={color} cartAlert={this.cartAlert}/>;
    };

    const assignColors = (products: Product[]) => {
      const cards: Product[] = [];
      let counter = 0;
      products?.forEach((product) => {
        counter++;
        if (counter >= 8) counter = 1;
        cards.push(productCard(product, counter));
      });
      return cards;
    };
    let cards: Product[] = [];
    if (products?.length) {
      cards = assignColors(products);
    }

    return (
      <div>
        <div className="shop-name-bar d-flex justify-content-center align-items-center">
          <h1>{user?.display_Name}'s Spinnovations</h1>
        </div>
        {added && (
          <div
            className="alert alert-success alert-dismissible fade show mb-4"
            role="alert"
          >
            <strong>{productName} added to cart!</strong> Visit the cart page to
            check out!
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => this.setState({ added: false })}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <div className="d-flex flex-wrap justify-content-around mt-5">
          {cards}
        </div>
      </div>
    );
  }
}

export default SingleSeller;
