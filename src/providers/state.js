/**
 * Global State Management (Design-System managed code, please consult before changing)
 */

/**
 * Dependencies
 */
import React, { createContext, useContext, useEffect, useReducer } from "react";
import reduce from "ramda/es/reduce";

/**
 * Export the StateProvider to be used in the <Root> component.
 */
export let StateProvider;

/**
 * You can provide 'old-style' reducers for actions with type and payload through the StateProvider.
 * @type {Array}
 */
let globalLegacyReducers = [];

/**
 * The global state context.
 * @type {React.Context<[state, dispatch]>}
 */
const StateContext = createContext();

/**
 * Export the useGlobalState hook to be used to access the global state.
 * @returns {[state, dispatch]}
 */
export const useGlobalState = () => useContext(StateContext);

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
   * Supports the following types of actions:
   * dispatch(state => ({...state}))
   * dispatch({type: 'myAction', reducer: state => ({...state})})
   * dispatch({type: 'myAction', payload: myPayload}
   *
   * @param state
   * @param action
   * @returns {object}
   */
  const reducer = (state, action) => {
    let newState = state;
    let type = "action";
    if (typeof action === "function") {
      newState = action(state);
    } else if (action != null && typeof action === "object") {
      if (action.hasOwnProperty("type")) {
        type = action.type;
        if (action.hasOwnProperty("reducer")) {
          newState = action.reducer(state);
        } else if (action.hasOwnProperty("payload")) {
          newState = reduce(
            (a, c) => c(a, action),
            state,
            globalLegacyReducers
          );
        } else {
          console.error("Reducer Action Error", action);
        }
      } else {
        console.error("Reducer Action Error", action);
      }
    } else {
      console.error("Reducer Action Error", action);
    }
    if (type !== "ReduxDevToolsExtension") {
      devTools.send(type, newState);
    }
    return newState;
  };

  /**
   * Redux DevTools Extension message dispatcher component.
   * @param children
   * @returns {React.component}
   */
  const ReduxDevToolsExtension = ({ children }) => {
    const [state, dispatch] = useGlobalState();
    useEffect(() => {
      devTools.init(state);
      let unsubscribe = devTools.subscribe(message => {
        if (message.type === "DISPATCH" && message.state) {
          dispatch({
            type: "ReduxDevToolsExtension",
            reducer: () => JSON.parse(message.state)
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
   * @param legacyReducers
   * @returns {React.component}
   */
  StateProvider = ({ children, initialState, legacyReducers = [] }) => {
    useEffect(() => {
      globalLegacyReducers = legacyReducers;
    }, [legacyReducers]);
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
if (!StateProvider) {
  /**
   * The production reducer.
   *
   * Supports the following types of actions:
   * dispatch(state => ({...state}))
   * dispatch({type: 'myAction', reducer: state => ({...state})})
   * dispatch({type: 'myAction', payload: myPayload}
   *
   * @param state
   * @param action
   * @returns {object}
   */
  const reducer = (state, action) => {
    if (typeof action === "function") {
      return action(state);
    } else if (action != null && typeof action === "object") {
      if (action.hasOwnProperty("reducer")) {
        return action.reducer(state);
      } else if (action.hasOwnProperty("payload")) {
        return reduce((a, c) => c(a, action), state, globalLegacyReducers);
      }
    }
  };

  /**
   * The production state provider component.
   * @param initialState
   * @param children
   * @param legacyReducers
   * @returns {*}
   * @constructor
   */
  StateProvider = ({ children, initialState, legacyReducers = [] }) => {
    useEffect(() => {
      globalLegacyReducers = legacyReducers;
    }, [legacyReducers]);
    return (
      <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
      </StateContext.Provider>
    );
  };
}
