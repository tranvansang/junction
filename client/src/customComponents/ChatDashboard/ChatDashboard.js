import React, { Component } from "react";
import cn from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";

import avatar from "assets/img/client/sergei-square.jpg";

import cardsStyle from "assets/jss/material-kit-react/views/componentsSections/sectionCards";

import "./styles/chatDashboardStyles.sass";

const style = {
  ...cardsStyle,
  img: {
    marginTop: "15px",
    marginRight: "20px",
    width: "50px",
    height: "50px",
    border: "solid 1px #e91e63"
  }
};

// import { getUserAvatar } from "../reducers/user";
// import {
//   getConversationImg,
//   getConversationTitle
// } from "../actions/conversation";

class ChatDashboard extends Component {
  navigateToChat = conversationId => () =>
    this.props.history.push(`/chat/${conversationId}`);

  componentDidMount() {
    // this.loadData();
  }
  loadData() {
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
  }
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
        <h1 className="chat-dashboard-title">Chat box</h1>
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
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(ChatDashboard);
