<script>
  import PlayerCard from "$lib/PlayerCard.svelte";

  let { data } = $props();
  const player = data.player;
</script>

<div class="container">
  <button on:click={() => history.back()} class="btn btn-secondary">
    ← Back
  </button>

  <h1>{player.first_name} {player.last_name}</h1>
</div>
