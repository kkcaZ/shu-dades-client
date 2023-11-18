<script lang="ts">
  import { Publish } from "$lib/services/broadcast.js";
  import PrimaryButton from "./buttons/PrimaryButton.svelte";
  import PrimaryInput from "./PrimaryInput.svelte";

  let message = "";

  function sendMessage() {
    if (!validateMessage()) return;

    Publish(message);
    message = "";
  }

  function validateMessage(): boolean {
    return message.length >= 1;
  }
</script>

<h2>Broadcast a message to all customers</h2>
<PrimaryInput bind:value={message} placeholder="Enter your message!" />
<PrimaryButton on:click={sendMessage}>Send Message</PrimaryButton>