import { type Writable, writable } from 'svelte/store';
import type MessageBroadcastEvent from '$lib/models/chat/messageBroadcastEvent';

export const newNotification = writable('');
export const newMessage: Writable<MessageBroadcastEvent> = writable({} as MessageBroadcastEvent);
