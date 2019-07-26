import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import axios from "axios";

const API_URL = "http://localhost:3000";
class Controlgaraj extends Component {
  state = { stareGaraj: [] };
  async componentDidMount() {
    this.getData();
    setInterval(this.getData, 1000);
  }
  getData = () => {
    const url = `${API_URL}/garaj/5d20a4ada2838d243070c56c`;
    axios
      .get(url)
      .then(response => response.data)
      .then(data => {
        this.setState({ stareGaraj: data });
        console.log(this.state.stareGaraj);
      });
  };
  textButon = stare => {
    let text = "";
    text += stare === 1 ? "Deschisa" : "Inchisa";
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
      stare: stare_noua,
      stare_actiune: 1
    };
    axios
      .put(`${API_URL}/garaj/${id}`, item)
      .then(res => console.log(res.data));
  }
  render() {
    return (
      <div>
        {" "}
        <Card>
          <Card.Header>Actionare usa garaj</Card.Header>
          <Card.Body>
            <Button
              variant={this.buttonStyle(this.state.stareGaraj.stare)}
              onClick={() =>
                this.update(
                  this.state.stareGaraj._id,
                  this.state.stareGaraj.stare
                )
              }
            >
              {this.textButon(this.state.stareGaraj.stare)}
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Controlgaraj;
