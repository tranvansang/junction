import React, { Component } from "react";
import { compose } from "recompose";
import cn from "classnames";
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
import { Header } from "customComponents/HeaderFooter";
import MessageInput from "customComponents/MessageInput/MessageInput";

import { withFirebase } from "customComponents/Firebase";

import cardsStyle from "assets/jss/material-kit-react/views/componentsSections/sectionCards";

import "./conversationPageStyles.sass";

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

export class ConversationPage extends Component {
  state = {
    bot: {
      name: "bot 1 name",
      photo_url: "https://robohash.org/bot"
    },
    chatter: {
      name: "chatter 1 name",
      photo_url: ""
    },
    messages: [
      {
        key: "message 1 key",
        payload: "first message",
        is_bot: false,
        createdAt: new Date(2019, 1, 1, 10, 0)
      },
      {
        key: "message 2 key",
        payload: "a response from bot",
        is_bot: true,
        createdAt: new Date(2019, 1, 1, 10, 5)
      }
    ]
  };
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const randomValue = Math.random();
    return (
      <div>
        <Header color="rose" />
        <div className={classes.chatContainer}>
          <h1>{this.state.bot.name}</h1>
          <div>
            {this.state.messages.map(message => {
              if (!message.is_bot) {
                return (
                  <Card plain>
                    <CardBody>
                      <GridContainer>
                        <GridItem sm={11} md={11} lg={11}>
                          <span style={{ textAlign: "right" }}>
                            <div className={classes.cardTitle}>
                              {this.state.bot.name}
                            </div>
                            <h4>{message.payload}</h4>
                          </span>
                        </GridItem>
                        <GridItem
                          sm={1}
                          md={1}
                          lg={1}
                          style={{ textAlign: "left" }}
                        >
                          <img
                            src={`https://robohash.org/${randomValue}.png`}
                            alt="robot"
                            className={cn(classes.img, classes.avatar)}
                          />
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                );
              } else {
                return (
                  <Card plain>
                    <CardBody>
                      <GridContainer>
                        <GridItem
                          sm={1}
                          md={1}
                          lg={1}
                          style={{ textAlign: "right" }}
                        >
                          <img
                            src={`https://robohash.org/${randomValue}.png`}
                            alt="robot"
                            className={cn(classes.img, classes.avatar)}
                          />
                        </GridItem>
                        <GridItem sm={11} md={11} lg={11}>
                          <span>
                            <div className={classes.cardTitle}>
                              {this.state.bot.name}
                            </div>
                            <h4>{message.payload}</h4>
                          </span>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                );
              }
            })}
          </div>
        </div>
        <MessageInput />
      </div>
    );
  }
}

export default compose(
  withFirebase,
  withStyles(style)
)(ConversationPage);
