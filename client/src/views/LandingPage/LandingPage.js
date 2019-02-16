import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import Parallax from "components/Parallax/Parallax";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPageStyle";

// Sections for this page
import SectionProduct from "./Sections/SectionProduct";
import SectionTeam from "./Sections/SectionTeam";
import SectionWork from "./Sections/SectionWork";

class LandingPage extends React.Component {
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
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <h1 className={classes.title}>Chatbots for Everyone</h1>
                <h4>
                  Chatbot Connection is a platform inspired.... From open source
                  to business, you can host and review community deployed
                  chatbots....
                </h4>
                <br />
                <Link to="/signin">
                  <Button color="danger" size="lg" rel="noopener noreferrer">
                    Sign Up / Sign In
                  </Button>
                </Link>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classes.main}>
          <div className={classes.container}>
            <SectionProduct id="product" />
            <SectionTeam id="team" />
            <SectionWork id="work" />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
