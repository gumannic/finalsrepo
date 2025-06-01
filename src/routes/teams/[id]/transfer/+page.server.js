import players_db from "$lib/players.js"
import teams_db from "$lib/teams.js"
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
  const teamId = params.id;
  const team = await teams_db.getTeam(teamId);

  const allPlayers = await players_db.getPlayers();
  let myPlayers = [];
  let otherPlayers = [];

  for (const player of allPlayers) {
    if (player.team === team.team_name) {
      myPlayers.push(player);
    } else {
      otherPlayers.push(player);
    }
  }

  return { team, otherPlayers, myPlayers };
}

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const money = data.get("money");
    const targetPlayerId = data.get("targetPlayerId");
    const exchangePlayerId = data.get("exchangePlayerId");
    const teamName = data.get("team");

    let targetPlayer = await players_db.getPlayer(targetPlayerId)
    let myTeam = await teams_db.getTeamByName(teamName);

    const teamId = myTeam._id;

    if (exchangePlayerId != null) {
      let exchangePlayer = await players_db.getPlayer(exchangePlayerId);
      let targetTeam = await teams_db.getTeamByName(targetPlayer.team);

      const tempTeamName = exchangePlayer.team;
      exchangePlayer.team = targetPlayer.team;
      targetPlayer.team = tempTeamName;

      await players_db.updatePlayer(exchangePlayer);
      await players_db.updatePlayer(targetPlayer);

      const exchangePlayerIndex = myTeam.player_reference.indexOf(exchangePlayer._id);
      myTeam.player_reference.splice(exchangePlayerIndex, 1);

      const targetPlayerIndex = targetTeam.player_reference.indexOf(targetPlayer._id);
      targetTeam.player_reference.splice(targetPlayerIndex, 1);

      myTeam.player_reference.push(targetPlayerId);
      targetTeam.player_reference.push(exchangePlayerId);

      await teams_db.updateTeam(targetTeam);
      await teams_db.updateTeam(myTeam);
    } else {
    
      let targetTeam = await teams_db.getTeamByName(targetPlayer.team);

      targetPlayer.team = teamName;

      const targetPlayerIndex = targetTeam.player_reference.indexOf(targetPlayer._id);
      targetTeam.player_reference.splice(targetPlayerIndex, 1);

      myTeam.player_reference.push(targetPlayerId);

      myTeam.budget = Number(myTeam.budget) - Number(money)
      targetTeam.budget = Number(targetTeam.budget) + Number(money);
      
      await players_db.updatePlayer(targetPlayer);
      await teams_db.updateTeam(targetTeam);
      await teams_db.updateTeam(myTeam);

    }

     throw redirect(303, `/teams/${teamId}`);
  }
}