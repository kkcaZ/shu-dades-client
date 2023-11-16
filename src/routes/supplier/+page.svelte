<script>
  import { Publish } from "$lib/services/broadcast";
</script>

<h1>Dashboard</h1>

<button on:click={() => Publish("Hello world!")}>Say hello!</button>