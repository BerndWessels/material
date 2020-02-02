/**
 * Dependencies
 */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import PropTypes from "prop-types";

/**
 * AWS Amplify
 */
import { Hub } from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";

/**
 * The global cognito context.
 * @type {React.Context<[state, dispatch]>}
 */
const AmplifyContext = createContext();

/**
 * Export the useAmplify hook to be used to access the global cognito.
 * @returns {[state, dispatch]}
 */
export const useAmplify = () => useContext(AmplifyContext);

/**
 * The AmplifyProvider to be used in the <Root> component.
 * @param children
 * @param config
 * @returns {React.component}
 * @constructor
 */
export const AmplifyProvider = ({ children }) => {
  // The cognito credentials.
  const [isSignedIn, setIsSignedIn] = useState(false);
  // Update the credentials before they expire.
  useEffect(() => {
    // Authentication events listener.
    const authListener = ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn": // data = AmplifyUser
          setIsSignedIn(true);
          break;
        case "signOut":
        case "signIn_failure":
          setIsSignedIn(false);
          break;
        default:
          break;
      }
    };
    // Register listener.
    Hub.listen("auth", authListener);
    // Update user signed in status.
    Auth.currentAuthenticatedUser()
      .then(user => setIsSignedIn(true))
      .catch(err => setIsSignedIn(false));
    // Deregister listeners.
    return () => Hub.remove("auth", authListener);
  }, [setIsSignedIn]);
  // Navigate to login screen if necessary.
  let redirectTimerRef = useRef(null);
  useEffect(() => {
    clearTimeout(redirectTimerRef.current);
    if (!isSignedIn) {
      redirectTimerRef.current = setTimeout(() => {
        Auth.federatedSignIn();
      }, 5000);
    }
    return () => clearTimeout(redirectTimerRef.current);
  }, [isSignedIn]);
  // Provide the context.
  return (
    <AmplifyContext.Provider value={isSignedIn}>
      {children}
    </AmplifyContext.Provider>
  );
};

AmplifyProvider.propTypes = {
  children: PropTypes.node.isRequired
};
