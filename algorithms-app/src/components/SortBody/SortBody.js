import React from "react";
import "./SortBody.scss";
import { array } from "../../helpers/variables";

function SortBody() {
  const generateBubbleColumn = (arr) => {
    const column = array.map((item, i) => {
      return (
        <div
          key={i}
          order={i}
          className="column"
          style={{ height: item + "rem" }}
        ></div>
      );
    });
    return column;
  };

  // function generateMarker(arr, currentColIndex, sortType) {
  //   if (arr.length >= 0 && sortType) {
  //     let markerContainer;

  //     if (sortType === "bubble") {
  //       markerContainer = markerContainerBubble;
  //     } else if (sortType === "selection") {
  //       markerContainer = markerContainerSelection;
  //     }

  //     if (sortType) markerContainer.innerHTML = "";

  //     arr.map((el, index) => {
  //       const marker = document.createElement("div");
  //       marker.classList.add("marker");
  //       marker.setAttribute("order", index);
  //       marker.style.opacity = 0;

  //       if (currentColIndex >= 0) {
  //         if (currentColIndex === index) {
  //           marker.style.opacity = 1;
  //         }
  //       }
  //       markerContainer.appendChild(marker);
  //     });
  //   }
  // }

  return (
    <div className="sort-container">
      <div className="sort-body bubble-body">{generateBubbleColumn(array)}</div>
      <div className="marker-container-bubble"></div>
    </div>
  );
}

export default SortBody;
