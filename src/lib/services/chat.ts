import type { BaseRequest } from '$lib/models/request/baseRequest';
import type CreateChatRequest from '$lib/models/chat/createChatRequest';
import { invoke } from '@tauri-apps/api/tauri';
import type { BaseResponse } from '$lib/models/request/baseResponse';
import type { ErrorResponse } from '$lib/models/request/errorResponse';
import { token, userId } from '$lib/state/authStore';
import type ChatThumbnail from '$lib/models/chat/chatThumbnail';
import type ChatThumbnailResponse from '$lib/models/chat/chatThumbnailResponse';
import type Chat from '$lib/models/chat/chat';
import type RequestById from '$lib/models/request/requestById';
import type ChatResponse from '$lib/models/chat/chatResponse';
import type SendMessageRequest from '$lib/models/chat/sendMessageRequest';

export async function CreateChat(participants: string[]) {
	userId.subscribe((value) => {
		participants.push(value);
	});

	let body: CreateChatRequest = {
		userIds: participants
	};

	let request: BaseRequest = {
		body: body,
		type: 'POST',
		route: '/chat',
		headers: {}
	};

	let response = await invoke('send_tcp_message', { message: JSON.stringify(request) });
	let parsedResponse = JSON.parse(response as string);

	if ((parsedResponse as BaseResponse).statusCode != 200) {
		let errorResponse = parsedResponse as ErrorResponse;
		throw new Error(errorResponse.message);
	}
}

export async function GetChatThumbnails(): Promise<ChatThumbnail[]> {
	let t: string = '';
	token.subscribe((value) => {
		t = value;
	});

	let request: BaseRequest = {
		body: {},
		type: 'GET',
		route: '/chat/thumbnails',
		headers: {
			Authorization: t
		}
	};

	let response = await invoke('send_tcp_message', { message: JSON.stringify(request) });
	let parsedResponse = JSON.parse(response as string);

	if ((parsedResponse as BaseResponse).statusCode != 200) {
		let errorResponse = parsedResponse as ErrorResponse;
		throw new Error(errorResponse.message);
	}

	let successResponse = parsedResponse as ChatThumbnailResponse;
	return successResponse.chats;
}

export async function GetChat(chatId: string): Promise<Chat> {
	let t: string = '';
	token.subscribe((value) => {
		t = value;
	});

	let body: RequestById = {
		id: chatId
	};

	let request: BaseRequest = {
		body: body,
		type: 'GET',
		route: '/chat',
		headers: {
			Authorization: t
		}
	};

	let response = await invoke('send_tcp_message', { message: JSON.stringify(request) });
	let parsedResponse = JSON.parse(response as string);

	if ((parsedResponse as BaseResponse).statusCode != 200) {
		let errorResponse = parsedResponse as ErrorResponse;
		throw new Error(errorResponse.message);
	}

	let successResponse = parsedResponse as ChatResponse;
	return successResponse.chat;
}

export async function SendMessage(chatId: string, message: string) {
	let t: string = '';
	token.subscribe((value) => {
		t = value;
	});

	let body: SendMessageRequest = {
		chatId: chatId,
		message: message
	};

	let request: BaseRequest = {
		body: body,
		type: 'POST',
		route: '/chat/message',
		headers: {
			Authorization: t
		}
	};

	let response = await invoke('send_tcp_message', { message: JSON.stringify(request) });
	let parsedResponse = JSON.parse(response as string);

	if ((parsedResponse as BaseResponse).statusCode != 200) {
		let errorResponse = parsedResponse as ErrorResponse;
		throw new Error(errorResponse.message);
	}
}
