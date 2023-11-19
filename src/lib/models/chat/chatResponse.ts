import type { BaseResponse } from '$lib/models/request/baseResponse';
import type Chat from '$lib/models/chat/chat';

export default interface ChatResponse extends BaseResponse {
	chat: Chat;
}
