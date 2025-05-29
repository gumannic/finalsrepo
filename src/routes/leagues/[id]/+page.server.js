import leagues_db from "$lib/leagues.js"
import teams_db from "$lib/teams.js"

export async function load({ params }) {
    const league = await leagues_db.getLeague(params.id);
    const team_ids = league.team_ids;
    let teams = [];
    for (const id of team_ids) {
        const team = await teams_db.getTeam(id);
        teams.push(team);
    }
    return {
        league,
        teams
    };
}