import Iframe from "react-iframe";
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import NavBar from "./navbar";
import axios from "axios";
const API_URL = "http://localhost:3000";
class Securitate extends Component {
  state = {
    stareArmare: []
  };
  async componentDidMount() {
    this.getData();
    setInterval(this.getData, 1000);
  }
  getData = () => {
    const url = `${API_URL}/armare/5d20ab64f89493171048bee9`;
    axios
      .get(url)
      .then(response => response.data)
      .then(data => {
        this.setState({ stareArmare: data });
        console.log(this.state.stareArmare.stare);
      });
  };
  buttonStyle = stare => {
    let style = "";
    style = stare === 0 ? "danger" : "success";
    return style;
  };
  buttonText = stare => {
    let text = "";
    text = stare === 0 ? "Armeaza" : "Dezarmeaza";
    return text;
  };
  updateStare = stare => {
    let valoare = stare === 1 ? 0 : 1;
    let item = {
      stare: valoare
    };
    axios
      .put(`${API_URL}/armare/5d20ab64f89493171048bee9`, item)
      .then(res => console.log(res.data));
  };
  
  render() {
    return (
      <div>
        <NavBar />
        <br />
        <Card>
          <Card.Header>Armare casa</Card.Header>
          <Card.Body>
            <Card.Title>
              In cazul in care nu este nimeni acasa poti arma casa pentru a
              detecta orice miscare
            </Card.Title>

            <Button
              variant={this.buttonStyle(this.state.stareArmare.stare)}
              onClick={()=>this.updateStare(this.state.stareArmare.stare)}
            >
              {this.buttonText(this.state.stareArmare.stare)}
            </Button>
          </Card.Body>
        </Card>
        <br />
        <Iframe
          url="http://www.youtube.com/embed/xDMP3i36naA"
          width="1280px"
          height="450px"
          id="myId"
          className="myClassname"
          display="block"
          position="relative"
        />
      </div>
    );
  }
}

export default Securitate;
