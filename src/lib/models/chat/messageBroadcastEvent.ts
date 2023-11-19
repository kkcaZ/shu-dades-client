import type Message from '$lib/models/chat/message';

export default interface MessageBroadcastEvent extends Message {
	chatId: string;
}
