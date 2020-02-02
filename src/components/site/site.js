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
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import Header from "./header";
import HomePage from "../home-page/home-page";
import Navigation from "./navigation";
import {
  Redirect,
  Route,
  Switch,
  useRouteMatch
} from "react-router-dom/umd/react-router-dom";

/**
 * Styles
 */
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import {useCognito} from "../../providers/cognito";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  mainProgress: {
    width: "100vh",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  fabProgress: {
    position: "relative"
  },
  circularProgress: {
    position: "absolute",
    top: -8,
    left: -8,
    zIndex: 1
  },
  iconProgress: {
    animation: "$rotation 2s infinite ease-in-out"
  },
  "@keyframes rotation": {
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(-359deg)"
    }
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
  const credentials = useCognito();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return credentials === null ? (
    <main className={classes.mainProgress}>
      <div className={classes.fabProgress}>
        <Fab aria-label="save" color="primary" size="large">
          <DonutLargeIcon className={classes.iconProgress} />
        </Fab>
        <CircularProgress size={72} className={classes.circularProgress} />
      </div>
    </main>
  ) : (
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
    </>
  );
};

export default Site;
