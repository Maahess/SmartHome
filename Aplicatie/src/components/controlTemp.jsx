import React, { Component } from "react";

import NavBar from "./navbar";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
const API_URL = "http://localhost:3000";
class controlTemperatura extends Component {
  state = {
    dataSenzorDht: [],
    dataSenzorPraf: [],
    dataSenzorGaz: []
  };
  async componentDidMount() {
    this.getData();
    setInterval(this.getData, 5000);
  }
  getData = () => {
    let url = `${API_URL}/dht/5d109bad651c972328428cc5`;
    axios
      .get(url)
      .then(response => response.data)
      .then(data => {
        this.setState({ dataSenzorDht: data });
      });
    url = `${API_URL}/praf/5d237d3c5435851ee828ecc8`;
    axios
      .get(url)
      .then(response => response.data)
      .then(data => {
        this.setState({ dataSenzorPraf: data });
      });
    url = `${API_URL}/co/5d236ecfdf7e9a1c483d895b`;
    axios
      .get(url)
      .then(response => response.data)
      .then(data => {
        this.setState({ dataSenzorGaz: data });
      });
  };
  render() {
    return (
      <div>
        <NavBar />
        <br />
        <Card>
          <Card.Header>
            <h3>
              <Badge variant="success">Temperatura si umiditate afara</Badge>
            </h3>
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <h4>
                Temperatura:{" "}
                <Badge variant="primary">
                  {this.state.dataSenzorDht.temperatura}
                </Badge>
              </h4>
              <h4>
                Umiditate afara{" "}
                <Badge variant="primary">
                  {this.state.dataSenzorDht.umiditate}
                </Badge>
              </h4>
            </blockquote>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Header>
            <h3>
              <Badge variant="success">Temperatura si umiditate casa</Badge>
            </h3>
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <h4>
                Temperatura:{" "}
                <Badge variant="primary">
                  {this.state.dataSenzorDht.temperatura}
                </Badge>
              </h4>
              <h4>
                Umiditate afara{" "}
                <Badge variant="primary">
                  {this.state.dataSenzorDht.umiditate}
                </Badge>
              </h4>
            </blockquote>
          </Card.Body>
        </Card>
        <br />
        <Card>
          <Card.Header>
            <h3>
              <Badge variant="success">
                Nivelul de CO2 si particule de praf
              </Badge>
            </h3>
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <h4>
                CO2:{" "}
                <Badge variant="primary">
                  {this.state.dataSenzorGaz.cantitate_co}
                </Badge>
              </h4>
              <h4>
                Praf{" "}
                <Badge variant="primary">
                  {this.state.dataSenzorPraf.cantitate_praf}
                </Badge>
              </h4>
            </blockquote>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default controlTemperatura;
