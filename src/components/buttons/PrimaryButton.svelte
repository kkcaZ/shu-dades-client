<script>
  export let disabled = false;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch("click");
  }
</script>

<button on:click={onClick} disabled="{disabled}">
  <slot />
</button>

<style>
    button {
        background: var(--secondary-color);
        border: none;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        padding: 0.5rem 1rem;
    }

    button:disabled {
        opacity: 0.5;
        cursor: default;
    }
</style>