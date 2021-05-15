import React from "react";
import { Product } from "../../Helpers/Interfaces/ProductInterfaces";

// import "./index.scss";

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
      //   if (this.props.onSelectItem) {
      //     this.props.onSelectItem(selectedItem);
      //   }
      this.setState({ selectedItem });
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 500);
    }
  }

  render(): JSX.Element {
    const { selectedItem } = this.state;
    const { products } = this.props;

    const assignColors = (products: Product[]): JSX.Element[] => {
      const wheelItems: JSX.Element[] = [];
      let counter = 0;
      products?.forEach((product, index) => {
        counter++;
        const style = { "--item-nb": index } as React.CSSProperties;
        if (counter >= 8) counter = 1;
        wheelItems.push(
          <div
            className={`wheel-item`}
            key={index}
            style={style}
          >
            <span className={`wheel-item-dot color-text-${counter}`}>•</span> {product.name} <span className={`wheel-item-dot color-text-${counter}`}>•</span>
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
