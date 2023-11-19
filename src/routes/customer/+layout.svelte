<nav>
  <a href="/customer" class="logo">stox</a>
  <a href="/customer">Products</a>
  <a href="/customer/chat">Chat</a>
  <Notifications />
  <PrimaryButton on:click={logout}>Log out</PrimaryButton>
</nav>

<main>
  <slot />
</main>

<script>
  import PrimaryButton from "../../components/buttons/Button.svelte";
  import { token } from "$lib/state/authStore";
  import { goto } from "$app/navigation";
  import Notifications from "../../components/Notifications.svelte";
  import { RemoveBroadcastUser } from "$lib/services/broadcast";

  function logout() {
    RemoveBroadcastUser();
    token.set("");
    goto("/");
  }
</script>

<style>
    nav {
        display: flex;
        width: 100%;
        padding: 1rem;
        background-color: var(--primary-color);
        align-items: center;
        color: white;
    }

    nav .logo {
        font-size: 1rem;
        font-weight: bold;
    }

    nav a {
        padding: 1rem;
        cursor: pointer;
        text-decoration: none;
        color: white;
    }

    nav a:last-of-type {
        margin-right: auto;
    }

    nav a:hover {
        opacity: 0.6;
    }

    main {
        background-color: var(--primary-color);
        color: white;
    }
</style>