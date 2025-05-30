<script>
  const data = $props();
  const league = data.league;
</script>

<a href={`/leagues/${league._id}`} class="text-decoration-none text-dark">
  <div class="card h-100">
    <div class="logo-container">
      <img
        src={league.logo}
        class="card-img-top logo"
        alt={league.league_name}
      />
    </div>
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

  .logo-container {
    width: 128px;
    height: 128px;
    margin: 0 auto 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    box-sizing: border-box; 
    background-color: white; 
  }

  .logo {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
  }
</style>
