<ModalContainer bind:visible={visible}>
  <h2>New Product</h2>
  <form>
    <input type="text" placeholder="Name" bind:value={product.name} />
    <input type="number" placeholder="Quantity" bind:value={product.quantity} />
    <PrimaryButton on:click={updateProduct}>Update Product</PrimaryButton>
  </form>
</ModalContainer>

<script lang="ts">
  import PrimaryButton from "../buttons/Button.svelte";
  import { createEventDispatcher } from "svelte";
  import { UpdateProduct } from "$lib/services/product";
  import ModalContainer from "./ModalContainer.svelte";
  import type Product from "$lib/models/product/product";

  export let visible: boolean;
  export let product: Product = {
    id: "",
    name: "",
    quantity: 0
  };
  const dispatch = createEventDispatcher();

  function updateProduct() {
    UpdateProduct(product).then(p => {
      visible = false;
      dispatch("updated", p);
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