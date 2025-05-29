<script>
    let { data } = $props();
</script>

<ul>
    {#each data.leagues as league}
        <li>{league.league_name}</li>
    {/each}
</ul>