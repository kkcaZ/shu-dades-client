<nav>
  <h2>stox</h2>
  <h2>Customer Dashboard</h2>
  <PrimaryButton on:click={logout}>Log out</PrimaryButton>
</nav>

<main>
  <slot />
</main>

<script>
  import PrimaryButton from "../../components/buttons/PrimaryButton.svelte";
  import { token } from "$lib/state/tokenStore";
  import { goto } from "$app/navigation";

  function logout() {
    token.set("");
    goto("/");
  }
</script>

<style>
    nav {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 1rem;
        background-color: var(--primary-color);
        color: white;
    }

    nav h2 {
        margin: 0;
    }

    main {
        background-color: var(--primary-color);
        min-height: calc(100vh - 4.4rem);
        color: white;
    }
</style>