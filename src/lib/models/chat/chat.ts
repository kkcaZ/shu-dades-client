import type Message from '$lib/models/chat/message';

export default interface Chat {
	id: string;
	participants: string[];
	messages: Message[];
}
