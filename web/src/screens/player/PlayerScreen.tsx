import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlayer } from "../../api/api";
import { Player } from "../../api/types";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 0,
        lineHeight: "1.1",
        width: "80px",
      }}
    >
      <span style={{ fontSize: "14px" }}>{label}</span>
      <span style={{ fontSize: "40px", fontWeight: "bold" }}>
        {value.toFixed(1)}
      </span>
    </div>
  );
}

export default function PlayerScreen() {
  const navigate = useNavigate();
  const params = useParams();

  const playerId = params.playerId;

  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    getPlayer(playerId!).then((data) => {
      setPlayer(data);
    });
  }, [playerId]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div
        onClick={() => navigate("/players")}
        style={{
          cursor: "pointer",
          width: "100%",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <span style={{ fontSize: "24px", fontWeight: "bold" }}>{"< Back"}</span>
      </div>
      {player != null ? (
        <div
          style={{
            backgroundColor: "#0d0d0d",
            borderRadius: "20px",
            width: "fit-content",
            padding: "10px 40px 0px 20px",
            display: "flex",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0 2px 0 2px",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "end",
                  height: "100%",
                }}
              >
                <img
                  style={{
                    width: "300px",
                  }}
                  src={
                    player.profilePic
                      ? player.profilePic
                      : "https://waysideschools.org/wp-content/uploads/2015/07/default-profile-pic.png"
                  }
                  alt={player.name}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "20px",
                  gap: "40px",
                }}
              >
                <h1 style={{ margin: 0 }}>{player.name}</h1>
                <h1 style={{ margin: 0 }}>{player.team}</h1>
                <h1 style={{ margin: 0 }} className="glow">
                  {player.statlineScore.toFixed(1)}
                </h1>
              </div>
              <div
                style={{
                  maxWidth: "440px",
                  display: "flex",
                  gap: "40px",
                  flexWrap: "wrap",
                  rowGap: "18px",
                }}
              >
                <Stat label="PPG" value={player.ppg} />
                <Stat label="APG" value={player.apg} />
                <Stat label="RPG" value={player.rpg} />
                <Stat label="SPG" value={player.spg} />
                <Stat label="BPG" value={player.bpg} />
                <Stat label="3P%" value={player.threePtPercentage * 100} />
                <Stat label="FG%" value={player.fgPercentage * 100} />
                <Stat label="+/-" value={player.plusMinus} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
