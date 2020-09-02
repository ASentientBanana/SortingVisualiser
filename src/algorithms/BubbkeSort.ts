
import React from 'react';
class Sorting{

    sleep = (time: number) => {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    swap = (array: number[], i: number, j: number) => {
        const tmp = array[i]
        array[i] = array[j];
        array[j] = tmp;
    }

    bubbleSort = async (array: number[],setTheArray:Function) => {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (array[i] < array[j]) {
                    this.sleep(0.1);
                    await this.swap(array, i, j);
                    console.log(array);
                    await setTheArray(array);
                }
            }
        }
         return array;
    }

     partition = (arr: number[], pivot: number, left: number, right: number) => {
        var pivotValue = arr[pivot],
            partitionIndex = left;
        for (var i = left; i < right; i++) {
            if (arr[i] < pivotValue) {
                this.swap(arr, i, partitionIndex);
                partitionIndex++;
            }
        }
        this.swap(arr, right, partitionIndex);
        return partitionIndex;
    }

    quickSort = (arr: number[], left: number, right: number) => {
        var len = arr.length,
            pivot,
            partitionIndex;


        if (left < right) {
            pivot = right;
            partitionIndex = this.partition(arr, pivot, left, right);

            this.quickSort(arr, left, partitionIndex - 1);
            this.quickSort(arr, partitionIndex + 1, right);
        }
        return arr;
    }

    mergeSort = async (unsortedArray: number[]): Promise<any> => {
        if (unsortedArray.length <= 1) {
            return unsortedArray;
        }
        const middle = Math.floor(unsortedArray.length / 2);

        const left = unsortedArray.slice(0, middle);
        const right = unsortedArray.slice(middle);
        await this.sleep(20)
        const tmp = this.merge(
            await this.mergeSort(left), await this.mergeSort(right)
        );
        console.log(await tmp);
        return tmp
    }

    merge = async (left: number[], right: number[]) => {
        let resultArray = [], leftIndex = 0, rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                resultArray.push(left[leftIndex]);
                leftIndex++; // move left array cursor
            } else {
                resultArray.push(right[rightIndex]);
                rightIndex++; // move right array cursor
            }

        }
        return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
    }

}


export default Sorting;