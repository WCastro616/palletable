import React, { useContext, useRef, useState } from "react";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.scale(1, 1);
    context.strokeStyle = "black";
    contextRef.current = context;
  };

  const draw = ({ nativeEvent }) => {
    let color = getColor();
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    canvasRef.current.getContext("2d").fillStyle = "black";
    contextRef.current.arc(offsetX, offsetY, 20, 0, 2 * Math.PI);
    contextRef.current.fill();
    contextRef.current.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  const getColor = () => {
    let BASE_URL = 'http://127.0.0.1:5000';
    let url = BASE_URL + "/coords";
    fetch(url, {method : "POST", body : params})
    .then(res => {if (!res.ok) {
      throw new Error(await res.text());
      }
      return res;})
    .then(resp => {return resp.text()})
  }
  
  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        draw,
        clearCanvas,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);