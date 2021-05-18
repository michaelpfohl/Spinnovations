import React from "react";
import { Product } from "../../Helpers/Interfaces/ProductInterfaces";

type WheelProps = {
  products: Product[];
};

type WheelState = {
  selectedItem: Product | null;
};

export default class Wheel extends React.Component<WheelProps, WheelState> {
  constructor(props: WheelProps) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem(): void {
    if (this.state.selectedItem === null) {
      const selectedItem = Math.floor(
        Math.random() * this.props.products.length
      );
      this.setState({ selectedItem });
      this.placeOrder(selectedItem);
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 500);
    }
  }

  placeOrder = (selectedItem: number): void => {
    const { products } = this.props;
    console.log(products[selectedItem]);
    products[selectedItem].price = 0;
    products[selectedItem].quantity = 2;
    localStorage.setItem(products[selectedItem].name, JSON.stringify(products[selectedItem]))
  }

  render(): JSX.Element {
    const { selectedItem } = this.state;
    const { products } = this.props;

    const assignColors = (products: Product[]): JSX.Element[] => {
      const wheelItems: JSX.Element[] = [];
      products?.forEach((product, index) => {
        const style = { "--item-nb": index } as React.CSSProperties;
        wheelItems.push(
          <div
            className={`wheel-item`}
            key={index}
            style={style}
          >
            {product.name}
          </div>
        );
      });
      return wheelItems;
    };

    const wheelVars = {
      "--nb-item": products.length,
      "--selected-item": selectedItem,
    } as React.CSSProperties;

    const spinning = selectedItem !== null ? "spinning" : "";

    return (
      <div className="wheel-container">
        <div
          className={`wheel ${spinning}`}
          style={wheelVars}
          onClick={this.selectItem}
        >
          {assignColors(products)}
        </div>
      </div>
    );
  }
}
