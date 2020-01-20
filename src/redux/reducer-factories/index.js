/**
 * @typedef {Object} ReduxAction
 * @property {string} type The type of action.
 * @property {Object} payload The action payload.
 */

import navigation from "./navigation";
import site from "./site";

export default {
    ...navigation,
    ...site,
};
