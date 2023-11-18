<script>
  export let placeholder = "";
  export let value = "";
</script>

<input bind:value={value} placeholder="{placeholder}" />

<style>
    input {
        border: 0;
        background-color: var(--secondary-color);
        color: white;
        padding: 1rem;
        font-size: inherit;
        outline: none;
        margin-bottom: 1rem;
        border-radius: 4px;
    }
</style>