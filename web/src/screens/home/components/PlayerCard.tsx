import "./PlayerCard.css";
import defaultProfilePic from "../../../assets/default-profile-pic.png";

export default function PlayerCard({
  playerId,
  profilePic,
  firstName,
  lastName,
  jerseyNumber,
  position,
  team,
}: {
  playerId: number;
  profilePic: string;
  firstName: string;
  lastName: string;
  jerseyNumber: number;
  position: string;
  team: string;
  ppg: number;
  apg: number;
  rpg: number;
  spg: number;
  bpg: number;
  threePtPercentage: number;
  fgPercentage: number;
}) {
  return (
    <div
      style={{
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        width: "200px",
        padding: "0 20px 0px 20px",
        borderRadius: "10px",
      }}
    >
      <div style={{}}>
        <div style={{ minHeight: "200px", display: "flex", alignItems: "end" }}>
          <img
            style={{ width: "100%" }}
            src={
              profilePic
                ? profilePic
                : "https://waysideschools.org/wp-content/uploads/2015/07/default-profile-pic.png"
            }
            alt={`${firstName} ${lastName}`}
          />
        </div>
        <h3 style={{ margin: "10px 0 5px 0" }}>{`${firstName} ${lastName}`}</h3>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          padding: "0 0 20px 0",
        }}
      >
        <span>Jersey Number: {jerseyNumber}</span>
        <span>Position: {position}</span>
        <span
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "block",
          }}
        >
          Team: {team}
        </span>
      </div>
    </div>
  );
}
