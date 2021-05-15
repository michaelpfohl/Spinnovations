import React from 'react';

import { WheelProps } from '../../Helpers/Interfaces/WheelInterfaces';

import '../../styles/_wheel.scss';

type WheelState = {
    selectedItem: string | null,
  }

export default class Wheel extends React.Component<WheelProps> {
  constructor(props: WheelProps) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.selectItem = this.selectItem.bind(this);
  }

    state: WheelState = {
        selectedItem: null,
    }

    selectItem(): void {
        if (this.state.selectedItem === null) {
        const selectedItem = Math.floor(Math.random() * this.props.items.length);
        if (this.props.onSelectItem) {
            this.props.onSelectItem(selectedItem);
        }
        this.setState({ selectedItem });
        } else {
        this.setState({ selectedItem: null });
        setTimeout(this.selectItem, 500);
        }
    }

    render(): JSX.Element {
        const { selectedItem } = this.state;
        const { items } = this.props;

        const wheelVars = {
        '--nb-item': items.length,
        '--selected-item': selectedItem,
        } as React.CSSProperties;


        const spinning = selectedItem !== null ? 'spinning' : '';

        return (
        <div className="wheel-container">
            <div className={`wheel ${spinning}`} style={wheelVars} onClick={this.selectItem}>
            {items.map((item: string, index: number) => {
                const style = {'--item-nb': index} as React.CSSProperties;
                return (
                <div className="wheel-item" key={index} style={style}>
                {item}
                </div>
                )}
            )}
            </div>
        </div>
        );
    }
}
