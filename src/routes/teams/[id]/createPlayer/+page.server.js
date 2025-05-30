import players_db from "$lib/players.js"
import teams_db from "$lib/teams.js"
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
  const teamId = params.id;

  const team = await teams_db.getTeam(teamId);
  return { team };
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        let player = {
            first_name: data.get("first_name"),
            last_name: data.get("last_name"),
            age: data.get("age"),
            releaseClause: data.get("value"),
            team: data.get("team"),
        }
        const newPlayerId = await players_db.createPlayer(player);
        let team = await teams_db.getTeamByName(data.get("team"));
        const teamId = team._id;
        team.player_reference.push(newPlayerId);
        await teams_db.updateTeam(team);
         throw redirect(303, `/teams/${teamId}`);
    }
}