<script lang="ts">
  export let visible: boolean = false;
</script>

{#if visible}
  <div class="modal-container">
    <div class="modal">
      <slot />
      <span class="close" on:click={() => visible = false}>x</span>
    </div>
  </div>
{/if}

<style>
    .modal-container {
        display: grid;
        place-items: center;
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .7);
    }

    .modal {
        position: relative;
        background-color: var(--primary-color);
        width: clamp(300px, 50%, 600px);
        padding: 1rem;
    }

    .close {
        display: block;
        position: absolute;
        padding: .5rem .75rem;
        top: .5rem;
        right: 1rem;
        cursor: pointer;
    }

    .close:hover {
        background-color: var(--secondary-color);
    }
</style>