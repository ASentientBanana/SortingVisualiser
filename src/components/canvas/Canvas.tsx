import React, { useEffect, createRef, useContext } from 'react';
import './Canvas.css';
import { ArrayContext } from '../../contexts/array/ArrayContext';
import { setTimeout } from 'timers';
import { checkServerIdentity } from 'tls';

const Canvas = () => {
    const canvasRef = createRef<HTMLCanvasElement>();
    const [arrayContext, setArrayContext] = useContext(ArrayContext);
    const canvasSize = (canvasProp: HTMLCanvasElement) => {
        canvasProp.height = window.innerHeight * 0.6;
        canvasProp.width = window.innerWidth * 0.6;
        return { x: canvasProp.width, y: canvasProp.height }
    }
    const drawBars = (ctx: CanvasRenderingContext2D, canvasSize: any, randomArray: number[], barSizeNormalizer: number) => {
        const count = randomArray.length;
        const barWidth = canvasSize.x / count;
        for (let i = 0; i < count; i++) {
            ctx.fillStyle = '#eab354';
            ctx.fillRect(i * barWidth, canvasSize.y, barWidth, randomArray[i] * -barSizeNormalizer);
        }
    }
    const editBarHeight = (randomArray: number[], canvas: HTMLCanvasElement) => {
        let heighestNumber = 0;
        for (let i = 0; i < randomArray.length; i++) {
            if (randomArray[i] > heighestNumber) heighestNumber = randomArray[i]
        }
        return canvas.height / heighestNumber;
    }

    const sleep = (time: number) => {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    const swap = (array: number[], i: number, j: number) => {
        let tmp = array[i]
        array[i] = array[j];
        array[j] = tmp;
        setArrayContext([...array])

    }

    const bubbleSort = async (array: number[]) => {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (array[i] < array[j]) {
                    await sleep(0);
                    swap(array, i, j);
                }
            }
        }
        return array;
    }



    function partition(arr: number[], pivot: number, left: number, right: number) {
        var pivotValue = arr[pivot],
            partitionIndex = left;
        for (var i = left; i < right; i++) {
            if (arr[i] < pivotValue) {
                swap(arr, i, partitionIndex);
                partitionIndex++;
            }
        }
        swap(arr, right, partitionIndex);
        return partitionIndex;
    }

    function quickSort(arr: number[], left: number, right: number) {
        var len = arr.length,
            pivot,
            partitionIndex;


        if (left < right) {
            pivot = right;
            partitionIndex = partition(arr, pivot, left, right);

            //sort left and right
            quickSort(arr, left, partitionIndex - 1);
            quickSort(arr, partitionIndex + 1, right);
        }
        return arr;
    }


    const mergeSort = async (unsortedArray: number[]): Promise<any> => {
        // No need to sort the array if the array only has one element or empty
        if (unsortedArray.length <= 1) {
            return unsortedArray;
        }
        // In order to divide the array in half, we need to figure out the middle
        const middle = Math.floor(unsortedArray.length / 2);

        // This is where we will be dividing the array into left and right
        const left = unsortedArray.slice(0, middle);
        const right = unsortedArray.slice(middle);
        await sleep(20)
        const tmp = merge(
            await mergeSort(left), await mergeSort(right)
        );
        console.log(await tmp);
        setArrayContext([... await unsortedArray])
        // Using recursion to combine the left and right
        return tmp
    }

    // Merge the two arrays: left and right
    const merge = async (left: number[], right: number[]) => {
        let resultArray = [], leftIndex = 0, rightIndex = 0;

        // We will concatenate values into the resultArray in order
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                resultArray.push(left[leftIndex]);
                leftIndex++; // move left array cursor
            } else {
                resultArray.push(right[rightIndex]);
                rightIndex++; // move right array cursor
            }

        }
        // We need to concat here because there will be one element remaining
        // from either left OR the right
        // setArrayContext([...left,...right]);
        return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
    }

    useEffect(() => {
        if (canvasRef.current != null) {
            const canvasContext = canvasRef.current.getContext("2d");
            const sizeOfCanvas = canvasSize(canvasRef.current);
            const barSizeNormalizer = editBarHeight(arrayContext, canvasRef.current)
            if (canvasContext != null) drawBars(canvasContext, sizeOfCanvas, arrayContext, barSizeNormalizer)
        }
    }, [arrayContext, canvasRef]);
    return (
        <div className='container canvas-container'>
            <canvas ref={canvasRef} className='canvas' onClick={() => {
                //    console.log(quickSort(arrayContext,0,arrayContext.lenght));
                //   bubbleSort(arrayContext);
                //  setArrayContext([...res]);
                //  console.log(quickSort(arrayContext,0,6));
                console.log(mergeSort(arrayContext));

            }}>
            </canvas>
        </div>

    )
}

export default Canvas