import React from "react";
import "./BubbleContainer.scss";
import SortBody from "../BubbleSortBody/BubbleSortBody";
import SortBtn from "../SortBtn/SortBtn";

function BubbleSort() {
  return (
    <>
      <div class="bubble-sort-container">
        <div class="btns-container">
          <SortBtn type={"Bubble"}></SortBtn>
        </div>
        <SortBody></SortBody>
      </div>
    </>
  );
}
export default BubbleSort;
