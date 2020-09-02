import React from 'react';
import Canvas from '../../components/canvas/Canvas'


const CanvasPageGallery = () =>{

    return(
        <div className="container">
            <Canvas alg='bubble' />
            <Canvas alg='quick' />
            <Canvas alg='merge' />
        </div>
    );
}
export default CanvasPageGallery;