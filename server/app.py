from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import json
import uvicorn
from nba_api.stats.endpoints import leaguedashplayerstats
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    plus_minus: float


@app.get("/players/{player_id}", response_model=PlayerStats)
async def get_player_stats(player_id):
    data = json.loads(leaguedashplayerstats.LeagueDashPlayerStats().get_json())[
        "resultSets"
    ][0]
    headers = data["headers"]
    player_entries = data["rowSet"]

    for player in player_entries:
        player_dict = dict(zip(headers, player))
        if str(player_dict["PLAYER_ID"]) == str(player_id):
            player_stats = PlayerStats(
                player_id=player_dict["PLAYER_ID"],
                profile_pic=f"https://cdn.nba.com/headshots/nba/latest/260x190/{player_dict['PLAYER_ID']}.png",
                name=player_dict["PLAYER_NAME"],
                team=player_dict["TEAM_ABBREVIATION"],
                ppg=player_dict["PTS"] / player_dict["GP"],
                apg=player_dict["AST"] / player_dict["GP"],
                rpg=player_dict["REB"] / player_dict["GP"],
                spg=player_dict["STL"] / player_dict["GP"],
                bpg=player_dict["BLK"] / player_dict["GP"],
                three_pt_percentage=player_dict["FG3_PCT"],
                fg_percentage=player_dict["FG_PCT"],
                plus_minus=player_dict["PLUS_MINUS"],
            )
            return player_stats

    return {"error": "Player not found"}


@app.get("/players", response_model=List[PlayerStats])
async def get_all_player_stats():

    data = json.loads(leaguedashplayerstats.LeagueDashPlayerStats().get_json())[
        "resultSets"
    ][0]
    headers = data["headers"]
    player_entries = data["rowSet"]

    players_data = []
    for player in player_entries:
        player_dict = dict(zip(headers, player))
        if player_dict["GP"] < 30:
            continue

        player_stats = PlayerStats(
            player_id=player_dict["PLAYER_ID"],
            profile_pic=f"https://cdn.nba.com/headshots/nba/latest/260x190/{player_dict['PLAYER_ID']}.png",
            name=player_dict["PLAYER_NAME"],
            team=player_dict["TEAM_ABBREVIATION"],
            ppg=player_dict["PTS"] / player_dict["GP"],
            apg=player_dict["AST"] / player_dict["GP"],
            rpg=player_dict["REB"] / player_dict["GP"],
            spg=player_dict["STL"] / player_dict["GP"],
            bpg=player_dict["BLK"] / player_dict["GP"],
            three_pt_percentage=player_dict["FG3_PCT"],
            fg_percentage=player_dict["FG_PCT"],
            plus_minus=player_dict["PLUS_MINUS"],
        )
        players_data.append(player_stats)

    return players_data


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8001, reload=True)
