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
import { SendRequest } from '$lib/helpers/requestHelper';

export async function CreateChat(participants: string[]) {
	userId.subscribe((value) => {
		participants.push(value);
	});

	let body: CreateChatRequest = {
		userIds: participants
	};

	await SendRequest(body, 'POST', '/chat');
}

export async function GetChatThumbnails(): Promise<ChatThumbnail[]> {
	let t: string = '';
	token.subscribe((value) => {
		t = value;
	});

	const response = await SendRequest({}, 'GET', '/chat/thumbnails');
	let chatThumbnailResponse = response as ChatThumbnailResponse;
	return chatThumbnailResponse.chats;
}

export async function GetChat(chatId: string): Promise<Chat> {
	let body: RequestById = {
		id: chatId
	};

	const response = await SendRequest(body, 'GET', '/chat');
	let chatResponse = response as ChatResponse;
	return chatResponse.chat;
}

export async function SendMessage(chatId: string, message: string) {
	let body: SendMessageRequest = {
		chatId: chatId,
		message: message
	};

	await SendRequest(body, 'POST', '/chat/message');
}
