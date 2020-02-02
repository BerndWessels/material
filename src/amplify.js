/**
 * Dependencies
 */
import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";

/**
 * Configuration
 */
Amplify.configure({
  Auth: {
    identityPoolId: "us-east-1:b5e41d97-0df2-471a-9a78-db9fa0fe1503",
    region: "us-east-1",
    userPoolId: "us-east-1_it2dErWee",
    userPoolWebClientId: "3iholkpunsm66nasmqrout302c"
  },
  // AppSync
  aws_appsync_graphqlEndpoint:
    "https://5tzwcfto4rd7jo5t4k6o3nmicy.appsync-api.us-east-1.amazonaws.com/graphql",
  aws_appsync_region: "us-east-1",
  aws_appsync_authenticationType: "AWS_IAM"
});
// Configure Authentication
Auth.configure({
  oauth: {
    domain:
      "2653da12-d6f1-4937-a5ed-ceed08686d5e.auth.us-east-1.amazoncognito.com",
    scope: ["phone", "email", "openid", "profile"],
    redirectSignIn: "http://localhost:3000",
    redirectSignOut: "http://localhost:3000",
    responseType: "code" // or 'token', note that REFRESH token will only be generated when the responseType is code
  }
});
