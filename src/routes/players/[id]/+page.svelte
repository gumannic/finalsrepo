<script>
  import PlayerCard from "$lib/PlayerCard.svelte";
  import { goto } from "$app/navigation";

  let { data } = $props();
  const player = data.player;
  const team = data.team;
</script>

<div class="container">
  <button
    onclick={() => goto(`/teams/${team._id}`)}
    class="btn btn-secondary"
  >
    ← Back
  </button>

  <div class="card shadow-lg p-4">
    <div class="row g-4 align-items-center">
      <div class="col-md-4 text-center">
        <img src={`/${player.pic}`} class="img-fluid rounded-3" alt={player.last_name}>
      </div>
      <div class="col-md-8">
        <h2 class="mb-3">{player.first_name} {player.last_name}</h2>
        <ul class="list-group list-group-flush fs-5">
          <li class="list-group-item"><strong>Alter:</strong> {player.age}</li>
          <li class="list-group-item"><strong>Club:</strong> {player.team}</li>
          <li class="list-group-item"><strong>Nationalität:</strong> {player.nationality}</li>
          <li class="list-group-item"><strong>Ablösesumme:</strong> {player.releaseClause} Mio. €</li>
        </ul>
      </div>
    </div>
  </div>
</div>
