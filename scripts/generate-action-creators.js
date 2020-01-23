const fs = require("fs");
const path = require("path");
// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require("glob");
// eslint-disable-next-line import/no-extraneous-dependencies
const Handlebars = require("handlebars");

const source = `{{#each actions}}
/**
 * @param { {{this.payload}}ActionPayload } payload The action payload.
 * @returns { { payload: { {{this.payload}}ActionPayload }, type: string } }
 */
export const {{this.action}}ActionCreator = payload => ({type: "{{this.action}}", payload});
{{/each}}
`;
const template = Handlebars.compile(source);

const output = glob
  .sync(path.join(__dirname, "../src/redux/reducers/**/*.js"), {
    ignore: "**/index.js"
  })
  .map(file => {
    const src = fs.readFileSync(file, "utf8");
    const actions = /export default {(.*)}/gs
      .exec(src)[1]
      .replace(/,\s*$/, "")
      .split(",")
      .map(s => s.trim());
    return template({
      actions: actions.map(action => ({
        action,
        payload: action.charAt(0).toUpperCase() + action.slice(1)
      }))
    });
  })
  .join("");

fs.writeFile(
  path.resolve(__dirname, "../src/redux/action-creators.g.js"),
  output,
  err => {
    if (err) {
      console.error(`Autsch! Failed to store template: ${err.message}.`);
    }
  }
);
