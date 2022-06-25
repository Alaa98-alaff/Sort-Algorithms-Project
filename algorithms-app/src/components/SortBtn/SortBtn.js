import { useEffect, useState } from "react";
import "./SortBtn.scss";
import { connect } from "react-redux";
import dispatch from "../../redux/dispatch";
import * as actionTypes from "../../redux/actionTypes";
import bubbleSortAlgo from "../../helpers/Algorithms/handleBubbleAl";

function SortBtn({ ...props }) {
  const { bubbleSortLowSpeed, type } = props;

  useEffect(() => {
    if (bubbleSortLowSpeed) bubbleSortAlgo(bubbleSortLowSpeed);
  }, [bubbleSortLowSpeed]);

  const handleLowSpeedsort = () => {
    dispatch(actionTypes.LOW_SPEED_SORT, true);
  };

  return (
    <>
      <button
        class="sort-bubble btn"
        onClick={() => bubbleSortAlgo(bubbleSortLowSpeed)}
      >
        {type}
      </button>
      <button onClick={handleLowSpeedsort} class="low-speed-bubble btn">
        X.25 speed
      </button>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    bubbleSortLowSpeed: state.bubbleSortReducer.bubbleSortLowSpeed,
  };
};

export default connect(mapStateToProps)(SortBtn);
