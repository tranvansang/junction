import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import TemplateHeader from "components/Header/Header";
import TemplateFooter from "components/Footer/Footer";
import HeaderLinks from "customComponents/HeaderLinks";

import footerStyles from "assets/jss/material-kit-react/views/componentsSections/footerStyle";

const dashboardRoutes = [];

const Header = rest => {
  return (
    <TemplateHeader
      id="top"
      color="transparent"
      routes={dashboardRoutes}
      brand="Chatbot Hub"
      links={<HeaderLinks dropdownHoverColor="info" />}
      fixed
      changeColorOnScroll={{
        height: 300,
        color: "info"
      }}
      {...rest}
    />
  );
};

const ProtoFooter = props => {
  const { classes } = props;
  return (
    <TemplateFooter
      theme="dark"
      content={
        <div>
          <div className={classes.left}>
            <a href="#" className={classes.footerBrand}>
              Chatbot Hub
            </a>
          </div>
          <div className={classes.pullCenter}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <a href="#product" className={classes.block}>
                  about
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a href="#team" className={classes.block}>
                  team
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a
                  href="#work"
                  onClick={e => e.preventDefault()}
                  className={classes.block}
                >
                  Contact Us
                </a>
              </ListItem>
            </List>
          </div>
          <div className={classes.rightLinks}>
            <ul>
              <li>
                <a href="https://twitter.com/Sergi_Meza">
                  <i
                    className={
                      "fab fa-twitter" +
                      " " +
                      classes.iconSocial +
                      " " +
                      classes.btnTwitter
                    }
                  />
                </a>
              </li>
              <li>
                <a
                  style={{ paddingTop: "10px" }}
                  href="https://github.com/tranvansang/junction"
                >
                  <i
                    className={
                      "fab fa-github" +
                      " " +
                      classes.iconSocial +
                      " " +
                      classes.btnDribbble
                    }
                  />
                </a>
              </li>
              <li>
                <a href="https://instagram.com/jeanymeza">
                  <i
                    className={
                      "fab fa-instagram" +
                      " " +
                      classes.iconSocial +
                      " " +
                      classes.btnInstagram
                    }
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      }
    />
  );
};

const Footer = withStyles(footerStyles)(ProtoFooter);

export { Header, Footer };
