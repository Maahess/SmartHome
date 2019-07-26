import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import NavBar from "./navbar";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Controlgaraj from "./garaj";
import Controlventilatoare from "./ventilatoare";
const API_URL = "http://localhost:3000";

class Lumina extends Component {
  state = {
    users: []
  };
  async componentDidMount() {
    this.getData();
    setInterval(this.getData, 1000);
  }
  getData = () => {
    const url = `${API_URL}/lumini/`;
    axios
      .get(url)
      .then(response => response.data)
      .then(data => {
        this.setState({ users: data });
        console.log(this.state.users);
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
  updateLumini(id, stare) {
    let stare_noua = 0;
    stare_noua = stare === 1 ? 0 : 1;
    let item = {
      stare: stare_noua
    };
    axios
      .put(`${API_URL}/lumini/${id}`, item)
      .then(res => console.log(res.data));
  }



  render() {
    return (
      <div>
        <NavBar />
        <br />
        <div className="container">
          <div className="row">
            {this.state.users.map(user => (
              <div key={user._id} className="col-md-4 col-sm-6 col-xs-6">
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>
                      Control lumina {user.locatie_lumina}
                    </Card.Title>

                    <Button
                      onClick={() => this.updateLumini(user._id, user.stare)}
                      variant={this.buttonStyle(user.stare)}
                    >
                      {this.textButon(user.stare)}
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <br />
        <Controlgaraj />
        <br />
        <Controlventilatoare />
      </div>
    );
  }
}
export default Lumina;
