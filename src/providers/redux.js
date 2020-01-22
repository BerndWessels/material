/**
 * Dependencies
 */
import React, { createContext, useContext, useEffect, useReducer } from "react";

/**
 * Reducers
 */
let _reducers = {};

/**
 * The global state context.
 * @type {React.Context<[state, dispatch]>}
 */
const StateContext = createContext();

/**
 * Export the ReduxProvider to be used in the <Root> component.
 */
export let ReduxProvider;

/**
 * Export the useRedux hook to be used to access the global state.
 * @returns {[state, dispatch]}
 */
export const useRedux = () => useContext(StateContext);

/**
 * Create the state provider in development mode with Redux DevTools Extension support.
 */
const withReduxDevToolsExtension = () => {
  /**
   * http://extension.remotedev.io/
   * @type {object}
   */
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect({});

  /**
   * The development reducer with Redux DevTools Extension support.
   *
   * @param state
   * @param action
   * @returns {object}
   */
  const reducer = (state, action) => {
    if (action.type === "ReduxDevToolsExtension") {
      return action.payload;
    }
    let newState = state;
    if (_reducers.hasOwnProperty(action.type)) {
      try {
        newState = _reducers[action.type](action.payload)(state);
      } catch (ex) {
        console.error(`Exception in action [${action.type}]`, ex);
      }
    } else {
      console.error(`Unknown action [${action.type}]`);
    }
    devTools.send(action, newState);
    return newState;
  };

  /**
   * Redux DevTools Extension message dispatcher component.
   * @param children
   * @returns {React.component}
   */
  const ReduxDevToolsExtension = ({ children }) => {
    const [state, dispatch] = useRedux();
    useEffect(() => {
      devTools.init(state);
      let unsubscribe = devTools.subscribe(message => {
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
   * The development state provider component.
   * @param initialState
   * @param children
   * @param reducers
   * @returns {React.component}
   * @constructor
   */
  ReduxProvider = ({ children, initialState = {}, reducers = {} }) => {
    useEffect(() => {
      _reducers = reducers;
    }, [reducers]);
    return (
      <StateContext.Provider value={useReducer(reducer, initialState)}>
        <ReduxDevToolsExtension>{children}</ReduxDevToolsExtension>
      </StateContext.Provider>
    );
  };
};

/**
 * In development mode we try to interface with the Redux DevTools Extension.
 */
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  if (window.__REDUX_DEVTOOLS_EXTENSION__) withReduxDevToolsExtension();
}

/**
 * Create the state provider in production mode.
 */
if (!ReduxProvider) {
  /**
   * The production reducer.
   *
   * @param state
   * @param action
   * @returns {object}
   */
  const reducer = (state, action) => {
    let newState = state;
    if (_reducers.hasOwnProperty(action.type)) {
      try {
        newState = _reducers[action.type](action.payload)(state);
      } catch (ex) {
        console.error(`Exception in action [${action.type}]`, ex);
      }
    } else {
      console.error(`Unknown action [${action.type}]`);
    }
    return newState;
  };

  /**
   * The production state provider component.
   * @param initialState
   * @param children
   * @param reducers
   * @returns {React.component}
   * @constructor
   */
  ReduxProvider = ({ children, initialState = {}, reducers = [] }) => {
    useEffect(() => {
      _reducers = reducers;
    }, [reducers]);
    return (
      <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
      </StateContext.Provider>
    );
  };
}
