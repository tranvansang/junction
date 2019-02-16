import React, { Component } from "react";
import cn from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "@material-ui/core/Button";

import classes from "./style.css";

class MessageInput extends Component {
  async handleEnter(e) {
    var message = this.refs.input.value.trim();

    this.refs.input.value = "";
  }

  componentWillReceiveProps(nextProps) {
    var input = this.refs.input;

    input.value = "";
  }

  render() {
    return (
      <div className={cn(classes.container)}>
        <GridContainer
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlight: "center"
          }}
        >
          <GridItem sm={8} md={8}>
            <CustomInput
              labelText="Send a message"
              id="input"
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem sm={2} md={2}>
            <Button>Send</Button>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default MessageInput;
