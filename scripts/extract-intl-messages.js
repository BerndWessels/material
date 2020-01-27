// eslint-disable-next-line import/no-extraneous-dependencies
const extractReactIntlMessages = require("extract-react-intl-messages");

const locales = ["en"];
const pattern = "src/**/!(*.test).js";
const buildDir = "build/translations";
const defaultLocale = "en";

extractReactIntlMessages(locales, pattern, buildDir, {
  defaultLocale
}).then(() => {
  console.log("finish");
});
