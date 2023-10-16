<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={() => sayHello()} >Say Hello</button>
<p>{text}</p>

<script lang="ts ">
  import { invoke } from "@tauri-apps/api/tauri";

  let text = "Test Text!"

  function sayHello() {
    console.log("Attempting to say hello!");
    invoke('send_tcp_message', { message: 'Hello!' }).then(r => {
      text = r;
    })
  }
</script>