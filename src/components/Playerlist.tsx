
interface Player {
  username: string;
  time: number;
}

interface Props {
  players: Player[];
  onClose: () => void; 
  onSave: (time: number) => void;
}

export default function PlayerList({ players, onClose, onSave } : Props) {
  return (
    <div>
      <h2>Bestenliste</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player.username}: {player.time} Sekunden
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Schließen</button>
      <button onClick={() => onSave(10)}>Speichern</button>
    </div>
  );
};

