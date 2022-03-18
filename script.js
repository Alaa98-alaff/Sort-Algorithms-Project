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
const lowSpeedBubbleBtn = document.querySelector(".low-speed-bubble");
const lowSpeedSelectionBtn = document.querySelector(".low-speed-selection");

sortBubble.addEventListener("click", bubbleSort);
sortSelection.addEventListener("click", selectionSort);
sortAll.addEventListener("click", handleSortAll);
lowSpeedBubbleBtn.addEventListener("click", handleLowSpeedBubble);
lowSpeedSelectionBtn.addEventListener("click", handleLowSpeedSelection);

let bubbleColumns = [];
let selectionColumns = [];
let bubbleSortLowSpeed = false;
let selectionSortLowSpeed = false;
let copyBubbleList;
let copySelectionList;

function handleLowSpeedBubble() {
  bubbleSortLowSpeed = true;
  bubbleSort();
}

function handleLowSpeedSelection() {
  selectionSortLowSpeed = true;
  selectionSort();
}

function generateBubbleColumn(arr) {
  for (let i = 0; i < arr.length; i++) {
    const column = document.createElement("div");
    column.classList.add("column");
    column.setAttribute("order", i);
    column.style.order = i;

    column.style.height = `${arr[i] * 1.6}rem`;
    bubbleColumns.push(column);

    bubbleBody.appendChild(column);
  }
  copyBubbleList = bubbleColumns.slice();
}

function generateSelectionColumn(arr) {
  for (let i = 0; i < arr.length; i++) {
    const column = document.createElement("div");
    column.classList.add("column");
    column.setAttribute("order", i);
    column.style.order = i;

    column.style.height = `${arr[i] * 1.6}rem`;
    selectionColumns.push(column);

    selectionBody.appendChild(column);
  }

  copySelectionList = selectionColumns.slice();
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

  if (bubbleSortLowSpeed) {
    await sleep(200);
    bubbleColumnColor(copyBubbleList, undefined, "remove");
  }
}

async function selectionColumnColor(
  columns,
  currentColIndex,
  handle,
  lowestValue
) {
  if (handle === "set") {
    for (let i = 0; i < columns.length; i++) {
      if (i === currentColIndex) {
        columns[i].style.background = "red";
        if (currentColIndex === lowestValue) await sleep(500);
      } else {
        columns[i].style.background = "#fca70a";
      }

      columns[lowestValue].style.background = "green";
    }
  }

  if (handle === "remove") {
    for (let i = 0; i < columns.length; i++) {
      columns[i].style.background = "#fca70a";
    }
  }
}

async function swapColSelection(currentLoopIndex, lowestValue) {
  selectionSortLowSpeed ? await sleep(600) : null;

  let temp = copySelectionList[lowestValue].style.order;
  copySelectionList[lowestValue].style.order =
    copySelectionList[currentLoopIndex].style.order;
  copySelectionList[currentLoopIndex].style.order = temp;

  let temp2 = copySelectionList[lowestValue];
  copySelectionList[lowestValue] = copySelectionList[currentLoopIndex];
  copySelectionList[currentLoopIndex] = temp2;
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
  lowSpeedBubbleBtn.disabled = true;

  // make copy of the original array
  let arr = array.slice();

  for (let i = arr.length; i > 0; i--) {
    let noSwaps = true;

    for (let j = 0; j < i; j++) {
      bubbleSortLowSpeed ? await sleep(1000) : await sleep(50);
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

        if (bubbleSortLowSpeed) bubbleColumnColor(copyBubbleList, j, "set");
      }
    }

    if (noSwaps) {
      break;
    }
  }

  sortBubble.disabled = false;
  sortAll.disabled = false;
  lowSpeedBubbleBtn.disabled = false;
}

async function selectionSort() {
  sortSelection.disabled = true;
  sortAll.disabled = true;
  lowSpeedSelectionBtn.disabled = true;

  // make copy of the original array
  let arr = array.slice();

  for (let i = 0; i < arr.length; i++) {
    let lowest = i;

    for (let j = i + 1; j <= arr.length; j++) {
      selectionSortLowSpeed ? await sleep(700) : await sleep(50);

      generateMarker(arr, j - 1, "selection");

      selectionSortLowSpeed
        ? await selectionColumnColor(copySelectionList, j - 1, "set", lowest)
        : null;

      if (arr[lowest] > arr[j]) {
        lowest = j;
      }
    }
    if (i !== lowest) {
      // SWAP!
      let temp = arr[i];
      arr[i] = arr[lowest];
      arr[lowest] = temp;

      swapColSelection(i, lowest);
    }
  }

  sortSelection.disabled = false;
  sortAll.disabled = false;
  lowSpeedSelectionBtn.disabled = false;
}

function init() {
  generateBubbleColumn(array);
  generateSelectionColumn(array);
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
