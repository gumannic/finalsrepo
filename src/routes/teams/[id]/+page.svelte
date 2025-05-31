<script>
  import { goto } from "$app/navigation";

  let { data } = $props();
  const team = data.team;
  const league = data.league;
  const players = data.players;
</script>

<div class="container">
  <div class="d-flex justify-content-between align-items-start flex-wrap">
    <div class="mb-2">
      <button
        onclick={() => goto(`/leagues/${league._id}`)}
        class="btn btn-secondary me-2"
      >
        ← Back
      </button>

      <button
        onclick={() => goto(`/teams/${team._id}/createPlayer`)}
        class="btn btn-secondary me-2"
      >
        Spieler hinzufügen
      </button>

      <button
        onclick={() => goto(`/teams/${team._id}/transfer`)}
        class="btn btn-secondary"
      >
        Transfer
      </button>
      <h1 class="mt-3">{team.team_name}</h1>

      <strong>Liga: </strong> {team.league} <br />
      <strong>Budget: </strong> {team.budget} Mio.  <br />
    </div>
    <div class="text-end">
      <img
        class="img-fluid mt-2"
        style="width: 120px; height: auto;"
        src={`/${team.logo}`}
        alt={team.team_name}
      />
    </div>
  </div>

  <h2 class="mt-4">Players:</h2>
  <ul class="list-group">
    {#each players as player}
      <a href={`/players/${player._id}`} class="text-decoration-none text-dark">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          {player.first_name}
          {player.last_name}
          <span class="badge bg-primary">{player.releaseClause} Mio. €</span>
        </li>
      </a>
    {/each}
  </ul>
</div>
