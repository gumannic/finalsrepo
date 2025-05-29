<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  let { children } = $props();
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Football Manager</a>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="/leagues">Leagues</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

{@render children()}
