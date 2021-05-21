import React from "react";
import { Product } from "../../Helpers/Interfaces/ProductInterfaces";

type WheelProps = {
  products: Product[];
  callback: (item: string) => void;
};

type WheelState = {
  selectedItem: Product | null;
  spun: boolean;
  categoryPrice: number;
};

export default class Wheel extends React.Component<WheelProps, WheelState> {
  constructor(props: WheelProps) {
    super(props);
    this.state = {
      selectedItem: null,
      spun: false,
      categoryPrice: 0,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem(): void {
    this.setState({ spun: false })
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
    products[selectedItem].price = 0;
    if (localStorage.getItem(`${products[selectedItem].name} (spin)`)) {
      const storageItem = JSON.parse(localStorage.getItem(`${products[selectedItem].name} (spin)`) || "");
      products[selectedItem].quantity = storageItem?.quantity;
    }
    if (products[selectedItem].quantity == null){
      products[selectedItem].quantity = 1;
    } else {
      products[selectedItem].quantity++;
    }
    localStorage.setItem(`${products[selectedItem].name} (spin)`, JSON.stringify(products[selectedItem]))
    setTimeout(() => {
      this.setState({ spun: true })
      this.props.callback(products[selectedItem].name)
    } , 4500);
  }

  render(): JSX.Element {
    const { selectedItem, spun } = this.state;
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
      <div>
        <div className="wheel-container mt-5">
          <div
            className={`wheel ${spinning}`}
            style={wheelVars}
            onClick={this.selectItem}
          >
            {assignColors(products)}
          </div>
        </div>
      </div>
    );
  }
}
