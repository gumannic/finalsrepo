<script>
  const data = $props();
  const player = data.player;
</script>

<a href={`/players/${player._id}`} class="text-decoration-none text-dark">
  <div class="card h-100">
    <div class="card-body">
      <p class="card-text">
        Nachname: {player.last_name}<br />
        Vorname: {player.first_name}<br />
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
