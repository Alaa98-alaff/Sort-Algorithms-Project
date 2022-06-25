import { bArray } from "./variables";
import dispatch from "../redux/dispatch";
import * as actionTypes from "../redux/actionTypes";

let copyBubbleList = bArray.slice();

async function swapCol(currentColIndex) {
  let temp2 = copyBubbleList[currentColIndex];
  copyBubbleList[currentColIndex] = copyBubbleList[currentColIndex + 1];
  copyBubbleList[currentColIndex + 1] = temp2;

  dispatch(actionTypes.SWAP_COL_BUBBLE, copyBubbleList);
}

export default swapCol;
