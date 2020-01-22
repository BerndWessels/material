/**
 * @typedef {Object} TryChangeRouteActionPayload
 * @property {string} route The new route.
 */

/**
 * Try to navigate to another route.
 * @returns {function(*): TryChangeRouteActionPayload}
 */
const tryChangeRoute = ({route}) => state => ({...state, route});

/**
 * Export all reducers.
 */
export default {
    tryChangeRoute,
};
