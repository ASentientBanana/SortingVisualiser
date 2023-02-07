import React, {
  useEffect,
  createRef,
  useState,
  useCallback,
  useRef,
  MutableRefObject
} from "react";
import "./Canvas.css";
import SortingUtility from "../../algorithms/SortingUtility";
interface IProps {
  alg: string;
  arrayState: any;
  newArr: MutableRefObject<number[]>
}

const Canvas = ({ alg, arrayState, newArr }: IProps) => {
  const canvasRef = createRef<HTMLCanvasElement>();

  const beginRef = useRef(0);
  const endRef = useRef(0);

  const clickState = useRef(true);
  const sortedState = useRef(false);

  //#region  Canvas Draw
  const canvasSize = (canvasProp: HTMLCanvasElement) => {
    canvasProp.height = window.innerHeight * 0.6;
    canvasProp.width = window.innerWidth * 0.6;
    return { x: canvasProp.width, y: canvasProp.height };
  };

  const drawBars = (
    ctx: CanvasRenderingContext2D,
    canvasSize: any,
    randomArray: number[],
    barSizeNormalizer: number
  ) => {
    const count = randomArray.length;
    const barWidth = canvasSize.x / count;
    for (let i = 0; i < count; i++) {
      if (i === beginRef.current) {
        ctx.fillStyle = "red";

      } else if (endRef.current === i) {
        ctx.fillStyle = "green";
      } else {

        ctx.fillStyle = "#eab354";
      }

      ctx.fillRect(
        i * barWidth,
        canvasSize.y,
        barWidth,
        randomArray[i] * -barSizeNormalizer
      );
    }
  };

  const drawRemaster = useCallback(() => {
    if (!canvasRef.current) return;
    const canvasContext = canvasRef.current.getContext("2d");
    if (!canvasContext) return;
    const sizeOfCanvas = canvasSize(canvasRef.current);
    const barSizeNormalizer = editBarHeight(newArr.current, canvasRef.current);
    drawBars(canvasContext, sizeOfCanvas, newArr.current, barSizeNormalizer);
  }, [canvasRef, drawBars]);

  const editBarHeight = (randomArray: number[], canvas: HTMLCanvasElement) => {
    let heighestNumber = 0;
    for (let i = 0; i < randomArray.length; i++) {
      if (randomArray[i] > heighestNumber) heighestNumber = randomArray[i];
    }
    return canvas.height / heighestNumber;
  };

  const bubbleSort = async () => {
    await SortingUtility.bubbleSortRemaster(newArr, beginRef, endRef, drawRemaster)
    clickState.current = true;
    sortedState.current = true;
    //cleanup
    beginRef.current = -1;
    endRef.current = -1;
    drawRemaster();
  }

  const quicksort = async () => {
    let cnt = 0;
    await SortingUtility.quickSort(
      newArr,
      0,
      newArr.current.length - 1,
      drawRemaster,
      cnt,
      beginRef,
      endRef
    );
    clickState.current = true;
    sortedState.current = true;
    beginRef.current = -1;
    endRef.current = -1;
    drawRemaster();
  }

  const selectionSort = async () => {
    await SortingUtility.selectionSort(newArr, beginRef, endRef, drawRemaster);
    clickState.current = true;
    sortedState.current = true;
    beginRef.current = -1;
    endRef.current = -1;
    drawRemaster();

  }

  const algSelect = () => {
    if (sortedState.current === true) {
      newArr.current = [...arrayState];
    }
    clickState.current = false;
    switch (alg) {
      case "bubble":
        bubbleSort()
        break;
      case "quick":
        quicksort();
        break;
      case "selection":
        selectionSort();
        break;
      default:
        break;
    }
  };

  const clickHandler = () => {
    if (clickState.current) {
      if (sortedState.current) {

        newArr.current = [...arrayState];
        drawRemaster();
        sortedState.current = false;
      } else {
        algSelect();
      }
    }
  }

  useEffect(() => {
    if (canvasRef.current != null) {
      drawRemaster();
      window.addEventListener('resize', () => {
        drawRemaster();
      });
    }
  }, [canvasRef]);



  return (
    <div>
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          className="canvas"
          onClick={clickHandler}
        ></canvas>
        <h3 className="title-text">Click to see {alg} sort</h3>
      </div>
    </div>
  );
};

export default Canvas;
