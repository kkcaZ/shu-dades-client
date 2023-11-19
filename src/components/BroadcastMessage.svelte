<script lang="ts">
  import { Publish } from "$lib/services/broadcast";
  import PrimaryButton from "./buttons/Button.svelte";
  import PrimaryInput from "./Input.svelte";

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
<br />
<PrimaryButton on:click={sendMessage}>Send Message</PrimaryButton>