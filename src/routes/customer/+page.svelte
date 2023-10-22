<script>
  import ProductView from "../../components/ProductView.svelte";
</script>

<div class="product-container">
  <ProductView />
</div>

<style>
    .product-container {
        width: clamp(300px, 100%, 1000px);
        height: 500px;
        padding: 1rem;
        margin: 0 auto;
    }
</style>