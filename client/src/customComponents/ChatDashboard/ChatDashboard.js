import React, { Component } from "react";
import { compose } from "recompose";
import cn from "classnames";
// react components for routing our app without refresh
import { Link, withRouter } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";

import { withFirebase } from "customComponents/Firebase";

import cardsStyle from "assets/jss/material-kit-react/views/componentsSections/sectionCards";

import "./styles/chatDashboardStyles.sass";

const style = {
  ...cardsStyle,
  imgRight: {
    marginTop: "15px",
    marginRight: "20px",
    width: "50px",
    height: "50px",
    border: "solid 1px #e91e63"
  },
  imgLeft: {
    marginTop: "15px",
    marginLeft: "20px",
    width: "50px",
    height: "50px",
    border: "solid 1px #e91e63"
  }
};

class ChatDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      photo_url: "",
      conversations: {},
      lastMessages: {}
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    this.loadData();
  }

  navigateToChat = conversation_id => () =>
    this.props.history.push(`/chat/${conversation_id}`);

  loadData = () => {
    const { firebase, chatter_id } = this.props;
    firebase.getChatter(chatter_id).then(chatter => {
      const { name, photo_url, conversations } = chatter;
      this.setState({ name, photo_url, conversations });

      for ([conversation_id, val] in conversations) {
        console.log(conversation_id);
        firebase.getLastMessage(conversation_id).then();
      }
    });

    const {
      users,
      chatList,
      loadUser
      // user: { uid }
    } = this.props;
    chatList.forEach(({ info }) =>
      (info.users || []).forEach(u => {
        if (!users[u]) loadUser(u);
      })
    );
    chatList.forEach(co => {
      if (
        co.info.last_message &&
        co.info.last_message.user &&
        !users[co.info.last_message.user]
      )
        loadUser(co.info.last_message.user);
    });
  };
  componentDidUpdate() {
    // this.loadData();
  }
  render() {
    const {
      users,
      chatList,
      loadUser,
      classes
      // user: { uid }
    } = this.props;
    return (
      <div className="chat-dashboard">
        <h1 className="chat-dashboard-title">Chats</h1>
        <div className="chat-list">
          <Card plain>
            <CardBody>
              <div key={"1234"} className="chat-list-item g-pointer">
                <img
                  // src={getConversationImg(partner_users, uid, users)}
                  src={`https://robohash.org/${Math.random()}.png`}
                  alt="robot"
                  className={cn(classes.img, classes.avatar)}
                />
                <span>
                  <div className={classes.cardTitle}>
                    Chat Name
                    {/* {getConversationTitle(partner_users, uid, users)} */}
                  </div>
                  <h4>Chat Message</h4>
                </span>
                <br />
                <hr />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default compose(
  withFirebase,
  withStyles(style)
)(ChatDashboard);
