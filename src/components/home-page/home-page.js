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
import { tryChangeRouteActionCreator } from "../../redux/action-creators.g";

/**
 * Components
 */
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

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
      <p>Hello</p>
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
    </>
  );
};

export default HomePage;
