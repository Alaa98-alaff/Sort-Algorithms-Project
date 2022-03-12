const array = [1, 4, 10, 4, 2, 14, 9, 8, 11, 3, 1, 12, 4, 6, 1, 4, 2, 13, 5];

const bubbleBody = document.querySelector(".bubble-body");
const selectionBody = document.querySelector(".selection-body");
const sortBubble = document.querySelector(".sort-bubble");
const sortSelection = document.querySelector(".sort-selection");
const sortAll = document.querySelector(".sort-all");
const markerBubble = document.querySelector(".bubble-marker");
const markerContainerBubble = document.querySelector(
  ".marker-container-bubble"
);
const markerContainerSelection = document.querySelector(
  ".marker-container-selection"
);

let markerPosition = 31.8;

sortBubble.addEventListener("click", bubbleSort);
sortSelection.addEventListener("click", selectionSort);
sortAll.addEventListener("click", handleSortAll);

function generateBubbleCol(arr, currentColIndex) {
  if (arr.length >= 0) {
    bubbleBody.innerHTML = "";

    for (let i = 0; i < arr.length; i++) {
      const column = document.createElement("div");
      column.classList.add("column");
      column.setAttribute("order", i);

      // for slow show
      if (currentColIndex >= 0) {
        if (currentColIndex === i) {
          column.style.background = "black";
        }
      }

      column.style.height = `${arr[i] * 1.6}rem`;
      bubbleBody.appendChild(column);
    }
  }
}

function generateSelectionCol(arr, currentColIndex) {
  if (arr.length >= 0) {
    selectionBody.innerHTML = "";

    for (let i = 0; i < arr.length; i++) {
      const column = document.createElement("div");
      column.classList.add("column");
      column.setAttribute("order", i);

      // for slow show
      if (currentColIndex >= 0) {
        if (currentColIndex === i) {
          column.style.background = "black";
        }
      }

      column.style.height = `${arr[i] * 1.6}rem`;
      selectionBody.appendChild(column);
    }
  }
}

function generateMarker(arr, currentColIndex, sortType) {
  if (arr.length >= 0 && sortType) {
    let markerContainer;

    if (sortType === "bubble") {
      markerContainer = markerContainerBubble;
    } else if (sortType === "selection") {
      markerContainer = markerContainerSelection;
    }

    if (sortType) markerContainer.innerHTML = "";

    arr.map((el, index) => {
      const marker = document.createElement("div");
      marker.classList.add("marker");
      marker.setAttribute("order", index);
      marker.style.opacity = 0;

      if (currentColIndex >= 0) {
        if (currentColIndex === index) {
          marker.style.opacity = 1;
        }
      }
      markerContainer.appendChild(marker);
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

    for (let j = 0; j < i; j++) {
      await sleep(1000);
      generateBubbleCol(arr, j);
      generateMarker(arr, j, "bubble");

      if (j < i - 1) {
        if (arr[j] > arr[j + 1]) {
          //SWAP!
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          noSwaps = false;
        }
      }
    }

    if (noSwaps) {
      break;
    }
  }

  sortBubble.disabled = false;
  sortAll.disabled = false;
}

async function selectionSort() {
  sortSelection.disabled = true;
  sortAll.disabled = true;

  // make copy of the original array
  let arr = array.slice();

  for (let i = 0; i < arr.length; i++) {
    let lowest = i;

    for (let j = i + 1; j <= arr.length; j++) {
      await sleep(500);
      generateSelectionCol(arr, j - 1);
      generateMarker(arr, j - 1, "selection");

      if (arr[lowest] > arr[j]) {
        lowest = j;
      }
    }
    if (i !== lowest) {
      // SWAP!
      let temp = arr[i];
      arr[i] = arr[lowest];
      arr[lowest] = temp;
    }
  }

  sortSelection.disabled = false;
  sortAll.disabled = false;
}

function init() {
  generateBubbleCol(array);
  generateSelectionCol(array);
  generateMarker(array);
}
init();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function handleSortAll() {
  bubbleSort();
  selectionSort();
}
