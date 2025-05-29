<script>
  import TeamCard from "$lib/TeamCard.svelte";

  let { data } = $props();
  const league = data.league;
  const teams = data.teams;
</script>

<div class="container">
  <button on:click={() => history.back()} class="btn btn-secondary">
    ← Back
  </button>
  <h1>{league.league_name}</h1>
  <strong>Teams: </strong>
  <div class="row">
    {#each teams as team}
      <div class="col-md-4 mb-4">
        <TeamCard {team} />
      </div>
    {/each}
  </div>
</div>
