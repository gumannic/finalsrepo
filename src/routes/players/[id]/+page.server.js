import players_db from "$lib/players.js"
import teams_db from "$lib/teams.js"

export async function load({ params }) {
    const player = await players_db.getPlayer(params.id);
    const team = await teams_db.getTeamByName(player.team);

    return {
        player,
        team
    };
}