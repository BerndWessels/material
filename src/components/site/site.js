// Dependencies
import React, { useCallback } from "react";

// Hooks
import { useHistory } from "react-router-dom/umd/react-router-dom";

// Styles
import { fade, makeStyles } from "@material-ui/core/styles";

// Components
import { Switch, Route, Link } from "react-router-dom/umd/react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";

import Header from "./header";
import Navigation from "./navigation";

// Styles
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  main: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  appBarSpacer: theme.mixins.toolbar
}));

// Component
const Site = () => {
  const classes = useStyles();
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClick = useCallback(
    e => {
      history.push("about");
    },
    [history]
  );
  return (
    <>
      <Header onDrawerToggle={handleDrawerToggle} />
      <Navigation mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      <main className={classes.main}>
        <div className={classes.appBarSpacer} />
        <Icon>add_circle</Icon>
        <Button variant="contained" startIcon={<DeleteIcon />}>
          Default
        </Button>
        <Button variant="outlined" color="primary" onClick={handleClick}>
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>{" "}
        <Switch>
          <Route path="/about">
            <div>about</div>
          </Route>
          <Route path="/users">
            <div>users</div>
          </Route>
          <Route path="/">
            <div>home</div>
          </Route>
        </Switch>
      </main>
      <aside>
        <Typography>
          <Box fontWeight="fontWeightLight" m={1}>
            Light
          </Box>
        </Typography>
      </aside>
    </>
  );
};

export default Site;
