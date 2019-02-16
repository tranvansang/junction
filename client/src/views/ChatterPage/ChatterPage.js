import React, { Component } from "react";
import { compose } from "recompose";
// react components for routing our app without refresh
import { Link, withRouter } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import Parallax from "components/Parallax/Parallax";
import flatten from "lib/flatten";

import { withFirebase } from "customComponents/Firebase";

export class ChatterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      photo_url: "",
      conversations: {}
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    this.loadData();
  }

  loadData = () => {
    const { firebase } = this.props;
    const { chatter_id } = this.props.match.params;
    firebase.getChatter(chatter_id).then(chatter => {
      const { name, photo_url } = chatter;
      this.setState({ name, photo_url });
    });
  };

  render() {
    const { name, photo_url } = this.state;
    return (
      <div>
        <h1>ChatterPage</h1>
        <div id="test">{JSON.stringify(this.state)}</div>
      </div>
    );
  }
}

export default withFirebase(ChatterPage);
