<div class="filters">
  <h1>Products</h1>
  <PrimaryButton on:click={() => createProductModalVisible = true}>Create new product</PrimaryButton>
  <p>Sort by:</p>
  <select bind:value={sort} on:change={updateProducts}>
    <option value="name" selected>Name</option>
    <option value="quantity">Quantity</option>
  </select>
  <select bind:value={sortDirection} on:change={updateProducts}>
    <option value="asc" selected>Ascending</option>
    <option value="desc">Descending</option>
  </select>
</div>

<div class="table">
  <p>Name</p>
  <p>Quantity</p>
  <p>Actions</p>
  {#each products as product}
    <p>{product.name}</p>
    <p>{product.quantity}</p>
    <div class="actions">
      <span><img src="/icons/edit.svg" alt="edit" /></span>
      <span on:click={() => deleteProduct(product.id)}><img src="/icons/delete.svg" alt="delete" /></span>
    </div>
  {/each}
</div>

<div class="btn-container">
  <PrimaryButton
    disabled={pageNumber === 1}
    on:click={prevPage}>
    Prev Page
  </PrimaryButton>
  <PrimaryButton
    disabled={products.length < pageSize}
    on:click={nextPage}>
    Next Page
  </PrimaryButton>
</div>

<CreateProductModal bind:visible={createProductModalVisible} on:created={updateProducts} />

<script lang="ts">
  import { onMount } from "svelte";
  import { DeleteProduct, GetProduct, SearchProducts } from "$lib/services/product";
  import type Product from "$lib/models/product/product";
  import PrimaryButton from "../../../components/buttons/PrimaryButton.svelte";
  import CreateProductModal from "../../../components/CreateProductModal.svelte";

  let pageNumber = 1;
  let pageSize = 15;
  let sort = "name";
  let sortDirection = "asc";

  let products: Product[] = [];

  let createProductModalVisible = false;

  onMount(() => {
    updateProducts();
  });

  function nextPage() {
    pageNumber++;
    updateProducts();
  }

  function prevPage() {
    pageNumber--;
    updateProducts();
  }

  function updateProducts() {
    SearchProducts(pageNumber, pageSize, sort, sortDirection).then((p) => {
      products = p;
    });
  }

  function deleteProduct(id: number) {
    DeleteProduct(id).then(() => {
      updateProducts();
    });
  }
</script>

<style>
    .filters {
        display: flex;
        padding: 1rem 0;
        align-items: center;
    }

    .filters p, h1 {
        margin: 0;
    }

    .filters h1 {
        margin-right: 1rem;
    }

    .filters p {
        margin-left: auto;
    }

    .filters select {
        margin-left: 1rem;
        background-color: var(--primary-color);
    }

    .table {
        display: grid;
        grid-template-columns: 10fr 2fr 1fr;
        grid-gap: .5rem;
        margin-bottom: 1rem;
    }

    .table > p {
        margin: 0;
        padding: .5rem;
        background-color: #20252E;
        color: white;
        user-select: none;
    }

    .btn-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: auto;
    }

    .actions {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .actions > span {
        cursor: pointer;
    }

    .actions > span > img {
        width: 1.25rem;
        height: 1.25rem;
    }
</style>