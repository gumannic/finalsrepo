<script>
  import LeagueCard from "$lib/LeagueCard.svelte";

  let { data } = $props();
</script>

<h1 class="text-2xl font-bold mb-4 center-text">Football Leagues</h1>

<div class="container">
  <div class="row">
    {#each data.leagues as league}
      <div class="col-md-4 mb-4">
        <LeagueCard {league} />
      </div>
    {/each}
  </div>
</div>

<style>
  .center-text {
    text-align: center;
  }
</style>
