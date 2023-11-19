<script>
  export let disabled = false;
  export let color = "secondary";
  export let style = "";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch("click");
  }
</script>

<button on:click={onClick} disabled="{disabled}" style="background: var(--{color}-color); {style}">
  <slot />
</button>

<style>
    button {
        display: block;
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

    button:hover:not(:disabled) {
        opacity: 0.8;
    }
</style>