import type { BaseResponse } from '$lib/models/request/baseResponse';
import type ChatThumbnail from '$lib/models/chat/chatThumbnail';

export default interface ChatThumbnailResponse extends BaseResponse {
	chats: ChatThumbnail[];
}
