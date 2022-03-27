import store from "./configureStore";

export default function dispatch(type, payload) {
  try {
    let action = {};
    if (type) {
      if (payload !== undefined) {
        action = { type, payload };
      } else {
        action = { type };
      }
    } else {
      throw new Error("Action type is not found.");
    }

    store.dispatch(action);
  } catch (error) {
    console.log(error);
  }
}
