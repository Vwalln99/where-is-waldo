import { Player } from './firebase.ts';

interface Props {
  players: Player[];
}

export default function PlayerList({ players }:Props) {
  return (
    <div>
      <h2>Bestenliste</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.name}: {player.score}</li>
        ))}
      </ul>
    </div>
  );
}