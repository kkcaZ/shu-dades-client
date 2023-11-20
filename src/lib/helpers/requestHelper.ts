import { invoke } from '@tauri-apps/api/tauri';
import type { BaseRequest } from '$lib/models/request/baseRequest';
import type { BaseResponse } from '$lib/models/request/baseResponse';
import type { ErrorResponse } from '$lib/models/request/errorResponse';
import { token } from '$lib/state/authStore';

export async function GetToken(): Promise<string> {
	let t: string = '';
	token.subscribe((value) => {
		t = value;
	});
	return t;
}

export async function SendRequest(body: any, type: string, route: string): Promise<any> {
	const token = await GetToken();

	const request: BaseRequest = {
		body: body,
		type: type,
		route: route,
		headers: {
			Authorization: token
		}
	};

	let response = await invoke('send_tcp_message', { message: JSON.stringify(request) });
	let parsedResponse = JSON.parse(response as string);

	if ((parsedResponse as BaseResponse).statusCode != 200) {
		let errorResponse = parsedResponse as ErrorResponse;
		throw new Error(errorResponse.message);
	}

	return parsedResponse;
}
