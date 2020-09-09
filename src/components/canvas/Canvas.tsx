import React, { useEffect, createRef, useContext } from 'react';
import './Canvas.css';
import { ArrayContext } from '../../contexts/array/ArrayContext';
import { setTimeout } from 'timers';
import { checkServerIdentity } from 'tls';

interface canvas {
    alg: string
}

const Canvas = ({ alg }: canvas) => {
    const canvasRef = createRef<HTMLCanvasElement>();

    const [bubbleArray, setBubbleArray] = useContext(ArrayContext);
    const [quickArray, setQuickArray] = useContext(ArrayContext);
    const [mergeArray, setMergeArray] = useContext(ArrayContext);


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

    const sleep = (time: number = 0) => {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    const swap = (array: number[], i: number, j: number) => {
        let tmp = array[i]
        array[i] = array[j];
        array[j] = tmp;

    }

    const bubbleSort = async (array: number[]) => {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (array[i] < array[j]) {
                    await sleep();
                    swap(array, i, j);
                    setBubbleArray([...array])
                }
            }
        }
        return array;
    }



    const partition = async (arr: number[], pivot: number, left: number, right: number) => {
        var pivotValue = arr[pivot],
            partitionIndex = left;
        for (var i = left; i < right; i++) {
            if (arr[i] < pivotValue) {
                await swap(arr, i, partitionIndex);
                setQuickArray([... await arr])
                await sleep(0.5)
                partitionIndex++;
            }
        }
        await swap(arr, right, partitionIndex);
        return partitionIndex;
    }

    const quickSort = async (arr: number[], left: number, right: number) => {

        if (left < right) {
            const pivot = right;
            const partitionIndex: any = await partition(arr, pivot, left, right);
            await Promise.all([quickSort(arr, left, partitionIndex - 1), quickSort(arr, partitionIndex + 1, right)])
        }
        return await arr;
    }



    const mergeSort = async (unsortedArray: number[]): Promise<any> => {
        if (unsortedArray.length <= 1) return unsortedArray;

        const middle = Math.floor(unsortedArray.length / 2);
        const left = unsortedArray.slice(0, middle);
        const right = unsortedArray.slice(middle);
        // await sleep(500)
        // console.log([1,23].concat([54]));
        // setMergeArray([...ARR])
        const tmp = await merge(
            await mergeSort(left), await mergeSort(right)
        );
     
        return tmp
    }


    const merge = async (left: number[], right: number[]) => {
        let resultArray = [], leftIndex = 0, rightIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                resultArray.push(left[leftIndex]);
                leftIndex++;
            } else {
                resultArray.push(right[rightIndex]);
                rightIndex++;
            }

        }
        console.log(resultArray);
        
        const r = resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
        await sleep(200)
        
        return await r
    }
    const checkAlg = (bubble: any, quick: any, merge: any,) => {
        switch (alg) {
            case "bubble":
                return bubble
            case "quick":
                return quick
            case "merge":
                return merge
            default:
                return bubble
        }
    }
    useEffect(() => {
        if (canvasRef.current != null) {
            const canvasContext = canvasRef.current.getContext("2d");
            const sizeOfCanvas = canvasSize(canvasRef.current);
            const barSizeNormalizer = editBarHeight(checkAlg(bubbleArray, quickArray, mergeArray), canvasRef.current)
            if (canvasContext != null) drawBars(canvasContext, sizeOfCanvas, checkAlg(bubbleArray, quickArray, mergeArray), barSizeNormalizer)
        }
    }, [checkAlg(bubbleArray, quickArray, mergeArray), canvasRef]);
    return (
        <div className='container canvas-container'>
            <canvas ref={canvasRef} className='canvas' onClick={() => {
                switch (alg) {
                    case "bubble":
                        bubbleSort(bubbleArray);
                        break;
                    case "quick":
                        quickSort(quickArray, 0, quickArray.lenght - 1);
                        console.log(quickSort(quickArray, 0, quickArray.lenght - 1));
                        break;
                    case "merge":
                        mergeSort(mergeArray);
                        break;

                    default:
                        break;
                }
                console.log(alg);

            }}>
            </canvas>
            <h3>Click to see {alg}</h3>
        </div>

    )
}

export default Canvas