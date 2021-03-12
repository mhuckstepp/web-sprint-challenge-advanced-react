import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor(props) {
    super(props);
    this.state = { plants: [], plantSearch: [] };
  }

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants
  componentDidMount() {
    axios.get(`http://localhost:3333/plants`).then((res) => {
      this.setState({ ...this.state, plants: res.data });
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.searchInp &&
      prevProps.searchInp &&
      this.props.searchInp.length > prevProps.searchInp.length
    ) {
      this.setState({
        ...this.state,
        plantSearch: this.state.plants.filter((p) =>
          p.name.toLowerCase().includes(this.props.searchInp)
        ),
      });
    } else if (!this.props.searchInp && prevProps.searchInp) {
      this.setState({
        ...this.state,
        plantSearch: this.state.plants,
      });
    }
  }

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      <main className="plant-list">
        {this.state.plantSearch.length > 0
          ? this.state.plantSearch.map((plant) => (
              <div
                className="plant-card"
                key={plant.id}
                data-testid="plant-card"
              >
                <img className="plant-image" src={plant.img} alt={plant.name} />
                <div className="plant-details">
                  <h2 className="plant-name">{plant.name}</h2>
                  <p className="plant-scientific-name">
                    {plant.scientificName}
                  </p>
                  <p>{plant.description}</p>
                  <div className="plant-bottom-row">
                    <p>${plant.price}</p>
                    <p>☀️ {plant.light}</p>
                    <p>💦 {plant.watering}x/month</p>
                  </div>
                  <button
                    className="plant-button"
                    onClick={() => this.props.addToCart(plant)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))
          : this.state.plants.map((plant) => (
              <div
                className="plant-card"
                key={plant.id}
                data-testid="plant-card"
              >
                <img className="plant-image" src={plant.img} alt={plant.name} />
                <div className="plant-details">
                  <h2 className="plant-name">{plant.name}</h2>
                  <p className="plant-scientific-name">
                    {plant.scientificName}
                  </p>
                  <p>{plant.description}</p>
                  <div className="plant-bottom-row">
                    <p>${plant.price}</p>
                    <p>☀️ {plant.light}</p>
                    <p>💦 {plant.watering}x/month</p>
                  </div>
                  <button
                    className="plant-button"
                    onClick={() => this.props.addToCart(plant)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
      </main>
    );
  }
}
