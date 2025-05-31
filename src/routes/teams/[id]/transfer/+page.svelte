<script>
  import { goto } from "$app/navigation";

  let { form, data } = $props();
  const team = data.team;
  const myPlayers = data.myPlayers;
  const otherPlayers = data.otherPlayers;

  let targetPlayer = $state();
  let targetPlayerId = $state();
  let exchangePlayer = $state();
  let exchangePlayerId = $state();
  let money = $state();
  let useExchange = $state();

  targetPlayer = null;
  targetPlayerId = "";

  exchangePlayer = null;
  exchangePlayerId = "";

  money = "";
  useExchange = false;

  function handleTargetSelect(event) {
    targetPlayerId = event.target.value;
    targetPlayer = otherPlayers.find((t) => t._id === targetPlayerId);
  }

  function handleMyPlayerSelect(event) {
    exchangePlayerId = event.target.value;
    exchangePlayer = myPlayers.find((t) => t._id === exchangePlayerId);
  }
</script>

<form
  method="POST"
  class="container mt-4 p-4 border rounded bg-light"
  style="max-width: 600px;"
>
  <div class="mb-3">
    <label class="form-label" for="player">Wunschspieler auswählen</label>
    <select
      class="form-select"
      name="targetPlayerId"
      bind:value={targetPlayerId}
      onchange={handleTargetSelect}
    >
      <option value="" disabled selected>Spieler wählen</option>
      {#each otherPlayers as player}
        <option value={player._id}
          >{player.first_name} {player.last_name}</option
        >
      {/each}
    </select>
  </div>

  {#if targetPlayer}
    <div class="mt-4 p-3 border rounded">
      <p>
        <strong>Name:</strong>
        {targetPlayer.first_name}
        {targetPlayer.last_name}
      </p>
      <p><strong>Value:</strong> {targetPlayer.releaseClause} Mio.</p>
    </div>
  {/if}

  <div class="w-full md:w-1/2 border p-4 rounded">
    <label class="block mb-2 font-medium">Zahlungstyp</label>
    <div class="flex gap-4 mb-3">
      <label
        ><input type="radio" bind:group={useExchange} value={false} /> Geld</label
      >
      <label
        ><input type="radio" bind:group={useExchange} value={true} /> Spieler-Tausch</label
      >
    </div>

    {#if useExchange}
      <select
        bind:value={exchangePlayerId}
        onchange={handleMyPlayerSelect}
        name="exchangePlayerId"
        class="w-full border p-2 rounded"
      >
        <option value="" disabled selected>Eigener Spieler wählen</option>
        {#each myPlayers as p}
          <option value={p._id}>{p.first_name} {p.last_name}</option>
        {/each}
      </select>
    {:else}
      <input
        type="number"
        name="money"
        bind:value={money}
        class="w-full border p-2 rounded"
      />
    {/if}
  </div>

  {#if exchangePlayer}
    <div class="mt-4 p-3 border rounded">
      <p>
        <strong>Name:</strong>
        {exchangePlayer.first_name}
        {exchangePlayer.last_name}
      </p>
      <p><strong>Value:</strong> {exchangePlayer.releaseClause} Mio.</p>
    </div>
  {/if}

  <input type="hidden" name="team" value={team.team_name} />
  <button type="button" onclick={() => goto(`/teams/${team._id}`)} class="btn btn-secondary">
    Cancel
  </button>
  <button type="submit" class="btn btn-primary">Transfer</button>
</form>
