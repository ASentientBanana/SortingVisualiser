import React, {
  useEffect,
  createRef,
  useState,
  useCallback,
  useRef,
} from "react";
import "./Canvas.css";
import SortingUtility from "../../algorithms/SortingUtility";
interface canvas {
  alg: string;
  arrayState: any;
}

const Canvas = ({ alg, arrayState }: canvas) => {
  const canvasRef = createRef<HTMLCanvasElement>();
  const [currNum, setCurrNum] = useState(0);
  const [currNum2, setCurrNum2] = useState(0);
  const [array, setArray] = arrayState;
  const clickState = useRef(true);
  const sortedState = useRef(false);
  const randArr = useRef([...array]);
  const [rend, setRend] = useState(false);

  //#region  Canvas Draw
  const canvasSize = (canvasProp: HTMLCanvasElement) => {
    canvasProp.height = window.innerHeight * 0.6;
    canvasProp.width = window.innerWidth * 0.6;
    return { x: canvasProp.width, y: canvasProp.height };
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const drawBars = (
    ctx: CanvasRenderingContext2D,
    canvasSize: any,
    randomArray: number[],
    barSizeNormalizer: number
  ) => {
    const count = randomArray.length;
    const barWidth = canvasSize.x / count;
    for (let i = 0; i < count; i++) {
      if (i === currNum) {
        ctx.fillStyle = "red";
      } else if (i === currNum2) {
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
  const draw = useCallback(() => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext("2d");
      const sizeOfCanvas = canvasSize(canvasRef.current);
      const barSizeNormalizer = editBarHeight(array, canvasRef.current);
      if (canvasContext)
        drawBars(canvasContext, sizeOfCanvas, array, barSizeNormalizer);
    }
  }, [array, canvasRef, drawBars]);
  const editBarHeight = (randomArray: number[], canvas: HTMLCanvasElement) => {
    let heighestNumber = 0;
    for (let i = 0; i < randomArray.length; i++) {
      if (randomArray[i] > heighestNumber) heighestNumber = randomArray[i];
    }
    return canvas.height / heighestNumber;
  };
  //#endregion

  const algSelect = () => {
    if (sortedState.current === true) {
      setArray(randArr.current);
    }
    clickState.current = false;
    switch (alg) {
      case "bubble":
        console.log(alg);
        Promise.resolve(
          SortingUtility.bubbleSort(array, setArray, setCurrNum, setCurrNum2)
        ).then((res) => {
          clickState.current = true;
          sortedState.current = true;
          setCurrNum(-1);
          setCurrNum2(-1);
          draw();
        });
        break;
      case "quick":
        console.log(alg);
        let cnt = 0;
        Promise.resolve(
          SortingUtility.quickSort(
            array,
            0,
            array.length - 1,
            setArray,
            setCurrNum,
            setCurrNum2,
            cnt
          )
        ).then((res) => {
          clickState.current = true;
          sortedState.current = true;
          setCurrNum(-1);
          setCurrNum2(-1);
          draw();
        });
        break;
      case "selection":
        console.log(alg);
        Promise.resolve(
          SortingUtility.selectionSort(array, setArray, setCurrNum, setCurrNum2)
        ).then((res) => {
          clickState.current = true;
          sortedState.current = true;
          setCurrNum(-1);
          setCurrNum2(-1);
          draw();
        });

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (canvasRef.current != null) draw();
  }, [canvasRef]);
  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        className="canvas"
        onClick={() => {
          if (clickState.current) {
            if (sortedState.current) {
              setArray(randArr.current);
              draw();
              sortedState.current = false;
            } else {
              algSelect();
            }
          }
        }}
      ></canvas>
      <h3 className="title-text">Click to see {alg} sort</h3>
    </div>
  );
};

export default Canvas;
