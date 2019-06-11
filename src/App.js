import React from "react";
import PriceForm from "./PriceForm.js";

import "./style.scss";

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <PriceForm></PriceForm>
      </div>
    );
  }
}
