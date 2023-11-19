<slot />

<script lang="ts">
  import { onMount } from "svelte";
  import { Listen } from "$lib/services/broadcast";

  onMount(async () => {
    await Listen();
  });
</script>