import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./SortBody.scss";
import { bArray } from "../../helpers/variables";

function SortBody({ ...props }) {
  const { bubbleArr } = props;

  const generateBubbleColumn = (arr) => {
    const column = arr.map((item, i) => {
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
      <div className="sort-body bubble-body">
        {generateBubbleColumn(bArray)}
      </div>
      <div className="marker-container-bubble"></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    bubbleArr: state.bubbleSortReducer.bubbleArr,
  };
};

export default connect(mapStateToProps)(SortBody);
