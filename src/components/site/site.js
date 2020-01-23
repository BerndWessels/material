/**
 * Dependencies
 */
import React, { useState } from "react";

/**
 * Hooks
 */
import { useRedux } from "../../providers/redux";

/**
 * Redux
 */

/**
 * Components
 */
import Header from "./header";
import HomePage from "../home-page/home-page";
import Navigation from "./navigation";
import { Route, Switch } from "react-router-dom/umd/react-router-dom";

/**
 * Styles
 */
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  main: {
    flexGrow: 1
    // padding: theme.spacing(3)
  },
  appBarSpacer: theme.mixins.toolbar
}));

/**
 * Component
 */
const Site = () => {
  const classes = useStyles();
  const [state, dispatch] = useRedux();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <Header onDrawerToggle={handleDrawerToggle} />
      <Navigation mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      <main className={classes.main}>
        <div className={classes.appBarSpacer} />
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default Site;
