import players_db from "$lib/players.js"
import teams_db from "$lib/teams.js"

export async function load({ params }) {
    const team = await teams_db.getTeam(params.id);
    const player_ids = team.player_reference;
    let players = [];
    for (const id of player_ids) {
        const player = await players_db.getPlayer(id);
        players.push(player);
    }
    return {
        players,
        team
    };
}