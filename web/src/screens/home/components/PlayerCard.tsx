import { useNavigate } from "react-router-dom";
import { Player } from "../../../api/types";
import "./PlayerCard.css";

export default function PlayerCard({ player }: { player: Player }) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        padding: "0 20px 0px 20px",
        borderRadius: "10px",
        cursor: "pointer",
      }}
      onClick={() => {
        navigate(`/players/${player.playerId}`);
      }}
    >
      <div>
        <div style={{ minHeight: "200px", display: "flex", alignItems: "end" }}>
          <img
            style={{ width: "100%" }}
            src={
              player.profilePic
                ? player.profilePic
                : "https://waysideschools.org/wp-content/uploads/2015/07/default-profile-pic.png"
            }
            alt={player.name}
          />
        </div>
        <h3
          style={{
            textAlign: "start",
            margin: "10px 0 5px 0",
            lineClamp: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {player.name}
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            alignItems: "start",
            padding: "0 0 20px 0",
          }}
        >
          <span className="glow">{player.statlineScore.toFixed(2)}</span>
        </div>
        <div>
          <span style={{ fontWeight: 800, fontSize: "24px" }}>
            {player.team}
          </span>
        </div>
      </div>
    </div>
  );
}
