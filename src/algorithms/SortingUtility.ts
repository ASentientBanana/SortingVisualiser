import React from "react";

class SortingUtility {
  static sleep(time: number = 0) {
    return new Promise((resolve) => setTimeout(resolve, time));
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

  static async bubbleSort(
    array: number[],
    updateArray: Function,
    updateColor: Function,
    updateColor2: Function
  ) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (array[i] < array[j]) {
          await this.sleep(2);
          SortingUtility.swap(array, i, j, updateColor, updateColor2);
          updateArray([...array]);
        }
      }
    }
    return array;
  }

  static partition = async (
    arr: number[],
    pivot: number,
    left: number,
    right: number,
    updateArray: Function,
    setCurrNum1: Function,
    setCurrNum2: Function
  ) => {
    let pivotValue = arr[pivot],
      partitionIndex = left;
    for (let i = left; i < right; i++) {
      if (arr[i] < pivotValue) {
        SortingUtility.swap(arr, i, partitionIndex, setCurrNum1, setCurrNum2);
        if (updateArray) updateArray([...(await arr)]);
        await SortingUtility.sleep(2);
        partitionIndex++;
      }
    }
    SortingUtility.swap(arr, right, partitionIndex, setCurrNum1, setCurrNum2);
    return partitionIndex;
  };

  static quickSort = async (
    arr: number[],
    left: number,
    right: number,
    updateArray: Function,
    setCurrNum1: Function,
    setCurrNum2: Function,
    cnt: number
  ) => {
    if (left < right) {
      const pivot = right;

      const partitionIndex: number = await SortingUtility.partition(
        arr,
        pivot,
        left,
        right,
        updateArray,
        setCurrNum1,
        setCurrNum2
      );
      await Promise.all([
        SortingUtility.quickSort(
          arr,
          left,
          partitionIndex - 1,
          updateArray,
          setCurrNum1,
          setCurrNum2,
          cnt++
        ),
        SortingUtility.quickSort(
          arr,
          partitionIndex + 1,
          right,
          updateArray,
          setCurrNum1,
          setCurrNum2,
          cnt++
        ),
      ]);
    }
    if (cnt === 0) console.log("done");

    return await arr;
  };

  static selectionSort = async (
    array: number[],
    updateArray: Function,
    setCurrNum1: Function,
    setCurrNum2: Function
  ) => {
    for (let i = 0; i < array.length; i++) {
      //set min to the current iteration of i
      let min = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[min]) {
          min = j;
        }
      }
      SortingUtility.swap(array, i, min, setCurrNum1, setCurrNum2);
      await SortingUtility.sleep(2);
      updateArray([...array]);
    }
    return array;
  };
}
export default SortingUtility;
