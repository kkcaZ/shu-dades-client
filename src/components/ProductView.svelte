<div class="filters">
  <h1>Products</h1>
  {#if role === "supplier"}
    <PrimaryButton on:click={() => createProductModalVisible = true}>Create new product</PrimaryButton>
  {/if}
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

<div class="table" data-role="{role}">
  <p>Name</p>
  <p>Quantity</p>
  {#if role === "supplier" }
    <p>Actions</p>
  {:else}
    <p>Notifications</p>
  {/if}
  {#each customerProducts as product}
    <p>{product.name}</p>
    <p>{product.quantity}</p>
    {#if role === "supplier"}
      <div class="actions">
        <span on:click={() => editProduct(product)}><img src="/icons/edit.svg" alt="edit" /></span>
        <span on:click={() => deleteProduct(product.id)}><img src="/icons/delete.svg" alt="delete" /></span>
      </div>
    {/if}
    {#if role === "customer"}
      <div class="customer-actions">
        <Checkbox label="Daily" id="daily-checkbox-{product.id}"
                  on:change={(e) => subscriptionChecked(e, product.id, "daily")}
                  bind:checked={product.dailySubscription} />
        <Checkbox label="Hourly" id="hourly-checkbox-{product.id}"
                  on:change={(e) => subscriptionChecked(e, product.id, "hourly")}
                  bind:checked={product.hourlySubscription} />
      </div>
    {/if}
  {/each}
</div>

<div class="btn-container">
  <PrimaryButton
    on:click={prevPage}
    disabled={pageNumber === 1}>
    Prev Page
  </PrimaryButton>
  <PrimaryButton
    on:click={nextPage}
    disabled={products.length < pageSize}>
    Next Page
  </PrimaryButton>
</div>

{#if role === "supplier"}
  <CreateProductModal bind:visible={createProductModalVisible} on:created={updateProducts} />
  <UpdateProductModal bind:visible={updateProductModalVisible} bind:product={selectedProduct}
                      on:updated={updateProducts} />
{/if}

<script lang="ts">
  import { onMount } from "svelte";
  import {
    DeleteProduct,
    GetProductSubscriptions,
    SearchProducts,
    SubscribeToProduct,
    UnsubscribeFromProduct
  } from "$lib/services/product";
  import type Product from "$lib/models/product/product";
  import PrimaryButton from "./buttons/Button.svelte";
  import CreateProductModal from "./modals/CreateProductModal.svelte";
  import UpdateProductModal from "./modals/UpdateProductModal.svelte";
  import Checkbox from "./Checkbox.svelte";
  import type ProductSubscription from "$lib/models/product/productSubscription";
  import type CustomerProduct from "$lib/models/product/customerProduct";

  export let role: string = "";

  let pageNumber = 1;
  let pageSize = 15;
  let sort = "name";
  let sortDirection = "asc";
  let products: Product[] = [];
  let customerProducts: CustomerProduct[] = [];
  let subscriptions: ProductSubscription[] = [];
  let selectedProduct: Product;
  let createProductModalVisible = false;
  let updateProductModalVisible = false;

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
    GetProductSubscriptions().then((s) => {
      SearchProducts(pageNumber, pageSize, sort, sortDirection).then((p) => {
        products = p;
        customerProducts = products.map((product) => {
          const subscriptions = s?.filter((sub) => sub.productId === product.id);
          const customerProduct: CustomerProduct = {
            ...product,
            dailySubscription: subscriptions?.find((sub) => sub.subType == "daily") != undefined,
            hourlySubscription: subscriptions?.find((sub) => sub.subType == "hourly") != undefined
          };
          return customerProduct;
        });
      });
    });
  }

  function editProduct(product: Product) {
    selectedProduct = product;
    updateProductModalVisible = true;
  }

  function deleteProduct(id: string) {
    DeleteProduct(id).then(() => {
      updateProducts();
    });
  }

  function subscriptionChecked(event: any, id: string, type: string) {
    if (event.detail) {
      SubscribeToProduct(id, type);
    } else {
      UnsubscribeFromProduct(id, type);
    }
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
        grid-gap: .5rem;
        margin-bottom: 1rem;
        height: 100%;
        overflow: auto;
        grid-template-rows: repeat(15, 1fr);
        grid-template-columns: 10fr 2fr 1fr;
    }

    .table > p {
        margin: 0;
        padding: .5rem;
        background-color: #20252E;
        color: white;
        user-select: none;
        display: flex;
        align-items: center;
    }

    .btn-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: auto;
        position: sticky;
        bottom: 0;
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

    .customer-actions {
        display: flex;
        flex-direction: column;
        background-color: var(--secondary-color);
        padding: .5rem 1rem;
    }
</style>