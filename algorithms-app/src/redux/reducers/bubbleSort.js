import * as actionTypes from "../actionTypes";
import { bArray } from "../../helpers/variables";

const initialState = {
  bubbleArr: [],
};

const bubbleSortReducer = (state = initialState, action) => {
  let { type, payload } = action;

  if (type === actionTypes.SWAP_COL_BUBBLE) {
    // async function swapCol(currentColIndex) {
    //   bubbleSortLowSpeed ? await sleep(600) : null;

    let temp2 = bArray[payload];
    bArray[payload] = bArray[payload + 1];
    bArray[payload + 1] = temp2;

    //   if (bubbleSortLowSpeed) {
    // await sleep(200);
    // bubbleColumnColor(bubbleArr, undefined, "remove");
    //   }
    // }

    return {
      ...state,
      bubbleArr: bArray,
    };
  } else {
    return state;
  }
};

export default bubbleSortReducer;
