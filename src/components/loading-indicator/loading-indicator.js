/**
 * Dependencies
 */
import React from "react";
import ReactDOM from "react-dom";

/**
 * Components
 */
import Fab from "@material-ui/core/Fab";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * Styles
 */
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  mainProgress: {
    position: "absolute",
    zIndex: 1000000,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, .9)" // TODO use theme color to support dark mode
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
  }
}));

/**
 * Component
 */
const LoadingIndicator = () => {
  const classes = useStyles();
  return ReactDOM.createPortal(
    <div className={classes.mainProgress}>
      <div className={classes.fabProgress}>
        <Fab aria-label="save" color="primary" size="large">
          <DonutLargeIcon className={classes.iconProgress} />
        </Fab>
        <CircularProgress size={72} className={classes.circularProgress} />
      </div>
    </div>,
    document.body
  );
};

export default LoadingIndicator;
