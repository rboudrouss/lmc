import React, { useEffect, useRef, useState } from "react";

const MAPLink = "/assets/jeu/plan.png";
const MAPWidth = 5320;
const MAPHeight = 5067;

interface CanvaProps {
  GuessImage: string;
  onGuess?: (x: number, y: number) => void;
  onContinue?: () => void;
  answer: { x: number; y: number };
  score: number;
  round: number;
  rounds: number;
}

export default function Canva({
  GuessImage,
  onGuess,
  answer,
  score,
  onContinue,
  round,
  rounds,
}: CanvaProps) {
  let [lastClick, setLastClick] = useState({ x: 0, y: 0 });
  let [guessed, setGuessed] = useState(false);
  let [scoreA, setScoreA] = useState(score);
  let bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setScoreA(score);
  }, [score]);

  const guess = (x: number, y: number) => {
    const revScale = min(
      MAPWidth / bgRef.current!.clientWidth,
      MAPHeight / bgRef.current!.clientHeight
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
      <p
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "grey",
        }}
      >
        {round}/{rounds}
      </p>

      <img
        ref={bgRef}
        src={MAPLink}
        alt="Map"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        onClick={(e) => {
          if (guessed) return;

          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setLastClick({ x, y });
          console.log(x, y);
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          maxWidth: "300px",
        }}
      >
        <img
          src={GuessImage}
          alt="Guess"
          style={{ maxWidth: "300px", maxHeight: "300px" }}
        />
        <p style={{ background: "white" }}>Score : {score.toFixed(2)} </p>
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
          if (guessed) {
            setGuessed(false);
            onContinue?.();
          } else guess(lastClick.x, lastClick.y);
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

    const revScale = min(
      MAPWidth / bgRef.current!.clientWidth,
      MAPHeight / bgRef.current!.clientHeight
    );
    var x2 = coo2.x / revScale + (bgRef.current?.offsetLeft ?? 0);
    var y2 = coo2.y / revScale + (bgRef.current?.offsetTop ?? 0);
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
