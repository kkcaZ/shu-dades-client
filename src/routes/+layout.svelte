<slot />

<script>
  import { onMount } from "svelte";
  import { listen } from "@tauri-apps/api/event";

  onMount(async () => {
    await listen("broadcast_event", (event) => {
      console.log(event.payload);
    });
  });
</script>