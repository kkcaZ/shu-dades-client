<script lang="ts">
  export let placeholder: string = "";
  export let value: string = "";
  export let style: string = "";
  export let color: string = "secondary";
  export let type: string = "text";
  export let inputElement: HTMLInputElement;

  const inputAttributes = {
    placeholder,
    style: `background-color: var(--${color}-color); ${style}`,
    type: type
  };
</script>

<input bind:value={value} bind:this={inputElement} {...inputAttributes} />

<style>
    input {
        border: 0;
        color: white;
        padding: 1rem;
        font-size: inherit;
        outline: none;
        border-radius: 4px;
    }
</style>