import React, { useState, useRef } from "react";
import Canvas from "../../components/canvas/Canvas";
import { quickArray, bubbleArray, selectionArray } from '../../data';
import SortingUtility from "../../algorithms/SortingUtility";

const CanvasPageGallery = () => {

  const [delay, setDelay] = useState(5);

  const handleOnChange = (value: string) => {
    setDelay(parseInt(value));
    SortingUtility.delay = parseInt(value);
  }

  const quickArrayRef = useRef([...quickArray])
  const bubbleArrayRef = useRef([...quickArray])
  const selectionArrayRef = useRef([...quickArray])

  return (
    <div className="container">
      {/* <h5 className='title-text'> */}
      {/*   Delay {delay} ms */}
      {/* </h5> */}
      {/* <input min='0' max='500' step='5' value={delay} onChange={(e) => handleOnChange(e.target.value)} type='range' /> */}
      <Canvas newArr={bubbleArrayRef} alg="bubble" arrayState={bubbleArray} />
      <Canvas newArr={selectionArrayRef} alg="selection" arrayState={selectionArray} />
      <Canvas newArr={quickArrayRef} alg="quick" arrayState={quickArray} />
    </div>
  );
};
export default CanvasPageGallery;
