import Canva from "../Canva/Canva";
import Plan from "@/assets/jeu/plan.png";
import Guess from "@/assets/jeu/57.jpg";

export default function JeuPage() {
  const onClick = (x: number, y: number) => {
    console.log(x, y);
  };

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <Canva
        MapImage={{ ...Plan }}
        GuessImage={Guess.src}
        onGuess={onClick}
        answer={{ x: 0, y: 0 }}
        score={0}
      />
    </div>
  );
}
