<script>
  import NavButton from "../../components/buttons/NavButton.svelte";
  import { goto } from "$app/navigation";
  import { token } from "$lib/state/tokenStore";
  import { onMount } from "svelte";

  function logout() {
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
        background-color: var(--primary-color);
    }
</style>