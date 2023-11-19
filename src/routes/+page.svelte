<div>
  <h1>stox</h1>
  <form on:submit={submit}>
    <Input type="text" color="primary" placeholder="Username" bind:value={username} />
    <Input type="password" color="primary" placeholder="Password" bind:value={password} />
    <Button color="primary">Sign in</Button>
  </form>
  <p>{text}</p>
</div>

<style>
    div {
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        width: 350px;
        border-radius: 5px;
        padding: 1rem;
        margin: 0 auto;
        top: 50vh;
        transform: translateY(-50%);
        text-align: center;
        background-color: var(--secondary-color);
        color: white;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 1rem;
    }
</style>

<script lang="ts">
  import { Authenticate } from "$lib/services/auth";
  import { token, userId } from "$lib/state/authStore";
  import { goto } from "$app/navigation";
  import { RegisterBroadcastUser } from "$lib/services/broadcast";
  import Button from "../components/buttons/Button.svelte";
  import Input from "../components/Input.svelte";

  let username = "";
  let password = "";
  let text: string = "";

  function submit() {
    Authenticate(username, password)
      .then(claim => {
        token.set(claim.token);
        userId.set(claim.userId);
        RegisterBroadcastUser();
        if (claim.role === "supplier") {
          goto("/supplier");
        } else if (claim.role === "customer") {
          goto("/customer");
        }
      })
      .catch(e => {
        text = e.message;
      });
  }
</script>