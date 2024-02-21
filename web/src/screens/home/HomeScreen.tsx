import React from "react";
import { useState, useEffect } from "react";
import { getPlayers } from "../../api/api";
import PlayerCard from "./components/PlayerCard";

export default function HomeScreen() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [playerSearch, setPlayerSearch] = useState("");

  useEffect(() => {
    getPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);

  useEffect(() => {
    if (playerSearch.length > 0) {
      const filteredPlayers = players.filter((player: any) => {
        return `${player.firstName} ${player.lastName}`
          .toLowerCase()
          .includes(playerSearch.toLowerCase());
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
        {filteredPlayers.map((player: any) => {
          return (
            <PlayerCard
              key={player.id}
              playerId={player.id}
              profilePic={player.profilePic}
              firstName={player.firstName}
              lastName={player.lastName}
              jerseyNumber={player.jerseyNumber}
              position={player.position}
              team={player.team}
            />
          );
        })}
      </div>
    </div>
  );
}
