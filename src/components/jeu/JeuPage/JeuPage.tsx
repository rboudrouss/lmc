import { useState } from "react";
import Canva from "../Canva/Canva";

const NBImg = 57;
function link(i: number) {
  return `/assets/jeu/${i}.jpg`;
}

let answers = [[1970,4615],[410,2950],[1535,3115],[2330,2820],[780,500],[2550,3050],[1440,1710],[1825,1710],[2480,2940],[4920,4490],[1950,240],[1845,260],[2300,4470],[1930,3670],[4470,475],[4630,950],[2200,3500],[4725,4835],[1725,3225],[4575,1960],[2120,1200],[1980,4000],[2400,1210],[1540,3400],[1780,3775],[2715,2645],[2225,2635],[1530,2750],[2135,2645],[3260,1820],[3850,2000],[4150,2750],[1975,3940],[4450,2000],[3800,2000],[2040,4230],[2355,4320],[1440,1335],[2350,1200],[1650,2600],[2480,1335],[1920,3635],[2245,4440],[2145,4015],[630,3800],[3460,2630],[2130,3130],[1280,4080],[2980,3800],[4115,2760],[3200,1250],[4930,260],[3870,3000],[4470,475],[2625,475],[2620,2650],[700,3600]]

export default function JeuPage() {

  let [i, setI] = useState(0);

  const continueGame = () => {
    if (i === NBImg - 1) {
      setI(0);
      return;
    }
    setI(i + 1);
    console.log(answers[i]);
  }

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <Canva
        GuessImage={link(i + 1)}
        onGuess={() => {}}
        answer={{ x: answers[i][0], y: answers[i][1] }}
        score={0}
        onContinue={continueGame}
      />
    </div>
  );
}
