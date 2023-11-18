<script lang="ts">
  import { onMount } from "svelte";
  import { newNotification } from "$lib/state/notifStore";
  import { DeleteNotification, GetNotifications } from "$lib/services/notification";
  import type Notif from "$lib/models/notification/notif";

  let panelVisible = false;
  let notifications: Notif[] = [];

  onMount(() => {
    newNotification.subscribe(() => {
      GetNotifications().then((res) => {
        notifications = res;
      });
    });
  });

  function togglePanel() {
    panelVisible = !panelVisible;
  }

  function deleteNotification(id: string) {
    DeleteNotification(id).then(() => {
      GetNotifications().then((res) => {
        notifications = res;
      });
    });
  }
</script>

<div class="container">
  <img src="/icons/notification.svg" alt="notifs" on:click={togglePanel} />
  {#if notifications.length > 0}
    <span class="count">
      {notifications.length}
    </span>
  {/if}
  {#if panelVisible}
    <div class="notification-panel">
      <span class="outline"></span>
      <div class="contents">
        {#if notifications.length == 0}
          <p style="opacity: 0.5;">No new messages :(</p>
        {:else}
          <h2>Notifications</h2>
          {#each notifications as notif}
            <div class="notification">
              <p>{notif.message}</p>
              <img src="/icons/delete.svg" alt="delete" on:click={() => deleteNotification(notif.id)} />
            </div>
          {/each}
        {/if}

      </div>
    </div>
  {/if}
</div>

<style>
    .container {
        display: block;
        position: relative;
    }

    img {
        height: 1.5rem;
        aspect-ratio: 1 / 1;
        margin-right: 1rem;
        cursor: pointer;
    }

    img:hover {
        opacity: 0.6;
    }

    .notification-panel {
        display: block;
        position: absolute;
        top: calc(100% + .5rem);
        right: .5rem;
        min-width: 300px;
        z-index: 1;
        overflow: hidden;
    }

    .outline {
        content: "";
        display: block;
        position: absolute;
        background-color: white;
        height: 2rem;
        aspect-ratio: 1 / 1;
        top: -1.8rem;
        left: calc(100% - 2rem);
        animation: edge 10s infinite;
    }

    .contents {
        display: block;
        position: relative;
        overflow-y: auto;
        margin: .2rem;
        padding: 1rem;
        background-color: var(--secondary-color);
        text-align: center;
        max-height: 450px;
    }

    .contents h2 {
        margin: 0 0 1rem 0;
    }

    .count {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        font-size: .5rem;
        right: .75rem;
        bottom: 0;
        padding: .1rem;
        width: 1rem;
        height: 1rem;
        background-color: var(--secondary-color);
        border-radius: 50%;
        pointer-events: none;
    }

    .notification {
        display: flex;
        align-items: center;
        border: 2px solid var(--primary-color);
        margin-bottom: 1rem;
    }

    .notification p {
        flex-grow: 1;
        margin: 0;
        padding: .5rem;
    }

    .notification:last-child {
        margin-bottom: 0;
    }

    @keyframes edge {
        0% {
            top: 0;
            left: -1.8rem;
        }
        15% {
            top: -1.8rem;
        }
        25% {
            top: -1.8rem;
            left: calc(100% - 2rem);
        }
        40% {
            left: calc(100% - .2rem);
        }
        50% {
            top: calc(100% - 2rem);
            left: calc(100% - .2rem);
        }
        65% {
            top: calc(100% - .2rem);
        }
        75% {
            top: calc(100% - .2rem);
            left: 0;
        }
        90% {
            left: -1.8rem;
        }
        100% {
            top: 0;
            left: -1.8rem;
        }
    }
</style>