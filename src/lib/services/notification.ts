import type RequestById from '$lib/models/request/requestById';
import type { BaseRequest } from '$lib/models/request/baseRequest';
import { invoke } from '@tauri-apps/api/tauri';
import type { BaseResponse } from '$lib/models/request/baseResponse';
import type { ErrorResponse } from '$lib/models/request/errorResponse';
import { token } from '$lib/state/authStore';
import type NotificationListResponse from '$lib/models/notification/notificationListResponse';
import type Notif from '$lib/models/notification/notif';
import { SendRequest } from '$lib/helpers/requestHelper';

export async function GetNotifications(): Promise<Notif[]> {
	const response = await SendRequest({}, 'GET', '/notification');

	let notificationsResponse = response as NotificationListResponse;
	return notificationsResponse.notifications;
}

export async function DeleteNotification(id: string): Promise<void> {
	const body: RequestById = {
		id: id
	};

	await SendRequest(body, 'DELETE', `/notification`);
}
