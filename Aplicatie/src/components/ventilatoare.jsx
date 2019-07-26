import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import axios from "axios";

const API_URL = "http://localhost:3000";
class Controlventilatoare extends Component {
  state = {
    controlVentilatoare: []
  };
  async componentDidMount() {
    this.getData();
    setInterval(this.getData, 1000);
  }
  getData = () => {
    const url = `${API_URL}/ventilatoare/5d109639d5323c26b86cb08f`;
    axios
      .get(url)
      .then(response => response.data)
      .then(data => {
        this.setState({ controlVentilatoare: data });
        console.log(this.state.controlVentilatoare);
      });
  };
  textButon = stare => {
    let text = "";
    text += stare === 1 ? "On" : "Off";
    return text;
  };
  buttonStyle = stare => {
    let classes = "";

    classes += stare === 1 ? "primary" : "secondary";
    return classes;
  };
  update(id, stare) {
    let stare_noua = 0;
    stare_noua = stare === 1 ? 0 : 1;
    let item = {
      stare: stare_noua
    };
    axios
      .put(`${API_URL}/ventilatoare/${id}`, item)
      .then(res => console.log(res.data));
  }
  render() {
    return (
      <div>
        <Card>
          <Card.Header as="h5">Control ventilatoare</Card.Header>
          <Card.Body>
            <Button
              variant={this.buttonStyle(this.state.controlVentilatoare.stare)}
              onClick={() =>
                this.update(
                  this.state.controlVentilatoare._id,
                  this.state.controlVentilatoare.stare
                )
              }
            >
              {this.textButon(this.state.controlVentilatoare.stare)}
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Controlventilatoare;
