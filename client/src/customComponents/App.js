import React, { Component } from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
// core components
import { Header, Footer } from "customComponents/HeaderFooter";
import LandingPage from "views/LandingPage/LandingPage";

import indexRoutes from "routes/index";

var hist = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }
  render() {
    return (
      <Router history={hist}>
        <div>
          <Header color="transparent" />
          <Switch>
            <Route exact path="/" key="LandingPage" component={LandingPage} />
            {indexRoutes.map((prop, key) => {
              return (
                <Route path={prop.path} key={key} component={prop.component} />
              );
            })}
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
