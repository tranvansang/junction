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

export class ConversationPage extends Component {
  state = {
    bot: {
      name: 'bot 1 name',
    },
    chatter: {
      name: 'chatter 1 name'
    },
    messages: [
      {
        key: 'message 1 key',
        payload: 'first message',
        is_bot: false,
        createdAt: new Date(2019, 1, 1, 10, 0)
      },
      {
        key: 'message 2 key',
        payload: 'a response from bot',
        is_bot: true,
        createdAt: new Date(2019, 1, 1, 10, 5)
      },
    ]
  }
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

  loadData = async () => {
    const { firebase } = this.props;
    const { chatter_id, conversation_id } = this.props.match.params;
    await firebase.getChatter(chatter_id).then(chatter => {
      const { name, photo_url } = chatter;
      this.setState({ name, photo_url });

      await firebase.getConversation(conversation_id).then(conversation => {

      })
    })

  };

  render() {
    const { name, photo_url } = this.state;
    return (
      <div>
        <h1>ConversationPage</h1>
        List of message
        {
          this.state.messages.map(message => <div key={message.key}>
            {message.payload}
          </div>)
        }
      </div>
    );
  }
}

export default ConversationPage;
