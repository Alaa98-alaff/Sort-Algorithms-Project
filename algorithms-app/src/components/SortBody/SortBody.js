import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./SortBody.scss";
import { bArray } from "../../helpers/variables";
import { generateBubbleColumn } from "../../helpers/generateColumns";

function SortBody({ ...props }) {
  const { bubbleArr, currentSortingCol, bubbleSortLowSpeed } = props;

  useEffect(() => {
    generateBubbleColumn(bubbleArr, bubbleSortLowSpeed, currentSortingCol);
  }, [bubbleArr]);

  useEffect(() => {
    generateMarker(bubbleArr, currentSortingCol, "bubble");
  }, [currentSortingCol]);

  function generateMarker(arr, currentColIndex) {
    if (arr.length >= 0) {
      const marker = arr.map((item, i) => {
        return (
          <div
            key={i}
            order={i}
            className="marker"
            style={i === currentColIndex ? { opacity: "1" } : { opacity: 0 }}
          ></div>
        );
      });

      return marker;
    }
  }

  return (
    <div className="sort-container">
      <div className="sort-body bubble-body">
        {generateBubbleColumn(bubbleArr, bubbleSortLowSpeed, currentSortingCol)}
      </div>
      <div className="marker-container-bubble">
        {generateMarker(bArray, currentSortingCol)}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    bubbleArr: state.bubbleSortReducer.bubbleArr,
    currentSortingCol: state.bubbleSortReducer.currentSortingCol,
    bubbleSortLowSpeed: state.bubbleSortReducer.bubbleSortLowSpeed,
  };
};

export default connect(mapStateToProps)(SortBody);
