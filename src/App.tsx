import React, { useEffect } from "react";
import "materialize-css/dist/css/materialize.css";
import NavigationBar from "./components/navigation/NavigationBar";
import { AlgorithmProvider } from "./contexts/algorithmContext/CurrentAlgoritmContext";
import "./App.css";
import CanvasPageGallery from './pages/canvasPage/CanvasPageGallery'
const App = () => {
  return (
    <div>
      <AlgorithmProvider>
        <NavigationBar />
        <CanvasPageGallery />
      </AlgorithmProvider>
    </div>
  );
};
export default App;
