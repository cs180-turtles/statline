import playerIdMapJson from "../api/playerIdMap.json";

type PlayerIdMap = { [key: string]: number };

async function getPlayers() {
  const token = "e7de96f6-4456-475e-9676-989b0e8a29ec";
  return fetch("https://api.balldontlie.io/v1/players?per_page=100", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const formattedResp = data.data.map((player: any) => {
        const playerIdMap: PlayerIdMap = playerIdMapJson;
        console.log(
          `${player.first_name.toLowerCase()}-${player.last_name.toLowerCase()}`
        );
        const nbaId =
          playerIdMap[
            `${player.first_name.toLowerCase()}-${player.last_name.toLowerCase()}`
          ];
        console.log(nbaId);
        return {
          playerId: player.id,
          profilePic: nbaId
            ? `https://cdn.nba.com/headshots/nba/latest/260x190/${nbaId}.png`
            : "",
          firstName: player.first_name,
          lastName: player.last_name,
          jerseyNumber: player.jersey_number,
          position: player.position,
          team: player.team.full_name,
        };
      });
      return formattedResp;
    });
}

export { getPlayers };
