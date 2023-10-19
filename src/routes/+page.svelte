<div>
  <h1>stox</h1>
  <form on:submit={submit}>
    <input type="text" placeholder="Username" bind:value={username} />
    <input type="password" placeholder="Password" bind:value={password} />
    <input type="submit" value="Sign in" />
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
        background-color: var(--primary-color);
        color: white;
    }

    form > input {
        display: block;
        margin: 0.5rem 0;
        padding: .5rem;
    }

    form > input[type=submit] {
        width: 100%;
    }
</style>

<script lang="ts">
  import { Authenticate } from "$lib/services/auth";
  import { token } from "$lib/state/tokenStore";
  import { goto } from "$app/navigation";

  let username = "";
  let password = "";
  let text: string = "";

  function submit() {
    Authenticate(username, password)
      .then(t => {
        token.set(t);
        goto("/supplier");
      })
      .catch(e => {
        text = e.message;
      });
  }
</script>