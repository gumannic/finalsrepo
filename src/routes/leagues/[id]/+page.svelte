<script>
  import TeamCard from "$lib/TeamCard.svelte";
  import { goto } from "$app/navigation";

  let { data } = $props();
  const league = data.league;
  const teams = data.teams;
</script>

<div class="container">
  <div class="d-flex justify-content-between align-items-start flex-wrap">
    <div class="mb-2">
      <button onclick={() => goto("/leagues")} class="btn btn-secondary me-2">
        ← Back
      </button>

      <h1 class="mt-3">{league.league_name}</h1>

      <strong>Land: </strong> {league.country} <br />
      <strong>Gegründet: </strong> {league.founded_year} <br />
      <strong>Anzahl Teams: </strong> {league.number_of_teams} <br />
    </div>
    <div class="text-end">
      <img
        class="img-fluid mt-2"
        style="width: 120px; height: auto;"
        src={`/${league.logo}`}
        alt={league.league_name}
      />
    </div>
  </div>

  <strong>Teams: </strong>
  <div class="row">
    {#each teams as team}
      <div class="col-md-4 mb-4">
        <TeamCard {team} />
      </div>
    {/each}
  </div>
</div>
