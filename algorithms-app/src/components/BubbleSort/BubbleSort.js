import React from "react";
import "./BubbleSort.scss";
import SortBody from "../SortBody/SortBody";
import SortBtn from "../SortBtn/SortBtn";

function BubbleSort() {
  return (
    <>
      <div class="bubble-sort-container">
        <div class="btns-container">
          <SortBtn></SortBtn>
        </div>
        <SortBody></SortBody>
      </div>
    </>
  );
}
export default BubbleSort;
