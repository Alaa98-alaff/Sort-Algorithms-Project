import { bArray } from "../variables";
import dispatch from "../../redux/dispatch";
import * as actionTypes from "../../redux/actionTypes";
import { sleep } from "../sleep";
import swapCol from "../swapCol";

// make copy of the original bArray
let arr = bArray.slice();

// Bubble Sort Algorithms
const bubbleSortAlgo = async (bubbleSortLowSpeed) => {
  for (let i = arr.length; i > 0; i--) {
    let noSwaps = true;

    for (let j = 0; j < i; j++) {
      if (bubbleSortLowSpeed) {
        await sleep(800);
      } else {
        await sleep(50);
      }

      dispatch(actionTypes.CURRENT_BUBBLE_COL, j);

      if (j < i - 1) {
        if (arr[j] > arr[j + 1]) {
          //SWAP!
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          noSwaps = false;

          if (bubbleSortLowSpeed) {
            await sleep(500);
          }
          // noSwaps = false;
          swapCol(j);
        }
      }
    }

    if (noSwaps) {
      break;
    }
  }
};

export default bubbleSortAlgo;
