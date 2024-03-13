import { useEffect, useState } from "react";
import { getPlayers } from "../../api/api";
import { Player } from "../../api/types";
import PlayerCard from "./components/PlayerCard";

export default function HomeScreen() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [playerSearch, setPlayerSearch] = useState("");

  useEffect(() => {
    getPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);

  useEffect(() => {
    if (playerSearch.length > 0) {
      const filteredPlayers = players.filter((player: any) => {
        return player.name.toLowerCase().includes(playerSearch.toLowerCase());
      });
      setFilteredPlayers(filteredPlayers);
    } else {
      setFilteredPlayers(players);
    }
  }, [playerSearch, players]);

  return (
    <div>
      <h1>Statline</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: " 0 0 20px 0",
        }}
      >
        <input
          style={{
            borderRadius: "15px",
            width: "100%",
            padding: "10px 20px 10px 20px",
            fontSize: "20px",
            maxWidth: "1000px",
            border: "none",
          }}
          type="text"
          placeholder="Search for a player"
          value={playerSearch}
          onChange={(e) => setPlayerSearch(e.target.value)}
        />
      </div>
      <div
        style={{
          flex: "flex-row",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {filteredPlayers
          .sort((a, b) => b.statlineScore - a.statlineScore)
          .map((player: any) => {
            return <PlayerCard player={player} />;
          })}
      </div>
    </div>
  );
}
