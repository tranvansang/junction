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
import { Header } from "customComponents/HeaderFooter";
import flatten from "lib/flatten";

import { withFirebase } from "customComponents/Firebase";

import cardsStyle from "assets/jss/material-kit-react/views/componentsSections/sectionCards";

import { container, title } from "assets/jss/material-kit-react";

const style = theme => ({
  ...cardsStyle,
  img: {
    width: "50px",
    height: "50px",
    border: "solid 1px #e91e63"
  },
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    }
  },
  chatContainer: {
    padding: "13vh 0 15px 15px",
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    },
    backgroundColor: "white",
    minHeight: "90vh"
  }
});

export class ChatterPage extends Component {
  state = {
    conversations: [
      {
        key: "conversation 1 key",
        payload: "first conversation",
        is_bot: false,
        bot: {
          name: "bot name 1",
          photo_url: "https://robohash.org/bot.png"
        }
      },
      {
        key: "conversation 2 key",
        payload: "second conversation",
        is_bot: true,
        bot: {
          name: "bot name 2",
          photo_url: "https://robohash.org/bot.png"
        }
      },
      {
        key: "conversation 3 key",
        payload: "3 conversation",
        is_bot: false,
        bot: {
          name: "bot name 3",
          photo_url: "https://robohash.org/bot.png"
        }
      },
      {
        key: "conversation 4 key",
        payload: "4 conversation",
        is_bot: true,
        bot: {
          name: "bot name 4",
          photo_url: "https://robohash.org/bot.png"
        }
      }
    ]
  };
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
    const { classes } = this.props;
    const randomValue = Math.random();
    return (
      <div>
        <h1>ChatterPage</h1>
        <div id="test">{JSON.stringify(this.state)}</div>
      </div>
    );
  }
}

export default withFirebase(ChatterPage);
