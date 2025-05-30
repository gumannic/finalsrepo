<script>
  import PlayerCard from "$lib/PlayerCard.svelte";
  import { goto } from "$app/navigation";

  let { data } = $props();
  const team = data.team;
  const league = data.league;
  const players = data.players;
</script>

<div class="container">
  <button
    onclick={() => goto(`/leagues/${league._id}`)}
    class="btn btn-secondary"
  >
    ← Back
  </button>

  <button
    onclick={() => goto(`/teams/${team._id}/createPlayer`)}
    class="btn btn-secondary"
  >
    Spieler hinzufügen
  </button>

  <button
    onclick={() => goto(`/teams/${team._id}/transfer`)}
    class="btn btn-secondary"
  >
    Transfer
  </button>

  <h1>{team.team_name}</h1>
  <strong>Budget: {team.budget} Mio.</strong> <br />
  <strong>Players: </strong>
  <br />
  <br />
  <div class="row">
    {#each players as player}
      <div class="col-md-2 mb-4">
        <PlayerCard {player} />
      </div>
    {/each}
  </div>
</div>
