import React, { useEffect, useRef, useState } from "react";

interface CanvaProps {
  MapImage: ImageMetadata;
  GuessImage: string;
  onGuess?: (x: number, y: number) => void;
  onContinue?: () => void;
  answer: { x: number; y: number };
  score: number;
}

export default function Canva({
  MapImage,
  GuessImage,
  onGuess,
  answer,
  score,
  onContinue
}: CanvaProps) {
  console.log(score);
  let [lastClick, setLastClick] = useState({ x: 0, y: 0 });
  let [guessed, setGuessed] = useState(false);
  let bgRef = useRef<HTMLImageElement>(null);

  const guess = (x: number, y: number) => {
    const revScale = min(
      MapImage.width / bgRef.current!.clientWidth,
      MapImage.height / bgRef.current!.clientHeight
    );
    if (onGuess) onGuess(lastClick.x * revScale, lastClick.y * revScale);
    setGuessed(true);
  };

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
          if (guessed) return;
          const revScale = min(
            MapImage.width / bgRef.current!.clientWidth,
            MapImage.height / bgRef.current!.clientHeight
          );

          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setLastClick({ x, y });
          console.log(x, y, x * revScale, y * revScale);
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
        <p style={{ background: "white" }}>Score : {score} </p>
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
          console.log("guess")
          if (guessed) onContinue?.();
          else
          guess(lastClick.x, lastClick.y);
        }}
      >
        {guessed ? "continuer" : "Réponse"}
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
      {guessed ? (
        <Connect coo1={lastClick} coo2={answer} color="green" thickness={5} />
      ) : null}
    </div>
  );
  function Connect(props: {
    coo1: { x: number; y: number };
    coo2: { x: number; y: number };
    color: string;
    thickness: number;
  }) {
    // draw a line connecting elements
    const { coo1, coo2, color = "black", thickness = 2 } = props;
    // bottom right
    var x1 = coo1.x + (bgRef.current?.offsetLeft ?? 0);
    var y1 = coo1.y + (bgRef.current?.offsetTop ?? 0);
    // top right
    var x2 = coo2.x + (bgRef.current?.offsetLeft ?? 0);
    var y2 = coo2.y + (bgRef.current?.offsetTop ?? 0);
    // distance
    var length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    // center
    var cx = (x1 + x2) / 2 - length / 2;
    var cy = (y1 + y2) / 2 - thickness / 2;
    // angle
    var angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
    // make hr

    return (
      <div
        style={{
          padding: 0,
          margin: 0,
          height: thickness,
          backgroundColor: color,
          lineHeight: 1,
          position: "absolute",
          left: cx,
          top: cy,
          width: length,
          transform: `rotate(${angle}deg)`,
        }}
      />
    );
  }
}

function min(a: number, b: number) {
  return a < b ? a : b;
}
