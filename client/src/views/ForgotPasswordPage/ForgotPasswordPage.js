import React, { Component } from "react";
import { compose } from "recompose";
// react components for routing our app without refresh
import { Link, withRouter } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CustomInput from "components/CustomInput/CustomInput";
import Parallax from "components/Parallax/Parallax";

import { withFirebase } from "customComponents/Firebase";

import ForgotPasswordPageStyle from "assets/jss/material-kit-react/views/signInPageStyle";

class ForgotPasswordPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Parallax image={require("assets/img/client/bg.jpg")} filter="dark">
          <div className={classes.container}>
            <GridContainer justify="center" style={{ padding: "250px 0 0 0" }}>
              <GridItem xs={12} sm={10} md={6}>
                <ResetPasswordForm classes={classes} />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
      </div>
    );
  }
}

class ResetPasswordFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      error: null
    };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .sendPasswordResetEmail(email)
      .then(() => {
        this.setState({
          email: "",
          error: null
        });
        this.props.history.push("/signin");
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { email, error } = this.state;
    return (
      <Card>
        <form className={classes.form}>
          <CardHeader color="primary" signup className={classes.cardHeader}>
            <h3 className={classes.cardTitle}>Reset password</h3>
          </CardHeader>
          <CardBody signup>
            <CustomInput
              id="email"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                placeholder: "Email...",
                type: "email",
                suggested: "email",
                onChange: this.onChange,
                name: "email",
                value: email,
                startAdornment: (
                  <InputAdornment position="start">
                    <Email className={classes.inputIconsColor} />
                  </InputAdornment>
                )
              }}
            />
          </CardBody>
          <div className={classes.textCenter}>
            <Button
              fill="true"
              color="primary"
              size="lg"
              onClick={this.onSubmit}
            >
              Send confirmation email
            </Button>
          </div>
          {error && <p>{error.message}</p>}
        </form>
      </Card>
    );
  }
}

const ResetPasswordForm = compose(
  withRouter,
  withFirebase
)(ResetPasswordFormBase);

export default withStyles(ForgotPasswordPageStyle)(ForgotPasswordPage);
