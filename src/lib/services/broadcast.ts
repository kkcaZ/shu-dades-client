import { invoke } from '@tauri-apps/api/tauri';
import type BroadcastRequest from '$lib/models/broadcast/broadcastRequest';
import type { BaseResponse } from '$lib/models/request/baseResponse';
import type { ErrorResponse } from '$lib/models/request/errorResponse';
import type { BaseRequest } from '$lib/models/request/baseRequest';

export async function Publish(message: string) {
	let body: BroadcastRequest = {
		message: message
	};

	let request: BaseRequest = {
		body: body,
		type: 'POST',
		route: '/broadcast',
		headers: "{'Content-Type': 'application/json'}"
	};

	let response = await invoke('send_tcp_message', { message: JSON.stringify(request) });
	let parsedResponse = JSON.parse(response as string);

	if ((parsedResponse as BaseResponse).statusCode != 200) {
		let errorResponse = parsedResponse as ErrorResponse;
		throw new Error(errorResponse.message);
	}
}
