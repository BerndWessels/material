/**
 * Dependencies
 */
import React from "react";
/**
 * Hooks
 */
import { useRedux } from "../../providers/redux";
/**
 * Redux
 */
import { tryChangeRouteActionCreator } from "../../redux/action-creators.g.js";
/**
 * Components
 */
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
/**
 * Styles
 */
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  }
}));
/**
 * Component
 */
const HomePage = () => {
  const classes = useStyles();
  const [state, dispatch] = useRedux();
  return (
    <>
      <p>Bernd</p>
      <Icon>add_circle</Icon>
      <Button variant="contained" startIcon={<DeleteIcon />}>
        Default
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={e => dispatch(tryChangeRouteActionCreator({ route: "about" }))}
      >
        Primary
      </Button>
      <h2>Bernd</h2>
      <h2>Bernd</h2>
      <h2>Bernd</h2>
      <h2>Bernd</h2>
      <h2>Bernd</h2>
      <h2>Bernd</h2>
      <h2>Bernd is hot, really - so really man !!!</h2>
    </>
  );
};

export default HomePage;
