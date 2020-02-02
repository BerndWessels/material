/**
 * AWS Cognito
 */

const region = "us-east-1";
const userPoolName = "test-social";
const userPoolId = "us-east-1_rzhSb05yn";
const userPoolAppClientId = "73ooiaf0o2141egol0mvpl26q4";
const identityPoolId = "us-east-1:e573ebe9-1532-47a4-b74a-df6b2e697eab";
const cognitoIdentityPoolUrl =
  "https://cognito-identity.us-east-1.amazonaws.com";
const cognitoUserPoolLoginRedirectUrl = "http://localhost:3000/";
const cognitoUserPoolLoginScopes = "phone email openid profile";
const cognitoUserPoolLoginUrl = `https://${userPoolName}.auth.${region}.amazoncognito.com/login?redirect_uri=${encodeURI(
  cognitoUserPoolLoginRedirectUrl
)}&response_type=code&client_id=${userPoolAppClientId}&identity_provider=COGNITO&scopes=${encodeURI(
  cognitoUserPoolLoginScopes
)}`;
const cognitoUserPoolTokenUrl = `https://${userPoolName}.auth.${region}.amazoncognito.com/oauth2/token`;

export const cognitoConfig = {
  region,
  userPoolName,
  userPoolId,
  userPoolAppClientId,
  identityPoolId,
  cognitoIdentityPoolUrl,
  cognitoUserPoolLoginRedirectUrl,
  cognitoUserPoolLoginScopes,
  cognitoUserPoolLoginUrl,
  cognitoUserPoolTokenUrl
};
