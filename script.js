const array = [1, 16, 10, 4, 2, 12, 9, 8, 11, 3, 1, 12, 4, 6, 1, 4, 2, 12, 5];

const bubbleBody = document.querySelector(".bubble-body");
const selectionBody = document.querySelector(".selection-body");
const sortBubble = document.querySelector(".sort-bubble");
const sortSelection = document.querySelector(".sort-selection");

sortBubble.addEventListener("click", bubbleSort);
sortSelection.addEventListener("click", selectionSort);

function bubbleColumns(arr) {
  if (arr.length > 0) {
    bubbleBody.innerHTML = "";
    arr.map((el, index) => {
      const column = document.createElement("div");
      column.classList.add("column");
      column.style.height = `${el * 1.6}rem`;
      bubbleBody.appendChild(column);
    });
  }
}

function selectionColumns(arr) {
  if (arr.length > 0) {
    selectionBody.innerHTML = "";
    arr.map((el, index) => {
      const column = document.createElement("div");
      column.classList.add("column");
      column.style.height = `${el * 1.6}rem`;
      selectionBody.appendChild(column);
    });
  }
}

async function bubbleSort() {
  sortBubble.disabled = true;

  // make copy of the original array
  let arr = array.slice();

  for (let i = arr.length; i > 0; i--) {
    let noSwaps = true;

    for (let j = 0; j < i - 1; j++) {
      await sleep(20);

      if (arr[j] > arr[j + 1]) {
        //SWAP!
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        noSwaps = false;

        // sort the columns
        bubbleColumns(arr);
      }
    }
    if (noSwaps) break;
  }

  sortBubble.disabled = false;
}

async function selectionSort() {
  sortSelection.disabled = true;
  // make copy of the original array
  let arr = array.slice();

  for (let i = 0; i < arr.length; i++) {
    let lowest = i;

    for (let j = i + 1; j < arr.length; j++) {
      await sleep(20);

      if (arr[lowest] > arr[j]) {
        lowest = j;
      }
    }
    if (i !== lowest) {
      let temp = arr[i];
      arr[i] = arr[lowest];
      arr[lowest] = temp;

      // sort the columns
      selectionColumns(arr);
    }
  }
  sortSelection.disabled = false;
}

function init() {
  bubbleColumns(array);
  selectionColumns(array);
}
init();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
