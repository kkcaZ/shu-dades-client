import type RequestById from '$lib/models/request/requestById';
import type { BaseRequest } from '$lib/models/request/baseRequest';
import { invoke } from '@tauri-apps/api/tauri';
import type { BaseResponse } from '$lib/models/request/baseResponse';
import type { ErrorResponse } from '$lib/models/request/errorResponse';
import { token } from '$lib/state/tokenStore';
import type NotificationListResponse from '$lib/models/notification/notificationListResponse';
import type Notif from '$lib/models/notification/notif';

export async function GetNotifications(): Promise<Notif[]> {
	let t: string = '';
	token.subscribe((value) => {
		t = value;
	});

	let request: BaseRequest = {
		body: {},
		type: 'GET',
		route: '/notification',
		headers: {
			Authorization: t
		}
	};

	let response = await invoke('send_tcp_message', {
		message: JSON.stringify(request)
	});
	let parsedResponse = JSON.parse(response as string);

	if ((parsedResponse as BaseResponse).statusCode != 200) {
		let errorResponse = parsedResponse as ErrorResponse;
		throw new Error(errorResponse.message);
	}

	let successResponse = parsedResponse as NotificationListResponse;
	return successResponse.notifications;
}

export async function DeleteNotification(id: string): Promise<void> {
	let t: string = '';
	token.subscribe((value) => {
		t = value;
	});

	const body: RequestById = {
		id: id
	};

	let request: BaseRequest = {
		body: body,
		type: 'DELETE',
		route: '/notification',
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
