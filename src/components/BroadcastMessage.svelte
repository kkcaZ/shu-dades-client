<script lang="ts">
  import { Publish } from "$lib/services/broadcast";
  import Input from "./Input.svelte";
  import Button from "./buttons/Button.svelte";

  let message = "";

  function sendMessage() {
    if (!validateMessage()) return;

    Publish(message, "notification");
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