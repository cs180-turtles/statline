import { Player } from "./types";

async function getPlayer(playerId: string): Promise<Player> {
  return fetch(`http://127.0.0.1:8001/players/${playerId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((player) => {
      const statlineScore =
        ((0.5 * player.ppg +
          player.apg +
          player.rpg +
          2 * player.spg +
          2 * player.bpg) *
          (player.three_pt_percentage + player.fg_percentage)) /
        2;

      return {
        statlineScore: statlineScore,
        playerId: player.player_id,
        profilePic: player.profile_pic,
        name: player.name,
        team: player.team,
        ppg: player.ppg,
        apg: player.apg,
        rpg: player.rpg,
        spg: player.spg,
        bpg: player.bpg,
        threePtPercentage: player.three_pt_percentage,
        fgPercentage: player.fg_percentage,
        plusMinus: player.plus_minus,
      };
    });
}

async function getPlayers(): Promise<Player[]> {
  return fetch("http://127.0.0.1:8001/players", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const formattedResp = data.map((player: any) => {
        const statlineScore =
          ((0.5 * player.ppg +
            player.apg +
            player.rpg +
            2 * player.spg +
            2 * player.bpg) *
            (player.three_pt_percentage + player.fg_percentage)) /
          2;

        return {
          statlineScore: statlineScore,
          playerId: player.player_id,
          profilePic: player.profile_pic,
          name: player.name,
          team: player.team,
          ppg: player.ppg,
          apg: player.apg,
          rpg: player.rpg,
          spg: player.spg,
          bpg: player.bpg,
          threePtPercentage: player.three_pt_percentage,
          fgPercentage: player.fg_percentage,
          plusMinus: player.plus_minus,
        };
      });
      return formattedResp;
    });
}

export { getPlayer, getPlayers };
