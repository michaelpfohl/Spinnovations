import React from "react";
import ReactDOM from "react-dom";

import Wheel from "../Components/Wheel";

import '../styles/_wheel.scss';

type SpinState = {
    places: string[]
  }

export class Spin extends React.Component {

    state: SpinState = {
        places: [
            "Cookies",
            "Pizzas",
            "Sandwiches",
            "Salads",
            "Soup",
            "Japanese food",
            "Pastas"
          ]
    }

    render(): JSX.Element {
        return (
        <div className="App">
            <h1>What should you eat today?</h1>
            <Wheel items={this.state.places} />
        </div>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Spin />, rootElement);

export default Spin;