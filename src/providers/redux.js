/**
 * Dependencies
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from "react";
import PropTypes from "prop-types";

/**
 * http://extension.remotedev.io/
 * @type {object}
 */
let devTools = null;

/**
 * In development mode we try to interface with the Redux DevTools Extension.
 */
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // eslint-disable-next-line no-underscore-dangle
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    // eslint-disable-next-line no-underscore-dangle
    devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect({});
  }
}

/**
 * The global state context.
 * @type {React.Context<[state, dispatch]>}
 */
const ReduxContext = createContext();

/**
 * Export the useRedux hook to be used to access the global state.
 * @returns {[state, dispatch]}
 */
export const useRedux = () => useContext(ReduxContext);

/**
 * Redux DevTools Extension message dispatcher component.
 * @param children
 * @returns {React.component}
 * @constructor
 */
const ReduxDevToolsExtension = ({ children }) => {
  const [state, dispatch] = useRedux();
  useEffect(() => {
    devTools.init(state);
    const unsubscribe = devTools.subscribe(message => {
      if (message.type === "DISPATCH" && message.state) {
        dispatch({
          type: "ReduxDevToolsExtension",
          payload: JSON.parse(message.state)
        });
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return children;
};

/**
 * The ReduxProvider to be used in the <Root> component.
 * @param initialState
 * @param children
 * @param reducers
 * @returns {React.component}
 * @constructor
 */
export const ReduxProvider = ({ children, initialState, reducers }) => {
  const reducer = useCallback(
    (state, action) => {
      if (action.type === "ReduxDevToolsExtension") {
        return action.payload;
      }
      let newState = state;
      if (Object.prototype.hasOwnProperty.call(reducers, action.type)) {
        try {
          newState = reducers[action.type](action.payload)(state);
        } catch (ex) {
          console.error(`Exception in action [${action.type}]`, ex);
        }
      } else {
        console.error(`Unknown action [${action.type}]`);
      }
      if (devTools) {
        devTools.send(action, newState);
      }
      return newState;
    },
    [reducers]
  );

  return (
    <ReduxContext.Provider value={useReducer(reducer, initialState)}>
      {devTools && <ReduxDevToolsExtension>{children}</ReduxDevToolsExtension>}
      {!devTools && children}
    </ReduxContext.Provider>
  );
};

ReduxProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialState: PropTypes.object,
  reducers: PropTypes.object
};

ReduxProvider.defaultProps = {
  initialState: {},
  reducers: {}
};
