<script>
  import PlayerCard from "$lib/PlayerCard.svelte";

  let { data } = $props();
  const team = data.team;
  const players = data.players;
</script>

<div class="container">
  <button on:click={() => history.back()} class="btn btn-secondary">
    ← Back
  </button>

  <h1>{team.team_name}</h1>
  <strong>Players: </strong>
  <br>
  <br>
  <div class="row">
    {#each players as player}
      <div class="col-md-2 mb-2">
        <PlayerCard {player} />
      </div>
    {/each}
  </div>
</div>
