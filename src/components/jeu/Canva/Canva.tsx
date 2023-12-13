import React, { useEffect, useRef, useState } from "react";

interface CanvaProps {
  MapImage: ImageMetadata;
  GuessImage: string;
  onGuess?: (x: number, y: number) => void;
  answer: { x: number; y: number };
  score: number;
}

export default function Canva({ MapImage, GuessImage, onGuess, answer, score }: CanvaProps) {
  console.log(score);
  let [lastClick, setLastClick] = useState({ x: 0, y: 0 });
  let bgRef = useRef<HTMLImageElement>(null);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        ref={bgRef}
        src={MapImage.src}
        alt="Map"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        onClick={(e) => {
          const revScale = min(
            MapImage.width / bgRef.current!.clientWidth,
            MapImage.height / bgRef.current!.clientHeight
          );

          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setLastClick({ x, y });
          console.log(x, y, x * revScale, y * revScale);
          if (onGuess) onGuess(x * revScale, y * revScale);
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "200px",
        }}
      >
        <img src={GuessImage} alt="Guess" style={{ maxWidth: "100%" }} />
        <p style={{background:"white"}}>Score : {score} </p>
      </div>
      <button
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          width: "100px",
          height: "50px",
          cursor: "pointer",
        }}
        onClick={() => {
          if (onGuess) onGuess(lastClick.x, lastClick.y);
        }}
      >
        Réponse
      </button>
      <div
        style={{
          position: "absolute",
          top: lastClick.y + (bgRef.current?.offsetTop ?? 0) - 10,
          left: lastClick.x + (bgRef.current?.offsetLeft ?? 0) - 10,
          width: "20px",
          height: "20px",
          background: "red",
        }}
      />
    </div>
  );
}

function min(a: number, b: number) {
  return a < b ? a : b;
}
