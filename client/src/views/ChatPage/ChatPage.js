import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import Parallax from "components/Parallax/Parallax";

import { Header } from "customComponents/HeaderFooter";

// import ChatBox from '../containers/ChatBox'
import ChatDashboard from "customComponents/ChatDashboard/ChatDashboard";
import { Route, Switch } from "react-router-dom";
// import NotFound from "./NotFound";
// import PrivateRoute from "../containers/PrivateRoute";

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

const ChatPage = ({ match, classes }) => {
  return (
    <div>
      <Header color="rose" />
      <div className={classes.chatContainer}>
        <Switch>
          {/* <PrivateRoute exact path={`${match.url}/:id`} component={ChatBox} />
          <PrivateRoute exact path={match.url} component={ChatDashboard} />
          <Route exact path={`${match.url}/:id`} component={ChatBox} /> */}
          <Route exact path={match.url} component={ChatDashboard} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </div>
    </div>
  );
};

export default withStyles(style)(ChatPage);
