import React from "react";
import Lumina from "./components/lumina";
import NavBar from "./components/navbar";
import Securitate from "./components/securitate";
import controlTemperatura from "./components/controlTemp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/lumini" component={Lumina} />
          <Route path="/securitate" component={Securitate} />
          <Route path="/temperatura" component={controlTemperatura} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
