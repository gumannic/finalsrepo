import players_db from "$lib/players.js"
import teams_db from "$lib/teams.js"
import leagues_db from "$lib/leagues.js";

export async function load({ params }) {
    const team = await teams_db.getTeam(params.id);
    const player_ids = team.player_reference;
    let players = [];
    for (const id of player_ids) {
        const player = await players_db.getPlayer(id);
        players.push(player);
    }
    const league = await leagues_db.getLeagueByName(team.league);
    return {
        players,
        team,
        league
    };
}