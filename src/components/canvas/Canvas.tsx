import React, { useEffect, createRef, useContext } from 'react';
import './Canvas.css';
import { ArrayContext } from '../../contexts/array/ArrayContext';
import { setTimeout } from 'timers';
import { checkServerIdentity } from 'tls';
import SortingUtility from '../../algorithms/SortingUtility'
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

    const algSelect = () => {
        switch (alg) {
            case "bubble":
                console.log(alg);
                // bubbleSort(array);
                SortingUtility.bubbleSort(array, setArray)
                break;
            case "quick":
                console.log(alg);
                SortingUtility.quickSort(array, 0, array.length - 1, setArray)
                break
            case "selection":
                console.log(alg);
                SortingUtility.selectionSort(array, setArray);
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