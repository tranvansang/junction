import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import Parallax from "components/Parallax/Parallax";

import { container, title } from "assets/jss/material-kit-react";

const style = theme => ({
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px"
    }
  }
});

class NotFoundPage extends Component {
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
                <h3 className={classes.title}>Page not found</h3>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
      </div>
    );
  }
}

export default withStyles(style)(NotFoundPage);
