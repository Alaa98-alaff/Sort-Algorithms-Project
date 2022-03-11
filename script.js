const array = [1, 4, 10, 4, 2, 14, 9, 8, 11, 3, 1, 12, 4, 6, 1, 4, 2, 13, 5];

const bubbleBody = document.querySelector(".bubble-body");
const selectionBody = document.querySelector(".selection-body");
const sortBubble = document.querySelector(".sort-bubble");
const sortSelection = document.querySelector(".sort-selection");
const sortAll = document.querySelector(".sort-all");
const markerBubble = document.querySelector(".bubble-marker");
const markerSelection = document.querySelector(".selection-marker");

let markerPosition = 31.8;

sortBubble.addEventListener("click", bubbleSort);
sortSelection.addEventListener("click", selectionSort);
sortAll.addEventListener("click", handleSortAll);

function handleSortAll() {
  bubbleSort();
  selectionSort();
}

function bubbleColumns(arr, currentColIndex) {
  if (arr.length >= 0) {
    bubbleBody.innerHTML = "";

    arr.map((el, index) => {
      const column = document.createElement("div");
      column.classList.add("column");
      column.style.order = index + 1;

      // for slow show
      if (currentColIndex >= 0) {
        if (currentColIndex === index) {
          column.style.background = "black";
        }
      }

      column.style.height = `${el * 1.6}rem`;
      bubbleBody.appendChild(column);
    });
  }
}

function selectionColumns(arr, currentColIndex) {
  if (arr.length > 0) {
    selectionBody.innerHTML = "";

    arr.map((el, index) => {
      const column = document.createElement("div");
      column.classList.add("column");
      column.style.order = index + 1;

      // for slow show
      if (currentColIndex >= 0) {
        if (currentColIndex === index) {
          column.style.background = "black";
        }
      }
      column.style.height = `${el * 1.6}rem`;
      selectionBody.appendChild(column);
    });
  }
}

async function bubbleSort() {
  sortBubble.disabled = true;
  sortAll.disabled = true;

  // make copy of the original array
  let arr = array.slice();

  for (let i = arr.length; i > 0; i--) {
    let noSwaps = true;

    for (let j = 0; j < i - 1; j++) {
      await sleep(5000);
      bubbleColumns(arr, j);

      // handleMarkerPosition(markerPosition, "bubble");

      if (arr[j] > arr[j + 1]) {
        //SWAP!
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        noSwaps = false;
      }
    }

    if (noSwaps) {
      // handleMarkerPosition(31.8, "bubble");
      break;
    }

    // handleMarkerPosition(31.8, "bubble");
  }

  sortBubble.disabled = false;
  sortAll.disabled = false;
}

// const handleMarkerPosition = (position, sortType) => {
//   if (sortType === "bubble") {
//     markerPosition = position + 5;
//     markerBubble.style.left = position + "rem";
//   }

//   if (sortType === "selection") {
//     markerPosition = position + 5;
//     markerSelection.style.left = position + "rem";
//   }
// };

async function selectionSort() {
  sortSelection.disabled = true;
  sortAll.disabled = true;

  // make copy of the original array
  let arr = array.slice();

  for (let i = 0; i < arr.length; i++) {
    let lowest = i;

    for (let j = i + 1; j < arr.length; j++) {
      await sleep(100);
      selectionColumns(arr, j);

      // handleMarkerPosition(markerPosition, "selection");

      if (arr[lowest] > arr[j]) {
        lowest = j;
      }
    }
    if (i !== lowest) {
      // SWAP!
      let temp = arr[i];
      arr[i] = arr[lowest];
      arr[lowest] = temp;

      // sort the columns
    }
    // console.log(i);
    // handleMarkerPosition(31.8, "selection");
  }
  // handleMarkerPosition(31.8, "selection");

  sortSelection.disabled = false;
  sortAll.disabled = false;
}

function init() {
  bubbleColumns(array);
  selectionColumns(array);
}
init();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
