<ModalContainer bind:visible={visible}>
  <h2>New Product</h2>
  <form>
    <input type="text" placeholder="Name" bind:value={name} />
    <input type="number" placeholder="Quantity" bind:value={quantity} />
    <PrimaryButton on:click={createProduct}>Create Product</PrimaryButton>
  </form>
</ModalContainer>

<script lang="ts">
  import PrimaryButton from "../buttons/Button.svelte";
  import { createEventDispatcher } from "svelte";
  import type CreateProductRequest from "$lib/models/product/createProductRequest";
  import { CreateProduct } from "$lib/services/product";
  import ModalContainer from "./ModalContainer.svelte";

  export let visible: boolean;

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
</style>