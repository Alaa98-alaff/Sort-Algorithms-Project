import "./SortBtn.scss";
import { bArray } from "../../helpers/variables";
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
        // bubbleSortLowSpeed ? await sleep(1000) : await sleep(50);
        // generateMarker(arr, j, "bubble");

        if (j < i - 1) {
          if (arr[j] > arr[j + 1]) {
            //SWAP!
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            noSwaps = false;
            // swapCol(j);
            dispatch(actionTypes.SWAP_COL_BUBBLE, j);
          }

          // if (bubbleSortLowSpeed) bubbleColumnColor(copyBubbleList, j, "set");
        }
      }

      if (noSwaps) {
        break;
      }
    }
  };

  // let copyBubbleList = bArray.slice();

  // async function swapCol(currentColIndex) {
  //   bubbleSortLowSpeed ? await sleep(600) : null;

  //   let temp2 = copyBubbleList[currentColIndex];
  //   copyBubbleList[currentColIndex] = copyBubbleList[currentColIndex + 1];
  //   copyBubbleList[currentColIndex + 1] = temp2;

  //   if (bubbleSortLowSpeed) {
  //     await sleep(200);
  //     bubbleColumnColor(copyBubbleList, undefined, "remove");
  //   }

  //   dispatch(actionTypes.SWAP_COL_BUBBLE, j);
  // }

  return (
    <button class="sort-bubble btn" onClick={bubbleSort}>
      Bubble Sort
    </button>
  );
}

export default SortBtn;
