<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch("click");
  }
</script>

<button on:click={onClick}>
  <slot />
</button>

<style>
    button {
        display: block;
        padding: 1rem;
        outline: none;
        border: none;
        border-radius: 0;
        background-color: transparent;
        color: white;
        cursor: pointer;
    }

    button:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
</style>