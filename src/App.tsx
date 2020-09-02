import React, { useEffect } from "react";
import "materialize-css/dist/css/materialize.css";
import NavigationBar from "./components/navigation/NavigationBar";
import { AlgorithmProvider } from "./contexts/algorithmContext/CurrentAlgoritmContext";
import {ArrayProvider} from './contexts/array/ArrayContext';
import "./App.css";
import CanvasPageGallery from './pages/canvasPage/CanvasPageGallery'
const App = () => {
  return (
    <div>
      <AlgorithmProvider>
        <ArrayProvider>
        <NavigationBar/>
        <CanvasPageGallery/>
        </ArrayProvider>
      </AlgorithmProvider>
    </div>
  );
};
export default App;
