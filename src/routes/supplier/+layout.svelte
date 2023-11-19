<script>
  import NavButton from "../../components/buttons/NavButton.svelte";
  import { goto } from "$app/navigation";
  import { token } from "$lib/state/authStore";
  import { onMount } from "svelte";
  import { RemoveBroadcastUser } from "$lib/services/broadcast";

  function logout() {
    RemoveBroadcastUser();
    token.set("");
    goto("/");
  }

  onMount(() => {
    if ($token === "") {
      goto("/");
    }
  });
</script>

<div class="page">
  <nav>
    <NavButton on:click={() => goto("/supplier")}>Dashboard</NavButton>
    <NavButton on:click={() => goto("/supplier/products")}>Products</NavButton>
    <NavButton on:click={() => goto("/supplier/chat")}>Chat</NavButton>
    <NavButton on:click={logout}>Log out</NavButton>
  </nav>
  <main>
    <slot />
  </main>
</div>

<style>
    .page {
        display: flex;
    }

    nav {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 300px;
        background-color: var(--secondary-color);
    }

    main {
        flex-grow: 1;
        padding: 1rem;
        background-color: var(--primary-color);
        color: white;
        height: 100vh;
        max-height: 100vh;
        overflow-y: hidden;
        display: flex;
        flex-direction: column;
    }
</style>