<script lang="ts">
  import ModalContainer from "./ModalContainer.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import type UserInfo from "$lib/models/auth/userInfo";
  import { GetUsers } from "$lib/services/auth";
  import { userId } from "$lib/state/authStore";
  import Button from "../buttons/Button.svelte";
  import { CreateChat } from "$lib/services/chat";
  import Input from "../Input.svelte";

  export let visible: boolean;

  const dispatch = createEventDispatcher();

  let users: UserInfo[] = [];
  let participants: UserInfo[] = [];
  let potentialParticipants: UserInfo[] = [];
  let searchQuery: string = "";

  onMount(() => {
    GetUsers().then(res => {
      users = res;
      updatePotentialParticipants();
    });
  });

  function addParticipant(user: UserInfo) {
    participants = [...participants, user];
    updatePotentialParticipants();
  }

  function updatePotentialParticipants() {
    potentialParticipants = users.filter(user => !participants.includes(user)
      && user.id != $userId
      && user.username.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  function createChat() {
    if (participants.length === 0) return;
    CreateChat(participants.map(user => user.id)).then(() => {
      participants = [];
      updatePotentialParticipants();
      visible = false;
      dispatch("created");
    });
  }
</script>

<ModalContainer bind:visible={visible}>
  <div class="container">
    <h3>Create a chat</h3>
    <div class="participants">
      {#if participants.length === 0}
        <p>Please select some users to add to the chat...</p>
      {:else}
        {#each participants as participant}
          <span>{participant.username}</span>
        {/each}
      {/if}
    </div>
    <Input bind:value={searchQuery} placeholder="Search users..." style="margin-bottom: 1rem;"
           on:input={updatePotentialParticipants} />
    {#if potentialParticipants.length}
      <div class="selections">
        {#each potentialParticipants as user}
          <div class="user-select">
            <p>{user.username}</p>
            <img src="/icons/plus.svg" alt="add" on:click={() => addParticipant(user)} />
          </div>
        {/each}
      </div>
    {:else}
      <p class="no-users">No users found...</p>
    {/if}
    <Button disabled="{participants.length === 0}" on:click={createChat}>Create Chat</Button>
  </div>
</ModalContainer>

<style>
    .container {
        display: flex;
        flex-direction: column;
    }

    .participants {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding: 1rem;
        background-color: var(--secondary-color);
        margin-bottom: 1rem;
    }

    .participants span {
        padding: 0.5rem;
        background-color: var(--primary-color);
        border-radius: 5px;
    }

    .selections {
        max-height: 350px;
        overflow-y: auto;
        margin-bottom: 1rem;
    }

    .user-select {
        display: flex;
        justify-content: space-between;
    }

    .user-select:not(:last-child) {
        margin-bottom: 0.5rem;
    }

    .user-select p {
        margin: 0;
        padding: 1rem;
        background-color: var(--secondary-color);
        flex-grow: 1;
    }

    .user-select img {
        cursor: pointer;
        padding: 1rem;
        background-color: var(--secondary-color);
    }

    .user-select img:hover {
        opacity: 0.6;
    }

    .no-users {
        text-align: center;
        margin-bottom: 2rem;
    }
</style>