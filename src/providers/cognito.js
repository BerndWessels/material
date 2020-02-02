/**
 * Dependencies
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import PropTypes from "prop-types";

/**
 * The global cognito context.
 * @type {React.Context<[state, dispatch]>}
 */
const CognitoContext = createContext();

/**
 * Export the useCognito hook to be used to access the global cognito.
 * @returns {[state, dispatch]}
 */
export const useCognito = () => useContext(CognitoContext);

/**
 * Get the access tokens for the given authorization code.
 * @param config
 * @param cognitoUserPoolAuthorizationCode
 */
const getTokensFromCode = (config, cognitoUserPoolAuthorizationCode) => {
  const params = {
    grant_type: "authorization_code",
    code: cognitoUserPoolAuthorizationCode,
    client_id: config.userPoolAppClientId,
    redirect_uri: config.cognitoUserPoolLoginRedirectUrl
  };
  return getTokensFromParams(config, params);
};

/**
 * Get the access tokens for the given refresh token.
 * @param config
 * @param cognitoUserPoolRefreshToken
 */
const getTokensFromRefreshToken = (config, cognitoUserPoolRefreshToken) => {
  const params = {
    grant_type: "refresh_token",
    refresh_token: cognitoUserPoolRefreshToken,
    client_id: config.userPoolAppClientId
  };
  return getTokensFromParams(config, params);
};

/**
 * Get the access tokens.
 * @param config
 * @param params
 */
const getTokensFromParams = (config, params) => {
  const searchParams = Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");
  console.log("getTokensFromParams", params);
  return fetch(config.cognitoUserPoolTokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: searchParams
  })
    .then(response => {
      let contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      }
      console.log(contentType);
      throw new TypeError("Oops, we haven't got JSON!");
    })
    .then(json => {
      /* process your JSON further */
      console.log("json1", json);
      if (json.hasOwnProperty("error")) {
        throw json.error;
      }
      return json;
    });
  // .catch(error => {
  //   console.log(error);
  // });
};

/**
 * Get the identity id for the current user.
 * @param config
 * @param cognitoUserPoolTokens
 * @returns {Promise<Response>}
 */
const getIdentityForUser = (config, cognitoUserPoolTokens) => {
  console.log("getIdentityForUser", cognitoUserPoolTokens);
  return fetch(config.cognitoIdentityPoolUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": "AWSCognitoIdentityService.GetId"
    },
    body: JSON.stringify({
      IdentityPoolId: config.identityPoolId,
      Logins: {
        [`cognito-idp.${config.region}.amazonaws.com/${config.userPoolId}`]: cognitoUserPoolTokens.id_token
      }
    })
  })
    .then(function(response) {
      let contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/x-amz-json-1.1")) {
        return response.json();
      }
      console.log(contentType);
      throw new TypeError("Oops, we haven't got JSON!");
    })
    .then(function(json) {
      /* process your JSON further */
      console.log("json2", json);
      return {
        cognitoUserPoolTokens,
        cognitoIdentityPoolIdentityId: json.IdentityId
      };
      //setCognitoIdentityPoolIdentityId(json.IdentityId);
    });
  // .catch(function(error) {
  //   console.log(error);
  // });
};

/**
 * Get the access credentials for the current user.
 * @param config
 * @param cognitoUserPoolTokens
 * @param cognitoIdentityPoolIdentityId
 * @returns {Promise<Response>}
 */
const getCredentialsForIdentity = (
  config,
  cognitoUserPoolTokens,
  cognitoIdentityPoolIdentityId
) => {
  console.log(
    "getCredentialsForIdentity",
    cognitoUserPoolTokens,
    cognitoIdentityPoolIdentityId
  );
  return fetch(config.cognitoIdentityPoolUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": "AWSCognitoIdentityService.GetCredentialsForIdentity"
    },
    body: JSON.stringify({
      IdentityId: cognitoIdentityPoolIdentityId,
      Logins: {
        [`cognito-idp.${config.region}.amazonaws.com/${config.userPoolId}`]: cognitoUserPoolTokens.id_token
      }
    })
  })
    .then(function(response) {
      let contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/x-amz-json-1.1")) {
        return response.json();
      }
      console.log(contentType);
      throw new TypeError("Oops, we haven't got JSON!");
    })
    .then(function(json) {
      /* process your JSON further */
      console.log("json3", json);
      return {
        cognitoUserPoolTokens,
        cognitoIdentityPoolIdentityId,
        cognitoIdentityPoolCredentials: json.Credentials
      };
    });
  // .catch(function(error) {
  //   console.log(error);
  // });
};

/**
 *
 */
const updateCredentials = (config, cognitoUserPoolAuthorizationCode) => {
  if (cognitoUserPoolAuthorizationCode) {
    return getTokensFromCode(config, cognitoUserPoolAuthorizationCode)
      .then(cognitoUserPoolTokens => {
        return getIdentityForUser(config, cognitoUserPoolTokens);
      })
      .then(({ cognitoUserPoolTokens, cognitoIdentityPoolIdentityId }) => {
        return getCredentialsForIdentity(
          config,
          cognitoUserPoolTokens,
          cognitoIdentityPoolIdentityId
        );
      })
      .then(
        ({
          cognitoUserPoolTokens,
          cognitoIdentityPoolIdentityId,
          cognitoIdentityPoolCredentials
        }) => {
          // TODO find a more secure way to store the refresh token
          window.localStorage.setItem(
            "cognitoUserPoolRefreshToken",
            cognitoUserPoolTokens.refresh_token
          );
          return {
            cognitoUserPoolTokens,
            cognitoIdentityPoolIdentityId,
            cognitoIdentityPoolCredentials
          };
        }
      );
    // .catch(err => {
    //   console.error(err);
    //   window.location.assign(config.cognitoUserPoolLoginUrl);
    // });
  } else {
    // TODO find a more secure way to store the refresh token
    const cognitoUserPoolRefreshToken = window.localStorage.getItem(
      "cognitoUserPoolRefreshToken"
    );
    if (cognitoUserPoolRefreshToken) {
      return getTokensFromRefreshToken(config, cognitoUserPoolRefreshToken)
        .then(cognitoUserPoolTokens => {
          return getIdentityForUser(config, cognitoUserPoolTokens);
        })
        .then(({ cognitoUserPoolTokens, cognitoIdentityPoolIdentityId }) => {
          return getCredentialsForIdentity(
            config,
            cognitoUserPoolTokens,
            cognitoIdentityPoolIdentityId
          );
        });
      // .catch(err => {
      //   console.error(err);
      //   window.location.assign(config.cognitoUserPoolLoginUrl);
      // });
    } else {
      //window.location.assign(config.cognitoUserPoolLoginUrl);
      return Promise.resolve(null);
    }
  }
};

/**
 * The CognitoProvider to be used in the <Root> component.
 * @param children
 * @param config
 * @returns {React.component}
 * @constructor
 */
export const CognitoProvider = ({ children, config }) => {
  // The cognito credentials.
  const [credentials, setCredentials] = useState(null);
  // Update the credentials before they expire.
  // useEffect(() => {
  //   if (credentials) {
  //     const timeoutId = setTimeout(() => {
  //       updateCredentials(config).then(setCredentials);
  //     }, (credentials.cognitoUserPoolTokens.expires_in - 60) * 1000);
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [config, credentials, setCredentials]);
  // Try to update the credentials when the app starts.
  useEffect(() => {
    const pathname = window.location.pathname.trim();
    const cognitoUserPoolAuthorizationCode =
      pathname === "/"
        ? new URLSearchParams(window.location.search).get("code")
        : null;
    updateCredentials(config, cognitoUserPoolAuthorizationCode).then(
      setCredentials
    ).catch(err => {
      console.log("yup", err);
    });
  }, []);
  console.log("credentials", credentials);
  return (
    <CognitoContext.Provider value={credentials}>
      {children}
    </CognitoContext.Provider>
  );
};

CognitoProvider.propTypes = {
  children: PropTypes.node.isRequired,
  config: PropTypes.object.isRequired
};
