import leagues_db from "$lib/leagues.js"
import teams_db from "$lib/teams.js"
import players_db from "$lib/players.js"

export async function load() {
    const leagues = await leagues_db.getLeagues();
    const teams = await teams_db.getTeams();
    const players = await players_db.getPlayers();

    const items = [
        ...leagues.map(l => ({
            name: l.league_name,
            url: `/leagues/${l._id}`
        })),
        ...teams.map(t => ({
            name: t.team_name,
            url: `/teams/${t._id}`
        })),
        ...players.map(p => ({
            name: `${p.first_name} ${p.last_name}`,
            url: `/players/${p._id}`
        }))
    ];

    return {
        items,
    };
}