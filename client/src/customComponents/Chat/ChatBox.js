import React, { Component } from "react";

export class ChatBox extends Component {
  comopnentDidMount() {
    const { converstationId } = this.props;
    firebase.on("...firebase...<source id>", snapshot => {
      const msg = snapshot.val();
      // new message
      this.setState();
    });
  }
  componentWillUnmount() {
    const { converstationId } = this.props;
    firebase.off("....");
  }
  render() {
    return this.state.messages.map(message => <Message />);
  }
}

export default ChatBox;
