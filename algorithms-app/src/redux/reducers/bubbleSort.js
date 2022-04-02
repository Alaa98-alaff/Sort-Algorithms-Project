import * as actionTypes from "../actionTypes";
import { bArray } from "../../helpers/variables";

const initialState = {
  bubbleArr: bArray,
  currentSortingCol: null,
  bubbleSortLowSpeed: false,
};

const bubbleSortReducer = (state = initialState, action) => {
  let { type, payload } = action;

  if (type === actionTypes.SWAP_COL_BUBBLE) {
    return {
      ...state,
      bubbleArr: Object.assign([], payload),
    };
  } else if (type === actionTypes.CURRENT_BUBBLE_COL) {
    return {
      ...state,
      currentSortingCol: payload,
    };
  } else if (type === actionTypes.LOW_SPEED_SORT) {
    return {
      ...state,
      bubbleSortLowSpeed: payload,
    };
  } else {
    return state;
  }
};

export default bubbleSortReducer;
