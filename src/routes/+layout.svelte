<slot />

<script>
  import { onMount } from "svelte";
  import { listen } from "@tauri-apps/api/event";
  import { newNotification } from "$lib/state/notifStore";

  onMount(async () => {
    await listen("broadcast_event", (event) => {
      newNotification.set(`New notification received (eventId: ${Math.floor(Math.random() * 1000)})`);
      console.log(event.payload);
    });
  });
</script>