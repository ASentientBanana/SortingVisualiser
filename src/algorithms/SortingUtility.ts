import React from 'react'

class SortingUtility {

    static sleep(time: number = 0) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    static swap(array: number[], i: number, j: number) {
        let tmp = array[i]
        array[i] = array[j];
        array[j] = tmp;
    }

    static async bubbleSort(array: number[], updateArray: Function) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (array[i] < array[j]) {
                    await this.sleep(10);
                    SortingUtility.swap(array, i, j);
                    updateArray([...array])
                }
            }
        }
        return array;
    }

    static partition = async (arr: number[], pivot: number, left: number, right: number, updateArray: Function) => {
        let pivotValue = arr[pivot],
            partitionIndex = left;
        for (let i = left; i < right; i++) {
            if (arr[i] < pivotValue) {
                await SortingUtility.swap(arr, i, partitionIndex);
                if (updateArray) updateArray([...await arr])
                await SortingUtility.sleep(0.5)
                partitionIndex++;
            }
        }
        await SortingUtility.swap(arr, right, partitionIndex);
        return partitionIndex;
    }

    static quickSort = async (arr: number[], left: number, right: number, updateArray: Function) => {
        if (left < right) {
            const pivot = right;
            const partitionIndex: number = await SortingUtility.partition(arr, pivot, left, right, updateArray);
            await Promise.all([SortingUtility.quickSort(arr, left, partitionIndex - 1, updateArray), SortingUtility.quickSort(arr, partitionIndex + 1, right, updateArray)])
        }
        return await arr;
    }

    static selectionSort = async (array: number[], updateArray: Function) => {
        for (let i = 0; i < array.length; i++) {
            //set min to the current iteration of i
            let min = i;
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] < array[min]) {
                    min = j;
                }
            }
            let temp = array[i];
            array[i] = array[min];
            array[min] = temp;
            await SortingUtility.sleep(50);
            updateArray([...array])
        }
        return array;
    };

}
export default SortingUtility