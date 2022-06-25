const generateBubbleColumn = (arr, bubbleSortLowSpeed, currentSortingCol) => {
  const column = arr.map((item, i) => {
    return (
      <div
        key={i}
        order={i}
        className="column"
        style={
          bubbleSortLowSpeed && currentSortingCol !== null
            ? currentSortingCol === i
              ? { background: "red", height: item + "rem" }
              : currentSortingCol + 1 === i
              ? { background: "black", height: item + "rem" }
              : { background: "#fca70a", height: item + "rem" }
            : { height: item + "rem" }
        }
      ></div>
    );
  });
  return column;
};

export { generateBubbleColumn };
