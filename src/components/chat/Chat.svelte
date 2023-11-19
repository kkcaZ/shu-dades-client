<script lang="ts">
  import Input from "../Input.svelte";
  import Button from "../buttons/Button.svelte";
  import CreateNewChatModal from "../modals/CreateNewChatModal.svelte";
  import type Chat from "$lib/models/chat/chat";
  import type ChatThumbnail from "$lib/models/chat/chatThumbnail";
  import { onMount, SvelteComponent } from "svelte";
  import { GetChat, GetChatThumbnails, SendMessage } from "$lib/services/chat";
  import moment from "moment";
  import { userId } from "$lib/state/authStore";
  import { newMessage } from "$lib/state/eventStore.js";

  let createChatModalVisible: boolean = false;
  let chats: ChatThumbnail[] = [];
  let orderedChats: ChatThumbnail[] = [];
  let selectedChat: Chat;
  let message: string = "";
  let messageInputElement: HTMLInputElement;

  onMount(() => {
    getChats();
    newMessage.subscribe((message) => {
      if (!message?.chatId) return;

      if (message.chatId === selectedChat?.id) {
        selectedChat.messages = [...selectedChat.messages, message];
      }

      const chat = chats.find((c) => c.chatId === message.chatId);
      if (chat) {
        chat.lastMessage = message;
      }
      updateOrderedChats();
    });
  });

  function getChats() {
    GetChatThumbnails().then((res) => {
      if (res.length) {
        chats = res;
        updateOrderedChats();
        selectChat(orderedChats[0].chatId);
      }
    });
  }

  function updateOrderedChats() {
    orderedChats = chats.sort((a, b) => {
      if (a.lastMessage && b.lastMessage) {
        return new Date(b.lastMessage.sentAt).getTime() - new Date(a.lastMessage.sentAt).getTime();
      } else if (a.lastMessage) {
        return -1;
      } else if (b.lastMessage) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  function selectChat(chatId: string) {
    GetChat(chatId).then((res) => {
      if (res) {
        selectedChat = res;
        updateOrderedChats();
      }
    });
  }

  function sendMessage() {
    if (message) {
      SendMessage(selectedChat.id, message);
      message = "";
      setTimeout(() => {
        messageInputElement.focus();
      }, 0);
    }
  }
</script>

<h1>Chat</h1>

<div class="chat">
  <div class="conversations">
    <Button style="margin-bottom: 1rem;" on:click={() => createChatModalVisible = true}>Start a new chat</Button>
    <CreateNewChatModal bind:visible={createChatModalVisible} on:created={getChats} />
    {#if chats.length === 0}
      <p>No chats yet</p>
    {:else}
      {#each orderedChats as chat}
        <button class="conversation" on:click={() => selectChat(chat.chatId)}
                data-selected={chat.chatId === selectedChat?.id}>
          <p class="title">{chat.participants.map(p => p.username).join(", ")}</p>
          {#if chat.lastMessage}
            <p class="msg">{chat.lastMessage.username}: {chat.lastMessage.content}</p>
            <p class="date">{moment(chat.lastMessage.sentAt).format("HH:mm DD/MM/YYYY")}</p>
          {:else}
            <p class="msg">No messages yet</p>
          {/if}
        </button>
      {/each}
    {/if}
  </div>
  {#if selectedChat}
    <div class="chat-box">
      <div class="messages">
        {#if selectedChat.messages.length}
          {#each selectedChat.messages.sort((a, b) => {
            return a.sentAt < b.sentAt ? 1 : -1
          }) as message}
            <div class="message {message.userId === $userId ? 'sent' : 'received'}">
              <h4>{message.username}</h4>
              <p>{message.content}</p>
            </div>
          {/each}
        {:else}
          <p style="text-align: center">No messages yet - be the first to send a message!</p>
        {/if}
      </div>
      <form class="message-box" on:submit={sendMessage}>
        <Input placeholder="Enter your message..." color="primary" style="flex-grow: 1;" bind:value={message}
               bind:inputElement={messageInputElement} />
        <Button color="primary">Send</Button>
      </form>
    </div>
  {:else}
    <div class="no-chats">
      <h2>Nothing to see here</h2>
      <p>Your messages will appear here when you start your first chat!</p>
    </div>
  {/if}
</div>

<style>
    .chat {
        display: flex;
        flex: 1;
        overflow-y: hidden;
    }

    .conversations {
        display: flex;
        flex-direction: column;
        flex-basis: 20%;
        max-height: 100%;
        overflow-y: auto;
        padding-right: 1rem;
    }

    .conversation {
        display: block;
        background-color: var(--secondary-color);
        padding: 1rem;
        border-radius: 5px;
        margin-bottom: 1rem;
        color: white;
        border: none;
        text-align: left;
        font-size: inherit;
    }

    .conversation[data-selected="true"] {
        border: 2px white solid;
    }

    .conversation:hover {
        opacity: 0.8;
        cursor: pointer;
    }

    .conversation .title {
        font-weight: bold;
    }

    .conversation p {
        margin: 0;
    }

    .conversation .msg {
        margin: .5rem 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .conversation .date {
        font-size: .8rem;
        opacity: 0.6;
        font-style: italic;
    }

    .chat-box {
        display: flex;
        flex-direction: column;
        background-color: var(--secondary-color);
        border-radius: 5px;
        flex-grow: 1;
    }

    .messages {
        display: flex;
        flex-direction: column-reverse;
        padding: 1rem;
        flex-grow: 1;
        max-height: 100%;
        overflow-y: auto;
    }

    .message {
        margin-top: 1rem;
        max-width: 60%;
    }

    .message.received {
        align-self: flex-start;
    }

    .message.sent {
        align-self: flex-end;
    }

    .message > p {
        background-color: var(--primary-color);
        padding: 1rem;
        margin: 0;
    }

    .message > h4 {
        margin: 0 0 .5rem 0;
    }

    .message-box {
        display: flex;
        padding: 1rem;
        border-top: 1px solid var(--primary-color);
        column-gap: 1rem;
    }

    .no-chats {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        background-color: var(--secondary-color);
        border-radius: 5px;
    }
</style>
