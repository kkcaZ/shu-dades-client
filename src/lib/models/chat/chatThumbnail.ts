import type Participant from '$lib/models/chat/participant';
import type Message from '$lib/models/chat/message';

export default interface ChatThumbnail {
	chatId: string;
	participants: Participant[];
	lastMessage: Message;
}
