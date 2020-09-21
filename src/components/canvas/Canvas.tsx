import React, { useEffect, createRef, useContext } from 'react';
import './Canvas.css';
import { ArrayContext } from '../../contexts/array/ArrayContext';
import { setTimeout } from 'timers';
import { checkServerIdentity } from 'tls';

interface canvas {
    alg: string
    arrayState: any
}

const Canvas = ({ alg, arrayState }: canvas) => {
    const canvasRef = createRef<HTMLCanvasElement>();

    const [array, setArray] = arrayState;
    //#region  Canvas Draw
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
    //#endregion 

    //#region util
    const sleep = (time: number = 0) => {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    const swap = (array: number[], i: number, j: number) => {
        let tmp = array[i]
        array[i] = array[j];
        array[j] = tmp;
    }
    //#endregion

    //#region  bubble
    const bubbleSort = async (array: number[]) => {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (array[i] < array[j]) {
                    await sleep();
                    swap(array, i, j);
                    setArray([...array])
                }
            }
        }
        return array;
    }
    //#endregion

    //#region quick
    const partition = async (arr: number[], pivot: number, left: number, right: number) => {
        var pivotValue = arr[pivot],
            partitionIndex = left;
        for (var i = left; i < right; i++) {
            if (arr[i] < pivotValue) {
                await swap(arr, i, partitionIndex);
                setArray([...await arr])
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
    //#endregion

    //#region selection

    const selectionSort = (array: number[]) => {
        const arrLen = array.length;
        for (let i = 0; i < arrLen - 1; i++) {
            let min_idx = i;
            for (let j = i + 1; j < arrLen; j++) {
                if (array[j] < array[min_idx]) {
                    min_idx = j;
                    swap(array, min_idx, i)
                    setArray([...array]);
                }
            }
        }
    }

    //#endregion

    const algSelect = () => {
        switch (alg) {
            case "bubble":
                console.log(alg);
                bubbleSort(array);
                break;
            case "quick":
                console.log(alg);
                quickSort(array, 0, array.length - 1)
                break
            case "selection":
                console.log(alg);
                selectionSort(array);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (canvasRef.current != null) {
            const canvasContext = canvasRef.current.getContext("2d");
            const sizeOfCanvas = canvasSize(canvasRef.current);
            const barSizeNormalizer = editBarHeight(array, canvasRef.current)
            if (canvasContext != null) drawBars(canvasContext, sizeOfCanvas, array, barSizeNormalizer)
        }
    }, [array, canvasRef]);
    return (
        <div className='canvas-container'>
            <canvas ref={canvasRef} className='canvas' onClick={() => {
                algSelect();
            }}>
            </canvas>
            <h3 className="title-text">Click to see {alg} sort</h3>
        </div>
    )
}

export default Canvas