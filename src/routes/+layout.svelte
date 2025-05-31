<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  let { children, data } = $props();

  import { onMount } from "svelte";

  let search = $state();
  let results = $state();
  let showResults = $state();

  search = "";
  results = [];
  showResults = false;

  let items = data.items;

  function filterResults() {
    if (search.length === 0) {
      results = [];
      showResults = false;
      return;
    }

    results = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );

    showResults = results.length > 0;
  }

  function selectResult(item) {
    window.location.href = item.url;
  }

  function handleClickOutside(event) {
    if (!event.target.closest(".search-container")) {
      showResults = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });
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
      <div class="search-container position-relative">
        <input
          type="text"
          class="form-control"
          bind:value={search}
          oninput={filterResults}
          placeholder="Search leagues, teams, players..."
        />

        {#if showResults}
          <ul class="results list-group mt-1 shadow">
            {#each results as item}
              <li
                class="list-group-item list-group-item-action result-item"
                onclick={() => selectResult(item)}
              >
                {item.name}
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </div>
</nav>

{@render children()}

<style>
  .results {
    position: absolute;
    width: 100%;
    z-index: 1000;
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    max-height: 300px;
    overflow-y: auto;
  }

  .result-item {
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  .result-item:hover {
    background-color: #f8f9fa;
  }
</style>
