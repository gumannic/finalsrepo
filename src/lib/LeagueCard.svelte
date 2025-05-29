<script>
  const data = $props();
  const league = data.league;
</script>

<a href={`/leagues/${league._id}`} class="text-decoration-none text-dark">
  <div class="card h-100">
    <div class="card-body">
      <p class="card-text">
        Land: {league.country}<br />
        Gründungsjahr: {league.founded_year}<br />
        Anzahl Teams: {league.number_of_teams}
      </p>
    </div>
  </div>
</a>

<style>
  a:hover .card {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
    transition: all 0.2s ease-in-out;
  }
</style>
