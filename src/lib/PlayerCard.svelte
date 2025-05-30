<script>
  const data = $props();
  const player = data.player;
</script>

<a href={`/players/${player._id}`} class="text-decoration-none text-dark">
  <div class="card h-100" style="max-width: 180px;">
    <div class="logo-container">
      <img
        src={`/${player.pic}`}
        class="card-img-top player-image"
        alt={player.last_name}
      />
    </div>
    <div class="card-body">
      <center><strong>{player.first_name} {player.last_name}</strong></center>
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

  .player-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    display: block;
    margin: 0 auto;
  }
</style>
