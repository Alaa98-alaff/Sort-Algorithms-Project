import "./SortBtn.scss";
import { array } from "../../helpers/variables";

function SortBtn() {
  // Bubble Sort
  const bubbleSort = async () => {
    // make copy of the original array
    let arr = array.slice();

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
          }

          // if (bubbleSortLowSpeed) bubbleColumnColor(copyBubbleList, j, "set");
        }
      }

      if (noSwaps) {
        break;
      }
    }
  };

  return (
    <button class="sort-bubble btn" onClick={bubbleSort}>
      Bubble Sort
    </button>
  );
}

export default SortBtn;
