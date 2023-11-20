import { invoke } from '@tauri-apps/api/tauri';
import type BroadcastRequest from '$lib/models/broadcast/broadcastRequest';
import type { BaseResponse } from '$lib/models/request/baseResponse';
import type { ErrorResponse } from '$lib/models/request/errorResponse';
import type { BaseRequest } from '$lib/models/request/baseRequest';
import { token } from '$lib/state/authStore';
import { listen } from '@tauri-apps/api/event';
import type BroadcastMessage from '$lib/models/broadcast/broadcastMessage';
import { newMessage, newNotification } from '$lib/state/eventStore';
import type MessageBroadcastEvent from '$lib/models/chat/messageBroadcastEvent';
import { SendRequest } from '$lib/helpers/requestHelper';

export async function Publish(message: string, type: string) {
	let body: BroadcastRequest = {
		message: message,
		type: type
	};

	await SendRequest(body, 'POST', '/broadcast');
}

export async function RegisterBroadcastUser() {
	await SendRequest({}, 'POST', '/broadcast/user');
}

export async function RemoveBroadcastUser() {
	await SendRequest({}, 'DELETE', '/broadcast/user');
}

export async function Listen() {
	await listen('broadcast_event', (event) => {
		let broadcastMessage: BroadcastMessage = JSON.parse(event.payload as string);
		switch (broadcastMessage.type) {
			case 'notification':
				newNotification.set(
					`New notification received (eventId: ${Math.floor(Math.random() * 1000)})`
				);
				break;
			case 'message':
				let msg: MessageBroadcastEvent = JSON.parse(broadcastMessage.message);
				newMessage.set(msg);
				break;
		}
	});
}
