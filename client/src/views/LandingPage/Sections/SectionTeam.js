import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import Muted from "components/Typography/Muted";
import Button from "components/CustomButtons/Button";

import frankSquare from "assets/img/client/frank-square.jpg";
import sangSquare from "assets/img/client/sang-square.jpg";
import sergeiSquare from "assets/img/client/sergei-square.jpg";
import adeebSquare from "assets/img/client/adeeb-square.jpg";

import teamsStyle from "assets/jss/material-kit-react/views/sectionsSections/teamsStyle";
import teamStyle from "assets/jss/material-kit-react/views/landingPageSections/teamStyle";

const style = {
  ...teamsStyle,
  ...teamStyle,
  justifyContentCenter: {
    justifyContent: "center"
  }
};

const githubUrl = user => `https://github.com/${user}`;
const facebookUrl = user => `https://www.facebook.com/${user}`;
const twitterUrl = user => `https://twitter.com/${user}`;

class SectionTeam extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>The team</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <Card profile plain className={classes.card3}>
                <GridContainer>
                  <GridItem xs={12} sm={5} md={5}>
                    <CardHeader image plain>
                      <img src={frankSquare} alt="..." />
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${frankSquare})`,
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                  </GridItem>
                  <GridItem xs={12} sm={7} md={7}>
                    <CardBody plain>
                      <h4 className={classes.cardTitle}>Frank Wang</h4>
                      <Muted>
                        <h6 className={classes.cardCategory}>AI Hacker</h6>
                      </Muted>
                      <p className={classes.description}>
                        A simple message about me. A simple message about me.
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.justifyContentCenter}>
                      <Button
                        href={githubUrl("TianrenWang")}
                        justIcon
                        simple
                        color="github"
                      >
                        <i className="fab fa-github" />
                      </Button>
                      <Button
                        href={facebookUrl("broodstar.frank")}
                        justIcon
                        simple
                        color="facebook"
                      >
                        <i className="fab fa-facebook-square" />
                      </Button>
                    </CardFooter>
                  </GridItem>
                </GridContainer>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <Card profile plain className={classes.card3}>
                <GridContainer>
                  <GridItem xs={12} sm={5} md={5}>
                    <CardHeader image plain>
                      <img src={sangSquare} alt="..." />
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${sangSquare})`,
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                  </GridItem>
                  <GridItem xs={12} sm={7} md={7}>
                    <CardBody plain>
                      <h4 className={classes.cardTitle}>Tran Van Sang</h4>
                      <Muted>
                        <h6 className={classes.cardCategory}>Backend Hacker</h6>
                      </Muted>
                      <p className={classes.description}>
                        A simple message about me. A simple message about me.
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.justifyContentCenter}>
                      <Button
                        href={githubUrl("tranvansang")}
                        justIcon
                        simple
                        color="github"
                      >
                        <i className="fab fa-github" />
                      </Button>
                      <Button
                        href={twitterUrl("sang_k41")}
                        justIcon
                        simple
                        color="twitter"
                      >
                        <i className="fab fa-twitter" />
                      </Button>
                      <Button
                        href={facebookUrl("sangk41")}
                        justIcon
                        simple
                        color="facebook"
                      >
                        <i className="fab fa-facebook-square" />
                      </Button>
                    </CardFooter>
                  </GridItem>
                </GridContainer>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <Card profile plain className={classes.card3}>
                <GridContainer>
                  <GridItem xs={12} sm={5} md={5}>
                    <CardHeader image plain>
                      <img src={adeebSquare} alt="..." />
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${adeebSquare})`,
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                  </GridItem>
                  <GridItem xs={12} sm={7} md={7}>
                    <CardBody plain>
                      <h4 className={classes.cardTitle}>Adeeb Mohammed</h4>
                      <Muted>
                        <h6 className={classes.cardCategory}>Backend Hacker</h6>
                      </Muted>
                      <p className={classes.description}>
                        A simple message about me. A simple message about me.
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.justifyContentCenter}>
                      <Button
                        href={githubUrl("adeeb2358")}
                        justIcon
                        simple
                        color="github"
                      >
                        <i className="fab fa-github" />
                      </Button>
                      <Button
                        href={facebookUrl("adeeb3")}
                        justIcon
                        simple
                        color="facebook"
                      >
                        <i className="fab fa-facebook-square" />
                      </Button>
                    </CardFooter>
                  </GridItem>
                </GridContainer>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <Card profile plain className={classes.card3}>
                <GridContainer>
                  <GridItem xs={12} sm={5} md={5}>
                    <CardHeader image plain>
                      <img src={sergeiSquare} alt="..." />
                      <div
                        className={classes.coloredShadow}
                        style={{
                          backgroundImage: `url(${sergeiSquare})`,
                          opacity: "1"
                        }}
                      />
                    </CardHeader>
                  </GridItem>
                  <GridItem xs={12} sm={7} md={7}>
                    <CardBody plain>
                      <h4 className={classes.cardTitle}>Sergei Meza</h4>
                      <Muted>
                        <h6 className={classes.cardCategory}>
                          Frontend Hacker
                        </h6>
                      </Muted>
                      <p className={classes.description}>
                        A simple message about me. A simple message about me.
                      </p>
                    </CardBody>
                    <CardFooter plain className={classes.justifyContentCenter}>
                      <Button
                        href={githubUrl("SergeiMeza")}
                        justIcon
                        simple
                        color="github"
                      >
                        <i className="fab fa-github" />
                      </Button>
                      <Button
                        href={twitterUrl("SergiMeza")}
                        justIcon
                        simple
                        color="twitter"
                      >
                        <i className="fab fa-twitter" />
                      </Button>
                      <Button
                        href={facebookUrl("Sergi_Meza")}
                        justIcon
                        simple
                        color="facebook"
                      >
                        <i className="fab fa-facebook-square" />
                      </Button>
                    </CardFooter>
                  </GridItem>
                </GridContainer>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(SectionTeam);
