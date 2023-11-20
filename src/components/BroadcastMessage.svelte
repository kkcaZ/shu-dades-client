<script lang="ts">
  import Input from "./Input.svelte";
  import Button from "./buttons/Button.svelte";
  import { AddAllNotification } from "$lib/services/notification";

  let message = "";

  function sendMessage() {
    if (!validateMessage()) return;

    AddAllNotification(message);
    message = "";
  }

  function validateMessage(): boolean {
    return message.length >= 1;
  }
</script>

<h2>Broadcast a message to all customers</h2>
<Input bind:value={message} placeholder="Enter your message!" />
<br />
<Button on:click={sendMessage}>Send Message</Button>