import "./SortBtn.scss";
import { bArray, bubbleSortLowSpeed } from "../../helpers/variables";
import { sleep } from "../../helpers/sleep";
import dispatch from "../../redux/dispatch";
import * as actionTypes from "../../redux/actionTypes";

function SortBtn() {
  // Bubble Sort
  const bubbleSort = async () => {
    // make copy of the original bArray
    let arr = bArray.slice();

    for (let i = arr.length; i > 0; i--) {
      let noSwaps = true;

      for (let j = 0; j < i; j++) {
        if (bubbleSortLowSpeed) {
          await sleep(500);
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
              await sleep(1000);
            }
            swapCol(j);
          }

          // if (bubbleSortLowSpeed) bubbleColumnColor(copyBubbleList, j, "set");
        }
      }

      if (noSwaps) {
        break;
      }
    }
  };

  let copyBubbleList = bArray.slice();

  async function swapCol(currentColIndex) {
    let temp2 = copyBubbleList[currentColIndex];
    copyBubbleList[currentColIndex] = copyBubbleList[currentColIndex + 1];
    copyBubbleList[currentColIndex + 1] = temp2;

    // if (bubbleSortLowSpeed) {
    //   await sleep(200);
    //   bubbleColumnColor(copyBubbleList, undefined, "remove");
    // }

    dispatch(actionTypes.SWAP_COL_BUBBLE, copyBubbleList);
  }

  return (
    <button class="sort-bubble btn" onClick={bubbleSort}>
      Bubble Sort
    </button>
  );
}

export default SortBtn;
