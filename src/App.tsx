import React, { useEffect } from "react";
import "materialize-css/dist/css/materialize.css";
import NavigationBar from "./components/navigation/NavigationBar";
import { AlgorithmProvider } from "./contexts/algorithmContext/CurrentAlgoritmContext";
import {ArrayProvider} from './contexts/array/ArrayContext';
import "./App.css";
import Canvas from "./components/canvas/Canvas";
const App = () => {

  useEffect(() => {
  }, []);
  return (
    <div>
      <AlgorithmProvider>
        <ArrayProvider>
        <NavigationBar />
        <Canvas  />
        </ArrayProvider>
      </AlgorithmProvider>
    </div>
  );
};
export default App;
