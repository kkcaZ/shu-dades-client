<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let label: string = "";
  export let id: string = "";
  export let checked: boolean = false;
  const dispatch = createEventDispatcher();

  function toggleChecked() {
    checked = !checked;
    onChanged();
  }

  function onChanged() {
    dispatch("change", checked);
  }
</script>

<div class="container">
  <label for="{id}">{label}</label>
  <button class="checkbox" data-checked="{checked}" on:click={toggleChecked}>
    {#if checked}
      <img src="/icons/check.svg" alt="x" />
    {/if}
  </button>
  <input id="{id}" bind:checked="{checked}" on:change={onChanged} type="checkbox" />
</div>

<style>
    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    label {
        margin-right: .5rem;
    }

    input {
        display: none;
    }

    .checkbox {
        display: flex;
        width: 1rem;
        height: 1rem;
        border-radius: 5px;
        border: 2px solid var(--primary-color);
        align-items: center;
        justify-content: center;
        background-color: transparent;
        padding: 0;
    }

    .checkbox img {
        width: 100%;
    }
</style>