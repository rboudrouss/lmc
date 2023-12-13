import React, { useEffect, useRef, useState } from "react";

interface CanvaProps {
  MapImage: string;
  GuessImage: string;
  onClick?: (x: number, y: number) => void;
}

export default function Canva({ MapImage, GuessImage, onClick }: CanvaProps) {
  const [zoom, setZoom] = useState(1);
  const [drag, setDrag] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.fillStyle = '#000000'
    const image = new Image();
    image.src = MapImage;
    image.onload = () => {
      context.drawImage(image, 0, 0);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <img
        src={GuessImage}
        alt="Guess"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "200px",
        }}
      />
    </div>
  );
}
