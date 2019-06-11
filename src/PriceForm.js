import React from "react";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = { pickupAddress: "", price: "", result: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();

    return fetch("http://localhost:9090/book", {
      method: "POST",
      body: JSON.stringify({
        pickupAddress: this.state.pickupAddress,
        price: this.state.price
      }),
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    })
      .then(response => response.json())
      .then(json => {
        return this.setState({ result: true });
      });
  }
  handleAddress(event) {
    this.setState({ pickupAddress: event.target.value });

    return fetch("http://localhost:9090/price", {
      method: "POST",
      body: JSON.stringify({ pickupAddress: this.state.pickupAddress }),
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    })
      .then(response => response.json())
      .then(json => {
        return this.setState({ price: json.price });
      });
  }

  render() {
    if (this.state.result) {
      return (
        <div>
          <h1>Booking is completed</h1>
          <p>Server returns {this.state.result}</p>
        </div>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Pickup address:
            <input
              type="text"
              value={this.state.pickupAddress}
              onChange={this.handleAddress}
            />
          </label>

          <h1>{this.state.price ? `Price is ${this.state.price}` : ""}</h1>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
}
