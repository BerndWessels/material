import assocPath from "ramda/src/assocPath";

/**
 * @typedef {Object} MyFirstActionPayload
 * @property {number} age The age.
 * @property {ReduxAction} confirmationAction The action to be dispatched on confirmation.
 */

/**
 * This is my first action reducer.
 * @returns {function(*): MyFirstActionPayload}
 */
const myFirst = ({age, confirmationAction}) => state => ({...state, age, confirmationAction});

/**
 * @typedef {Object} MySecondActionPayload
 * @property {string} name The name.
 */

/**
 * This is my second action reducer.
 * @returns {function(*): MySecondActionPayload}
 */
const mySecond = ({name}) => state => ({...state, name});

/**
 * Export all reducers.
 */
export default {
    myFirst,
    mySecond,
};
