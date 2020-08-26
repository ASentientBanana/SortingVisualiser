import React, { useEffect,createRef,useContext} from 'react';
import './Canvas.css';
import {ArrayContext} from '../../contexts/array/ArrayContext';
import { setTimeout } from 'timers';

const Canvas = () => {
    const canvasRef = createRef<HTMLCanvasElement>();
    const [arrayContext,setArrayContext] = useContext(ArrayContext);
    const canvasSize = (canvasProp:HTMLCanvasElement) =>{
        canvasProp.height = window.innerHeight*0.6;
        canvasProp.width = window.innerWidth*0.6;
        return {x:canvasProp.width,y:canvasProp.height}
    }
    const drawBars = (ctx:CanvasRenderingContext2D,canvasSize:any,randomArray:number[],barSizeNormalizer:number) =>{
        const count = randomArray.length;
        const barWidth = canvasSize.x / count;
        for(let i = 0; i < count; i++){
            ctx.fillStyle = '#eab354';
            ctx.fillRect(i * barWidth , canvasSize.y, barWidth, randomArray[i]*-barSizeNormalizer);
        }
    }
    const editBarHeight = (randomArray:number[],canvas:HTMLCanvasElement)=>{
        let heighestNumber = 0;
        for(let i = 0;i<randomArray.length;i++){
            if(randomArray[i]> heighestNumber) heighestNumber = randomArray[i]
        }
        return canvas.height/heighestNumber;
    }
    const bubbleSort = (array:number[]) =>{
        for(let i = 0;i<array.length;i++){
            for(let j = 0; j<array.length;j++){
                if(array[i]<array[j]){
                    let tmp =array[i]
                    array[i] = array[j];
                    array[j] = tmp;
            }
        }
    }
    setArrayContext([...array]);
    }
    const sleep = (time:number)=>{
        return new Promise(resolve=>setTimeout(resolve,time));
    }
    const swap = async (array:number[],i:number, j:number) =>{
        let tmp =array[i]
        array[i] = array[j];
        array[j] = tmp;
        setArrayContext([...array])
        console.log('swaping');
        
    }

    const  partition = async (items:number[], left:number, right:number) => {
        let pivot   = items[Math.floor((right + left) / 2)], //middle element
            i       = left, //left pointer
            j       = right; //right pointer
        while (i <= j) {
            while (items[i] < pivot) {
                console.log('e1');
                i++;
            }
            while (items[j] > pivot) {
                console.log('e2');
                j--;
            }
            if (i <= j) {
                console.log('e3');
                
                await swap(items, i, j); //swap two elements
                i++;
                j--;
            }
        }
        return i;
    }
    const quicksort = async (items:number[], left:number, right:number) =>{
        if(left >= right) return;
        let index =  await partition(items, left, right); //index returned from partition
        await Promise.all([quicksort(items, left, index - 1),quicksort(items, index, right)])
    return items;

    }
        
            useEffect(()=>{
                if(canvasRef.current != null  ){
                    const canvasContext = canvasRef.current.getContext("2d");
                    const sizeOfCanvas = canvasSize(canvasRef.current);
                    const barSizeNormalizer = editBarHeight(arrayContext,canvasRef.current)
                    if(canvasContext != null ) drawBars(canvasContext,sizeOfCanvas,arrayContext,barSizeNormalizer)
                }
            },[arrayContext,canvasRef]);
            return (
                <div className='container canvas-container'>
        <canvas ref = {canvasRef} className='canvas' onClick={()=>{
        //    quicksort(arrayContext,0,arrayContext.lenght);            
        }}>
        </canvas>
        </div>
    
    )
}

export default Canvas

