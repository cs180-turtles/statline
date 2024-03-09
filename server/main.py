from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import json
import uvicorn
from nba_api.stats.endpoints import leaguedashplayerstats

app = FastAPI()


class PlayerStats(BaseModel):
    player_id: int
    profile_pic: str
    name: str
    team: str
    ppg: float
    apg: float
    rpg: float
    spg: float
    bpg: float
    three_pt_percentage: float
    fg_percentage: float


@app.get("/players", response_model=List[PlayerStats])
async def get_all_player_stats():

    data = json.loads(leaguedashplayerstats.LeagueDashPlayerStats().get_json())[
        "resultSets"
    ][0]
    print(data)
    headers = data["headers"]
    player_entries = data["rowSet"]

    players_data = []

    for player in player_entries:
        # Create a dict from headers and player data for easier access
        player_dict = dict(zip(headers, player))

        player_stats = PlayerStats(
            player_id=player_dict["PLAYER_ID"],
            profile_pic=f"https://cdn.nba.com/headshots/nba/latest/260x190/{player_dict['PLAYER_ID']}.png",
            name=player_dict["PLAYER_NAME"],
            team=player_dict["TEAM_ABBREVIATION"],
            ppg=player_dict["PTS"],
            apg=player_dict["AST"],
            rpg=player_dict["REB"],
            spg=player_dict["STL"],
            bpg=player_dict["BLK"],
            three_pt_percentage=player_dict["FG3_PCT"],
            fg_percentage=player_dict["FG_PCT"],
        )
        players_data.append(player_stats)

    return players_data


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)
