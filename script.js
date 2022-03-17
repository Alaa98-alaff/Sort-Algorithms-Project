const array = [4, 1, 10, 4, 2, 14, 9, 8, 11, 3, 1, 12, 4, 6, 1, 4, 2, 13, 5];

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
const lowSpeedBubble = document.querySelector(".low-speed-bubble");

sortBubble.addEventListener("click", bubbleSort);
sortSelection.addEventListener("click", selectionSort);
sortAll.addEventListener("click", handleSortAll);
lowSpeedBubble.addEventListener("click", handleLowSpeedBubble);

let bubbleColumns = [];
let bubbleSortLowSpeed = false;

function handleLowSpeedBubble() {
  bubbleSortLowSpeed = true;
  bubbleSort();
}

function generateColumn(arr) {
  for (let i = 0; i < arr.length; i++) {
    const column = document.createElement("div");
    column.classList.add("column");
    column.setAttribute("order", i);
    column.style.order = i;

    column.style.height = `${arr[i] * 1.6}rem`;
    bubbleColumns.push(column);

    bubbleBody.appendChild(column);
  }
}

function bubbleColumnColor(columns, currentColIndex, handle) {
  if (handle === "set") {
    for (let i = 0; i < columns.length; i++) {
      if (i === currentColIndex) {
        columns[i].style.background = "red";
      } else {
        columns[i].style.background = "#fca70a";
      }

      for (let j = 0; j < columns.length; j++) {
        if (j === currentColIndex && j < i) {
          columns[j + 1].style.background = "black";
        }
      }
    }
  }

  if (handle === "remove") {
    for (let i = 0; i < columns.length; i++) {
      columns[i].style.background = "#fca70a";
    }
  }
}

async function swapCol(currentColIndex) {
  bubbleSortLowSpeed ? await sleep(600) : null;
  let temp = copyBubbleList[currentColIndex].style.order;
  copyBubbleList[currentColIndex].style.order =
    copyBubbleList[currentColIndex + 1].style.order;
  copyBubbleList[currentColIndex + 1].style.order = temp;

  let temp2 = copyBubbleList[currentColIndex];
  copyBubbleList[currentColIndex] = copyBubbleList[currentColIndex + 1];
  copyBubbleList[currentColIndex + 1] = temp2;

  bubbleSortLowSpeed ? await sleep(200) : null;
  bubbleSortLowSpeed
    ? bubbleColumnColor(copyBubbleList, undefined, "remove")
    : null;
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
  lowSpeedBubble.disabled = true;

  // make copy of the original array
  let arr = array.slice();

  for (let i = arr.length; i > 0; i--) {
    let noSwaps = true;

    for (let j = 0; j < i; j++) {
      bubbleSortLowSpeed ? await sleep(1000) : await sleep(100);
      generateMarker(arr, j, "bubble");

      if (j < i - 1) {
        if (arr[j] > arr[j + 1]) {
          //SWAP!
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          noSwaps = false;

          swapCol(j);
        }

        bubbleSortLowSpeed ? bubbleColumnColor(copyBubbleList, j, "set") : null;
      }
    }

    if (noSwaps) {
      break;
    }
  }

  sortBubble.disabled = false;
  sortAll.disabled = false;
  lowSpeedBubble.disabled = false;
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
  generateColumn(array);
  generateSelectionCol(array);
  generateMarker(array);
}
init();

let copyBubbleList = bubbleColumns.slice();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function handleSortAll() {
  bubbleSort();
  selectionSort();
}
