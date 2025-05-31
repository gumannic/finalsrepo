<script>
  import { goto } from "$app/navigation";

  let { form, data } = $props();
  const team = data.team;
</script>

<form
  method="POST"
  class="container mt-4 p-4 border rounded bg-light"
  style="max-width: 600px;"
>
  <div class="mb-3">
    <label for="" class="form-label">Vorname</label>
    <input name="first_name" class="form-control" type="text" />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Nachname</label>
    <input name="last_name" class="form-control" type="text" />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Alter</label>
    <input name="age" class="form-control" type="text" />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Wert</label>
    <input name="value" class="form-control" type="text" />
  </div>
  <input type="hidden" name="team" value={team.team_name} />
  <button type="button" onclick={() => goto(`/teams/${team._id}`)} class="btn btn-secondary">
    Cancel
  </button>
  <button type="submit" class="btn btn-primary">Add Player</button>
</form>
