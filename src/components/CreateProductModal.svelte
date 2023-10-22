{#if visible}
  <div class="modal-container">
    <div class="modal">
      <h2>New Product</h2>
      <form>
        <input type="text" placeholder="Name" bind:value={name} />
        <input type="number" placeholder="Quantity" bind:value={quantity} />
        <PrimaryButton on:click={createProduct}>Create Product</PrimaryButton>
      </form>
      <span class="close" on:click={() => visible = false}>x</span>
    </div>
  </div>
{/if}

<script lang="ts">
  import PrimaryButton from "./buttons/PrimaryButton.svelte";
  import { createEventDispatcher } from "svelte";
  import type CreateProductRequest from "$lib/models/product/createProductRequest";
  import { CreateProduct } from "$lib/services/product";

  export let visible: boolean = false;
  const dispatch = createEventDispatcher();

  let name: string;
  let quantity: number;

  function createProduct() {
    let product: CreateProductRequest = {
      name,
      quantity
    };

    CreateProduct(product).then(p => {
      visible = false;
      dispatch("created", p);
    });
  }
</script>

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

    h2 {
        margin: 0 0 1rem 0;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    form > input {
        margin-top: 0;
        border: none;
        outline: none;
        color: white;
        padding: 1rem;
        margin-bottom: .5rem;
        background-color: var(--secondary-color);
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