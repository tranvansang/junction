import React from "react";
import { compose } from "recompose";
// react components for routing our app without refresh
import { Link, withRouter } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";
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

import signInPageStyle from "assets/jss/material-kit-react/views/signInPageStyle";

class SignUp extends React.Component {
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
                <SignUpForm classes={classes} />
                <SignUpLink classes={classes} />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
      </div>
    );
  }
}

const SignUpLink = classes => (
  <div className={classes.textCenter} style={{ color: "white" }}>
    Aleady have an account?{" "}
    <Link to="/signin" style={{ color: "white" }}>
      Sign In
    </Link>
  </div>
);

class SignUpFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: "",
      error: null
    };
  }

  onSubmit = event => {
    const { name, email, password1 } = this.state;

    this.props.firebase
      .createUserWithEmailAndPassword(email, password1)
      .then(authUser => {
        this.setState({
          name: "",
          email: "",
          password1: "",
          password2: "",
          error: null
        });
        this.props.history.push("/home");
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
    const { name, email, password1, password2, error } = this.state;

    const isInvalid =
      password1 !== password2 ||
      password1 === "" ||
      email === "" ||
      name === "";
    return (
      <Card>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <CardHeader color="primary" signup className={classes.cardHeader}>
            <h3 className={classes.cardTitle}>Sign Up</h3>
          </CardHeader>
          <CardBody signup>
            <CustomInput
              id="name"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                placeholder: "First Name...",
                type: "text",
                onChange: this.onChange,
                name: "name",
                suggested: "name",
                value: name,
                startAdornment: (
                  <InputAdornment position="start">
                    <Face className={classes.inputIconsColor} />
                  </InputAdornment>
                )
              }}
            />
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
            <CustomInput
              id="password1"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                placeholder: "Password",
                type: "password",
                suggested: "new-password",
                onChange: this.onChange,
                name: "password1",
                value: password1,
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon className={classes.inputIconsColor}>lock_utline</Icon>
                  </InputAdornment>
                )
              }}
            />
            <CustomInput
              id="password2"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                placeholder: "Confirm password",
                type: "password",
                suggested: "new-password",
                onChange: this.onChange,
                name: "password2",
                value: password2,
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon className={classes.inputIconsColor}>lock_utline</Icon>
                  </InputAdornment>
                )
              }}
            />
          </CardBody>
          <div className={classes.textCenter}>
            <Button
              disabled={isInvalid}
              fill="true"
              color="primary"
              size="lg"
              onClick={this.onSubmit}
            >
              Get started
            </Button>
            <p> </p>
          </div>
          {error && <p>{error.message}</p>}
        </form>
      </Card>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default withStyles(signInPageStyle)(SignUp);
