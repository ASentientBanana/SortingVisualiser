import React, { MutableRefObject } from "react";

class SortingUtility {
  static delay = 2;

  static sleep(time: number = 0) {
    return new Promise((resolve) => setTimeout(resolve, SortingUtility.delay));
  }
  static swap(
    array: number[],
    i: number,
    j: number,
    updateColor: Function,
    updateColor2: Function
  ) {
    updateColor(i);
    updateColor2(j);
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }

  static swapRemaster(
    array: MutableRefObject<number[]>,
    i: number,
    j: number,
    c1?: MutableRefObject<number>,
    c2?: MutableRefObject<number>
  ) {
    if (c1 && c2) {
      c1.current = i;
      c2.current = j;
    }
    let tmp = array.current[i];
    array.current[i] = array.current[j];
    array.current[j] = tmp;
  }

  static async bubbleSortRemaster(
    array: MutableRefObject<number[]>,
    c1: MutableRefObject<number>,
    c2: MutableRefObject<number>,
    draw: () => void,
  ) {
    const len = array.current.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (array.current[i] < array.current[j]) {
          await this.sleep(2);
          c1.current = i;
          c2.current = j;
          SortingUtility.swapRemaster(array, i, j);
          draw();
        }
      }
    }
    return array;
  }

  static partition = async (
    arr: MutableRefObject<number[]>,
    pivot: number,
    left: number,
    right: number,
    c1: MutableRefObject<number>,
    c2: MutableRefObject<number>,
    draw: () => void,
  ) => {
    let pivotValue = arr.current[pivot],
      partitionIndex = left;
    for (let i = left; i < right; i++) {
      if (arr.current[i] < pivotValue) {
        SortingUtility.swapRemaster(arr, i, partitionIndex, c1, c2);
        await SortingUtility.sleep(2);
        partitionIndex++;
        draw();
      }
    }
    SortingUtility.swapRemaster(arr, right, partitionIndex, c1, c2);
    draw();
    return partitionIndex;
  };

  static quickSort = async (
    arr: MutableRefObject<number[]>,
    left: number,
    right: number,
    draw: () => void,
    cnt: number,
    c1: MutableRefObject<number>,
    c2: MutableRefObject<number>,
  ) => {
    if (left < right) {
      const pivot = right;

      const partitionIndex: number = await SortingUtility.partition(
        arr,
        pivot,
        left,
        right,
        c1,
        c2,
        draw
      );
      await SortingUtility.sleep(2);

      await Promise.all([
        SortingUtility.quickSort(
          arr,
          left,
          partitionIndex - 1,
          draw,
          cnt++,
          c1,
          c2
        ),
        SortingUtility.quickSort(
          arr,
          partitionIndex + 1,
          right,
          draw,
          cnt++,
          c1,
          c2
        ),
      ]);
    }
  };

  static selectionSort = async (
    array: MutableRefObject<number[]>,
    c1: MutableRefObject<number>,
    c2: MutableRefObject<number>,
    draw: () => void
  ) => {
    const len = array.current.length;
    for (let i = 0; i < len; i++) {
      //set min to the current iteration of i
      let min = i;
      for (let j = i + 1; j < len; j++) {
        if (array.current[j] < array.current[min]) {
          min = j;
        }
      }
      SortingUtility.swapRemaster(array, i, min, c1, c2);
      await SortingUtility.sleep(2);
      draw();
    }
    return array;
  };
}
export default SortingUtility;
