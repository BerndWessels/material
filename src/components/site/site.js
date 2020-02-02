/**
 * Dependencies
 */
import React, { useState } from "react";

/**
 * Hooks
 */
import { useAmplify } from "../../providers/amplify";
//import { useRedux } from "../../providers/redux";

/**
 * Redux
 */

/**
 * Components
 */
import Header from "./header";
import HomePage from "../home-page/home-page";
import LoadingIndicator from "../loading-indicator/loading-indicator";
import Navigation from "./navigation";
import { Redirect, Route, Switch } from "react-router-dom/umd/react-router-dom";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSignedIn = useAmplify();
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
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </main>
      {!isSignedIn && <LoadingIndicator />}
    </>
  );
};

export default Site;
