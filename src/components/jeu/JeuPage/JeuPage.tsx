import { useEffect, useState } from "react";
import Canva from "../Canva/Canva";

const NBImg = 57;
function link(i: number) {
  return `/assets/jeu/${i}.jpg`;
}

export default function JeuPage() {
  let [i, setI] = useState(0);
  let [finished, setFinished] = useState(false);
  let [turns, setTurns] = useState(
    Array.from({ length: NBImg }, (_, i) => i).sort(() => Math.random() - 0.5)
  );
  let [score, setScore] = useState(0);

  let DP = 333 / 3645;

  function distance(a, b, x, y, dp = DP) {
    return dp * ((a - x) ** 2 + (b - y) ** 2) ** 0.5;
  }

  function ratio(d, r, b) {
    if (d <= r * 2) return 1;
    else if (d <= r * 2 + b * 2) return 1 - (d - r * 2) / (b * 2);
    return 0;
  }

  useEffect(() => {
    let [temp, ...rest] = turns;
    setTurns(rest);
    setI(temp);
  }, []);

  const guess = (x: number, y: number) => {
    let d = distance(x, y, answers[i][0], answers[i][1]);
    let r = ratio(d, rayon[i], buffer[i]);
    console.log("dr", d, r, rayon[i], buffer[i]);
    setScore(score + r);
  };

  const continueGame = () => {
    console.log("continue", i);
    if (turns.length === 0) {
      setFinished(true);
      return;
    }

    let [temp, ...rest] = turns;
    setTurns(rest);
    setI(temp);

    console.log(answers[i]);
  };

  return (
    <div style={{ width: "100%", height: "calc(100vh - 50px)" }}>
      {finished ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: "url(/assets/jeu/plan.png)",
            backgroundSize: "cover",
          }}
        >
          <h1 style={{ color: "white", background: "grey", padding: "10px" }}>
            score : {score.toFixed(2)}
          </h1>
        </div>
      ) : (
        <Canva
          GuessImage={link(i + 1)}
          onGuess={guess}
          answer={{ x: answers[i][0], y: answers[i][1] }}
          score={score}
          onContinue={continueGame}
        />
      )}
    </div>
  );
}

let answers = [
  [1970, 4615],
  [410, 2950],
  [1535, 3115],
  [2330, 2820],
  [780, 500],
  [2550, 3050],
  [1440, 1710],
  [1825, 1710],
  [2480, 2940],
  [4920, 4490],
  [1950, 240],
  [1845, 260],
  [2300, 4470],
  [1930, 3670],
  [4470, 475],
  [4630, 950],
  [2200, 3500],
  [4725, 4835],
  [1725, 3225],
  [4575, 1960],
  [2120, 1200],
  [1980, 4000],
  [2400, 1210],
  [1540, 3400],
  [1780, 3775],
  [2715, 2645],
  [2225, 2635],
  [1530, 2750],
  [2135, 2645],
  [3260, 1820],
  [3850, 2000],
  [4150, 2750],
  [1975, 3940],
  [4450, 2000],
  [3800, 2000],
  [2040, 4230],
  [2355, 4320],
  [1440, 1335],
  [2350, 1200],
  [1650, 2600],
  [2480, 1335],
  [1920, 3635],
  [2245, 4440],
  [2145, 4015],
  [630, 3800],
  [3460, 2630],
  [2130, 3130],
  [1280, 4080],
  [2980, 3800],
  [4115, 2760],
  [3200, 1250],
  [4930, 260],
  [3870, 3000],
  [4470, 475],
  [2625, 475],
  [2620, 2650],
  [700, 3600],
];

let points = [
  1, 3, 1, 1, 2, 1, 3, 3, 2, 3, 3, 3, 1, 3, 2, 2, 2, 3, 1, 2, 1, 2, 2, 1, 1, 1,
  1, 3, 2, 2, 3, 3, 2, 3, 3, 2, 2, 2, 3, 3, 3, 1, 3, 1, 1, 3, 1, 3, 2, 3, 3, 1,
  3, 2, 3, 1, 3,
];

let rayon = [
  15, 15, 15, 15, 20, 15, 15, 15, 15, 45, 15, 15, 15, 20, 20, 20, 15, 45, 15,
  15, 25, 20, 30, 15, 20, 15, 15, 15, 20, 25, 25, 25, 20, 25, 25, 15, 15, 35,
  20, 25, 25, 15, 15, 20, 30, 20, 15, 25, 15, 25, 20, 15, 30, 20, 20, 15, 15,
];

let buffer = [
  25, 30, 10, 10, 20, 5, 10, 10, 5, 5, 10, 10, 10, 5, 5, 10, 10, 10, 5, 10, 20,
  5, 5, 10, 10, 5, 5, 5, 10, 5, 5, 5, 5, 5, 5, 10, 10, 5, 5, 5, 5, 10, 10, 5, 5,
  5, 10, 5, 10, 5, 5, 5, 5, 5, 10, 10, 10,
];
