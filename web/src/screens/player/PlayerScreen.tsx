import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayer } from "../../api/api";
import { Player } from "../../api/types";

export default function PlayerScreen() {
  const params = useParams();

  const playerId = params.playerId;

  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    getPlayer(playerId!).then((data) => {
      setPlayer(data);
    });
  }, [playerId]);

  return <div>{JSON.stringify(player)}</div>;
}
