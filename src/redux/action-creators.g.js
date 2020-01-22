/**
 * @param { TryChangeRouteActionPayload } payload The action payload.
 * @returns { { payload: { TryChangeRouteActionPayload }, type: string } }
 */
export const tryChangeRouteActionCreator = payload => ({type: "tryChangeRoute", payload});
/**
 * @param { MyFirstActionPayload } payload The action payload.
 * @returns { { payload: { MyFirstActionPayload }, type: string } }
 */
export const myFirstActionCreator = payload => ({type: "myFirst", payload});
/**
 * @param { MySecondActionPayload } payload The action payload.
 * @returns { { payload: { MySecondActionPayload }, type: string } }
 */
export const mySecondActionCreator = payload => ({type: "mySecond", payload});
