import { GameData } from './firebase.ts';

interface Props {
  gameData: GameData;
  onFigureClick: (x: number, y: number) => void;
}

export default function Wimmelbild({ gameData, onFigureClick }: Props) {
  return (
    <div>
      <img src={gameData.image} alt="Wimmelbild" onClick={(e) => onFigureClick(e.nativeEvent.offsetX, e.nativeEvent.offsetY)} />
    </div>
  );
}
